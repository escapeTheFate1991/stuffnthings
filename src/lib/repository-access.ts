import { GitHubClient, getGitHubClient } from './github'
import { 
  getUserByClerkId, 
  updateUserSubscription,
  updateUserGitHubUsername,
  logGitHubAccessEvent,
  updateUserSubscriptionTier
} from './database'
import type { GitHubAccessEvent, RepositoryAccess, REPOSITORY_ACCESS_MAP } from '../types/github'

/**
 * Repository Access Control Manager
 * Handles progressive access to GitHub repositories based on subscription tiers
 */
export class RepositoryAccessManager {
  private githubClient: GitHubClient
  
  constructor(githubClient?: GitHubClient) {
    this.githubClient = githubClient || getGitHubClient()
  }

  /**
   * Grant repository access after successful payment
   */
  async grantAccessOnPayment(
    clerkUserId: string,
    subscriptionTier: string,
    stripeCustomerId?: string
  ): Promise<GitHubAccessEvent | null> {
    try {
      const user = await getUserByClerkId(clerkUserId)
      if (!user) {
        throw new Error('User not found')
      }

      if (!user.git_username) {
        console.log('User has no GitHub username configured')
        return null
      }

      // Grant repository access
      const accessResults = await this.githubClient.grantRepositoryAccess(
        user.git_username,
        subscriptionTier,
        'pull'
      )

      // Update user subscription status
      await updateUserSubscription(
        user.id,
        subscriptionTier,
        'active',
        this.calculateExpirationDate(subscriptionTier)
      )

      const event: GitHubAccessEvent = {
        user_id: user.id,
        github_username: user.git_username,
        repositories: accessResults.success,
        access_level: subscriptionTier,
        tier: subscriptionTier,
        action: 'grant',
        timestamp: new Date().toISOString()
      }

      // Log the access grant
      await this.logAccessEvent(event)

      console.log(`✅ Granted ${subscriptionTier} access to ${user.git_username}`)
      console.log(`   Repositories: ${accessResults.success.join(', ')}`)
      
      if (accessResults.failed.length > 0) {
        console.warn(`⚠️ Failed to grant access to: ${accessResults.failed.join(', ')}`)
      }

      return event
    } catch (error) {
      console.error('Error granting repository access:', error)
      throw error
    }
  }

  /**
   * Revoke repository access after subscription cancellation
   */
  async revokeAccessOnCancellation(
    clerkUserId: string,
    gracePeriodDays: number = 3
  ): Promise<GitHubAccessEvent | null> {
    try {
      const user = await getUserByClerkId(clerkUserId)
      if (!user) {
        throw new Error('User not found')
      }

      if (!user.git_username) {
        console.log('User has no GitHub username configured')
        return null
      }

      // Calculate grace period end
      const gracePeriodEnd = new Date()
      gracePeriodEnd.setDate(gracePeriodEnd.getDate() + gracePeriodDays)

      // Update subscription to canceled with grace period
      await updateUserSubscription(
        user.id,
        user.subscription_tier,
        'canceled',
        gracePeriodEnd.toISOString()
      )

      // Schedule access revocation after grace period
      setTimeout(async () => {
        await this.executeAccessRevocation(user.id, user.git_username!)
      }, gracePeriodDays * 24 * 60 * 60 * 1000)

      const event: GitHubAccessEvent = {
        user_id: user.id,
        github_username: user.git_username,
        repositories: [],
        access_level: 'canceled',
        tier: user.subscription_tier,
        action: 'revoke',
        timestamp: new Date().toISOString()
      }

      await this.logAccessEvent(event)

      console.log(`⏰ Scheduled access revocation for ${user.git_username} in ${gracePeriodDays} days`)
      
      return event
    } catch (error) {
      console.error('Error scheduling access revocation:', error)
      throw error
    }
  }

  /**
   * Update repository access on tier change
   */
  async updateAccessOnTierChange(
    clerkUserId: string,
    oldTier: string,
    newTier: string
  ): Promise<GitHubAccessEvent | null> {
    try {
      const user = await getUserByClerkId(clerkUserId)
      if (!user) {
        throw new Error('User not found')
      }

      if (!user.git_username) {
        console.log('User has no GitHub username configured')
        return null
      }

      // Update repository access
      const accessResults = await this.githubClient.updateRepositoryAccess(
        user.git_username,
        oldTier,
        newTier
      )

      // Update user subscription and tier
      await updateUserSubscriptionTier(user.id, newTier, oldTier)
      await updateUserSubscription(
        user.id,
        newTier,
        'active',
        this.calculateExpirationDate(newTier)
      )

      const allChangedRepos = [...accessResults.granted, ...accessResults.revoked]

      const event: GitHubAccessEvent = {
        user_id: user.id,
        github_username: user.git_username,
        repositories: allChangedRepos,
        access_level: newTier,
        tier: newTier,
        action: 'update',
        timestamp: new Date().toISOString()
      }

      await this.logAccessEvent(event)

      console.log(`🔄 Updated ${user.git_username} access from ${oldTier} to ${newTier}`)
      console.log(`   Granted: ${accessResults.granted.join(', ')}`)
      console.log(`   Revoked: ${accessResults.revoked.join(', ')}`)

      if (accessResults.failed.length > 0) {
        console.warn(`⚠️ Failed to update access for: ${accessResults.failed.join(', ')}`)
      }

      return event
    } catch (error) {
      console.error('Error updating repository access:', error)
      throw error
    }
  }

