import { Octokit } from '@octokit/rest'
import type { 
  GitHubUser, 
  GitHubRepository, 
  RepositoryAccess, 
  REPOSITORY_ACCESS_MAP,
  GitHubAppConfig 
} from '../types/github'

/**
 * GitHub API Client for Stuffnthings Repository Access Management
 * Manages progressive access to private repositories based on subscription tiers
 */
export class GitHubClient {
  private octokit: Octokit
  private organization: string = 'stuffnthingsio'

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token
    })
  }

  /**
   * Create GitHub client from App installation (preferred for webhook handlers)
   */
  static async fromAppInstallation(appConfig: GitHubAppConfig): Promise<GitHubClient> {
    const { createAppAuth } = await import('@octokit/auth-app')
    
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: parseInt(appConfig.app_id),
        privateKey: appConfig.private_key.replace(/\\n/g, '\n'),
        installationId: appConfig.installation_id ? parseInt(appConfig.installation_id) : undefined
      }
    })

    const client = new GitHubClient('')
    client.octokit = octokit
    return client
  }

  /**
   * Get all repositories in the stuffnthingsio organization
   */
  async getOrganizationRepositories(): Promise<GitHubRepository[]> {
    try {
      const { data } = await this.octokit.rest.repos.listForOrg({
        org: this.organization,
        type: 'all',
        per_page: 100
      })

      return data.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        private: repo.private,
        description: repo.description || undefined,
        tier_required: this.getRepositoryTier(repo.name),
        access_level: 'read' as const
      }))
    } catch (error) {
      console.error('Error fetching organization repositories:', error)
      throw new Error('Failed to fetch repositories')
    }
  }

  /**
   * Grant user access to repositories based on their subscription tier
   */
  async grantRepositoryAccess(
    githubUsername: string, 
    subscriptionTier: string,
    accessLevel: 'pull' | 'push' | 'admin' = 'pull'
  ): Promise<{ success: string[], failed: string[] }> {
    const repositories = this.getRepositoriesForTier(subscriptionTier)
    const results = { success: [], failed: [] }

    for (const repo of repositories) {
      try {
        await this.octokit.rest.repos.addCollaborator({
          owner: this.organization,
          repo: repo.repository_name,
          username: githubUsername,
          permission: repo.access_level === 'write' ? 'push' : accessLevel
        })
        
        results.success.push(repo.repository_name)
        console.log(`✅ Granted ${githubUsername} access to ${repo.repository_name}`)
      } catch (error) {
        console.error(`❌ Failed to grant access to ${repo.repository_name}:`, error)
        results.failed.push(repo.repository_name)
      }
    }

    return results
  }

  /**
   * Revoke user access from repositories
   */
  async revokeRepositoryAccess(
    githubUsername: string, 
    repositories?: string[]
  ): Promise<{ success: string[], failed: string[] }> {
    const reposToRevoke = repositories || this.getAllRepositoryNames()
    const results = { success: [], failed: [] }

    for (const repo of reposToRevoke) {
      try {
        await this.octokit.rest.repos.removeCollaborator({
          owner: this.organization,
          repo,
          username: githubUsername
        })
        
        results.success.push(repo)
        console.log(`✅ Revoked ${githubUsername} access from ${repo}`)
      } catch (error) {
        console.error(`❌ Failed to revoke access from ${repo}:`, error)
        results.failed.push(repo)
      }
    }

    return results
  }

  /**
   * Update user access when subscription tier changes
   */
  async updateRepositoryAccess(
    githubUsername: string,
    oldTier: string,
    newTier: string
  ): Promise<{ granted: string[], revoked: string[], failed: string[] }> {
    const oldRepos = this.getRepositoriesForTier(oldTier).map(r => r.repository_name)
    const newRepos = this.getRepositoriesForTier(newTier).map(r => r.repository_name)

    // Repositories to grant (new tier has them, old doesn't)
    const toGrant = newRepos.filter(repo => !oldRepos.includes(repo))
    
    // Repositories to revoke (old tier had them, new doesn't)
    const toRevoke = oldRepos.filter(repo => !newRepos.includes(repo))

    const results = { granted: [], revoked: [], failed: [] }

    // Grant new repositories
    if (toGrant.length > 0) {
      const grantResults = await this.grantRepositoryAccess(githubUsername, newTier)
      results.granted = grantResults.success.filter(repo => toGrant.includes(repo))
      results.failed.push(...grantResults.failed)
    }

    // Revoke old repositories
    if (toRevoke.length > 0) {
      const revokeResults = await this.revokeRepositoryAccess(githubUsername, toRevoke)
      results.revoked = revokeResults.success
      results.failed.push(...revokeResults.failed)
    }

    return results
  }

  /**
   * Check if user has access to a repository
   */
  async checkRepositoryAccess(githubUsername: string, repository: string): Promise<boolean> {
    try {
      const { data } = await this.octokit.rest.repos.checkCollaborator({
        owner: this.organization,
        repo: repository,
        username: githubUsername
      })
      return true
    } catch (error) {
      if (error.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * Get user's current repository access
   */
  async getUserRepositoryAccess(githubUsername: string): Promise<string[]> {
    const allRepos = this.getAllRepositoryNames()
    const accessibleRepos = []

    for (const repo of allRepos) {
      try {
        const hasAccess = await this.checkRepositoryAccess(githubUsername, repo)
        if (hasAccess) {
          accessibleRepos.push(repo)
        }
      } catch (error) {
        console.error(`Error checking access for ${repo}:`, error)
      }
    }

    return accessibleRepos
  }

  /**
   * Get GitHub user information
   */
  async getUser(username: string): Promise<GitHubUser | null> {
    try {
      const { data } = await this.octokit.rest.users.getByUsername({
        username
      })

      return {
        id: data.id,
        login: data.login,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        name: data.name || undefined,
        email: data.email || undefined
      }
    } catch (error) {
      if (error.status === 404) {
        return null
      }
      throw error
    }
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhookSignature(
    payload: string, 
    signature: string, 
    secret: string
  ): boolean {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')
    
    const receivedSignature = signature.replace('sha256=', '')
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(receivedSignature, 'hex')
    )
  }

  /**
   * Get repositories accessible for a subscription tier
   */
  private getRepositoriesForTier(tier: string): RepositoryAccess[] {
    return REPOSITORY_ACCESS_MAP[tier] || REPOSITORY_ACCESS_MAP.free
  }

  /**
   * Get all repository names in the organization
   */
  private getAllRepositoryNames(): string[] {
    const allRepos = new Set<string>()
    Object.values(REPOSITORY_ACCESS_MAP).forEach(repos => {
      repos.forEach(repo => allRepos.add(repo.repository_name))
    })
    return Array.from(allRepos)
  }

  /**
   * Determine repository tier based on name
   */
  private getRepositoryTier(repoName: string): string {
    for (const [tier, repos] of Object.entries(REPOSITORY_ACCESS_MAP)) {
      const found = repos.find(r => r.repository_name === repoName)
      if (found) return found.tier_required
    }
    return 'premium' // Default to highest tier for unknown repos
  }

  /**
   * Invite user to organization (if not already a member)
   */
  async inviteToOrganization(githubUsername: string): Promise<boolean> {
    try {
      // Check if user is already a member
      const { data } = await this.octokit.rest.orgs.checkMembershipForUser({
        org: this.organization,
        username: githubUsername
      })
      
      if (data.state === 'active') {
        return true // Already a member
      }
    } catch (error) {
      if (error.status !== 404) {
        throw error
      }
    }

    try {
      // Send organization invitation
      await this.octokit.rest.orgs.createInvitation({
        org: this.organization,
        invitee_id: (await this.getUser(githubUsername))?.id
      })
      
      return true
    } catch (error) {
      console.error('Failed to invite user to organization:', error)
      return false
    }
  }

  /**
   * Create repository if it doesn't exist
   */
  async createRepository(
    name: string, 
    description: string, 
    isPrivate: boolean = true
  ): Promise<GitHubRepository | null> {
    try {
      const { data } = await this.octokit.rest.repos.createInOrg({
        org: this.organization,
        name,
        description,
        private: isPrivate,
        auto_init: true
      })

      return {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        html_url: data.html_url,
        private: data.private,
        description: data.description || undefined,
        tier_required: this.getRepositoryTier(data.name),
        access_level: 'read'
      }
    } catch (error) {
      if (error.status === 422) {
        console.log(`Repository ${name} already exists`)
        return null
      }
      throw error
    }
  }

  /**
   * Setup initial repository structure for the stuffnthingsio organization
   */
  async setupRepositoryStructure(): Promise<void> {
    const repositories = [
      {
        name: 'lms-website',
        description: 'Public LMS website source code and deployment',
        private: false
      },
      {
        name: 'github-fundamentals',
        description: 'Git & GitHub fundamentals course materials',
        private: true
      },
      {
        name: 'advanced-workflows',
        description: 'Advanced Git workflows and CI/CD patterns',
        private: true
      },
      {
        name: 'business-automation',
        description: 'Business process automation with GitHub Actions',
        private: true
      },
      {
        name: 'integration-code-library',
        description: 'Complete integration code library and business tools',
        private: true
      }
    ]

    console.log('🚀 Setting up repository structure...')
    
    for (const repo of repositories) {
      try {
        const created = await this.createRepository(repo.name, repo.description, repo.private)
        if (created) {
          console.log(`✅ Created repository: ${repo.name}`)
        } else {
          console.log(`ℹ️ Repository already exists: ${repo.name}`)
        }
      } catch (error) {
        console.error(`❌ Failed to create ${repo.name}:`, error)
      }
    }

    console.log('✅ Repository structure setup complete!')
  }
}

/**
 * Helper function to get GitHub client instance
 */
export function getGitHubClient(): GitHubClient {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required')
  }
  
  return new GitHubClient(token)
}

/**
 * Helper function to get GitHub App config from environment
 */
export function getGitHubAppConfig(): GitHubAppConfig {
  const appId = process.env.GITHUB_APP_ID
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY
  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID

  if (!appId || !privateKey || !webhookSecret) {
    throw new Error('GitHub App configuration missing. Required: GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, GITHUB_WEBHOOK_SECRET')
  }

  return {
    app_id: appId,
    private_key: privateKey,
    webhook_secret: webhookSecret,
    organization: 'stuffnthingsio',
    installation_id: installationId
  }
}