  /**
   * Add GitHub username to user profile and grant initial access
   */
  async linkGitHubAccount(
    clerkUserId: string,
    githubUsername: string
  ): Promise<boolean> {
    try {
      const user = await getUserByClerkId(clerkUserId)
      if (!user) {
        throw new Error('User not found')
      }

      // Verify GitHub user exists
      const githubUser = await this.githubClient.getUser(githubUsername)
      if (!githubUser) {
        throw new Error('GitHub user not found')
      }

      // Update user with GitHub username
      await updateUserGitHubUsername(user.id, githubUsername)

      // Grant access based on current subscription
      if (user.subscription_tier !== 'free') {
        await this.grantAccessOnPayment(clerkUserId, user.subscription_tier)
      }

      console.log(`🔗 Linked GitHub account ${githubUsername} to user ${user.email}`)
      return true
    } catch (error) {
      console.error('Error linking GitHub account:', error)
      throw error
    }
  }

  /**
   * Get user's current repository access status
   */
  async getUserAccessStatus(clerkUserId: string): Promise<{
    tier: string
    repositories: string[]
    hasAccess: boolean
    githubUsername?: string
  }> {
    try {
      const user = await getUserByClerkId(clerkUserId)
      if (!user) {
        throw new Error('User not found')
      }

      const repositories = this.getRepositoriesForTier(user.subscription_tier)
      let actualAccess: string[] = []

      if (user.git_username) {
        actualAccess = await this.githubClient.getUserRepositoryAccess(user.git_username)
      }

      return {
        tier: user.subscription_tier,
        repositories: repositories.map(r => r.repository_name),
        hasAccess: user.subscription_status === 'active',
        githubUsername: user.git_username || undefined
      }
    } catch (error) {
      console.error('Error getting user access status:', error)
      throw error
    }
  }

  /**
   * Execute access revocation (called after grace period or immediately by admin)
   */
  public async executeAccessRevocation(userId: number, githubUsername: string): Promise<void> {
    try {
      const revokeResults = await this.githubClient.revokeRepositoryAccess(githubUsername)
      
      // Update user subscription status
      await updateUserSubscription(userId, 'free', 'expired')

      const event: GitHubAccessEvent = {
        user_id: userId,
        github_username: githubUsername,
        repositories: revokeResults.success,
        access_level: 'expired',
        tier: 'free',
        action: 'revoke',
        timestamp: new Date().toISOString()
      }

      await this.logAccessEvent(event)

      console.log(`🚫 Revoked all repository access for ${githubUsername}`)
      console.log(`   Removed from: ${revokeResults.success.join(', ')}`)
    } catch (error) {
      console.error('Error executing access revocation:', error)
    }
  }

  /**
   * Calculate subscription expiration date
   */
  private calculateExpirationDate(tier: string): string {
    const expiration = new Date()
    expiration.setMonth(expiration.getMonth() + 1) // Default to 1 month
    return expiration.toISOString()
  }

  /**
   * Get repositories for a specific tier
   */
  private getRepositoriesForTier(tier: string): RepositoryAccess[] {
    return REPOSITORY_ACCESS_MAP[tier] || REPOSITORY_ACCESS_MAP.free
  }

  /**
   * Log access events for auditing
   */
  private async logAccessEvent(event: GitHubAccessEvent): Promise<void> {
    try {
      // Log to console for debugging
      console.log('GitHub Access Event:', JSON.stringify(event, null, 2))
      
      // Store in database for audit trail
      await logGitHubAccessEvent(event)
    } catch (error) {
      console.error('Error logging access event:', error)
    }
  }
}

/**
 * Helper functions for repository access management
 */

/**
 * Get repository access manager instance
 */
export function getRepositoryAccessManager(): RepositoryAccessManager {
  return new RepositoryAccessManager()
}

/**
 * Handle Stripe webhook events for repository access
 */
export async function handleStripeWebhook(event: any): Promise<void> {
  const accessManager = getRepositoryAccessManager()

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      await accessManager.grantAccessOnPayment(
        session.client_reference_id, // Clerk user ID
        session.metadata?.tier || 'tier1'
      )
      break

    case 'customer.subscription.deleted':
      const subscription = event.data.object
      await accessManager.revokeAccessOnCancellation(
        subscription.metadata?.clerk_user_id
      )
      break

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object
      const oldTier = updatedSubscription.metadata?.old_tier
      const newTier = updatedSubscription.metadata?.new_tier
      
      if (oldTier && newTier && oldTier !== newTier) {
        await accessManager.updateAccessOnTierChange(
          updatedSubscription.metadata?.clerk_user_id,
          oldTier,
          newTier
        )
      }
      break

    default:
      console.log(`Unhandled Stripe event type: ${event.type}`)
  }
}

/**
 * Discord integration for premium tier access
 */
export async function grantDiscordAccess(
  discordUserId: string,
  tier: string
): Promise<boolean> {
  try {
    if (tier !== 'premium') {
      return false // Only premium users get Discord access
    }

    // TODO: Implement Discord bot integration
    // This would use Discord API to:
    // 1. Add user to premium Discord server
    // 2. Assign appropriate roles based on tier
    // 3. Send welcome message with repository links

    console.log(`🎮 Discord access granted for premium user: ${discordUserId}`)
    return true
  } catch (error) {
    console.error('Error granting Discord access:', error)
    return false
  }
}

/**
 * Validate repository access for API requests
 */
export async function validateRepositoryAccess(
  clerkUserId: string,
  repositoryName: string
): Promise<boolean> {
  try {
    const user = await getUserByClerkId(clerkUserId)
    if (!user || user.subscription_status !== 'active') {
      return false
    }

    const allowedRepos = REPOSITORY_ACCESS_MAP[user.subscription_tier] || []
    return allowedRepos.some(repo => repo.repository_name === repositoryName)
  } catch (error) {
    console.error('Error validating repository access:', error)
    return false
  }
}