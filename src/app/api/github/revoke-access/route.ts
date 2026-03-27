import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getRepositoryAccessManager } from '../../../../lib/repository-access'
import { getUserByClerkId } from '../../../../lib/database'

/**
 * Revoke GitHub Repository Access API
 * Handles requests to revoke repository access (cancellations, downgrades, etc.)
 */

export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { repositories, gracePeriodDays = 3 } = body

    // Get user from database
    const user = await getUserByClerkId(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!user.git_username) {
      return NextResponse.json(
        { error: 'No GitHub username linked to this account' },
        { status: 400 }
      )
    }

    const accessManager = getRepositoryAccessManager()

    // Revoke repository access with grace period
    const accessEvent = await accessManager.revokeAccessOnCancellation(
      userId,
      gracePeriodDays
    )

    if (!accessEvent) {
      return NextResponse.json(
        { error: 'Failed to schedule repository access revocation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Repository access revocation scheduled with ${gracePeriodDays}-day grace period`,
      data: {
        githubUsername: accessEvent.github_username,
        gracePeriodDays,
        scheduledRevocationDate: new Date(Date.now() + gracePeriodDays * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: accessEvent.timestamp
      }
    })
  } catch (error) {
    console.error('Error revoking repository access:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Immediately revoke access to specific repositories
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate the request (admin-only for immediate revocation)
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { targetUserId, repositories } = body

    // For security, this should only be accessible to admins
    const user = await getUserByClerkId(userId)
    if (!user || !user.is_superadmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const targetUser = await getUserByClerkId(targetUserId)
    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      )
    }

    if (!targetUser.git_username) {
      return NextResponse.json(
        { error: 'No GitHub username linked to target account' },
        { status: 400 }
      )
    }

    const accessManager = getRepositoryAccessManager()

    // Immediately revoke access to specified repositories
    const revokeResults = await accessManager.executeAccessRevocation(
      targetUser.id,
      targetUser.git_username
    )

    return NextResponse.json({
      success: true,
      message: 'Repository access revoked immediately',
      data: {
        targetUser: targetUser.email,
        githubUsername: targetUser.git_username,
        revokedRepositories: repositories || 'all',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error immediately revoking repository access:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Update repository access (tier change)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { oldTier, newTier } = body

    if (!oldTier || !newTier) {
      return NextResponse.json(
        { error: 'Both oldTier and newTier are required' },
        { status: 400 }
      )
    }

    const validTiers = ['free', 'tier1', 'tier2', 'tier3', 'premium']
    if (!validTiers.includes(oldTier) || !validTiers.includes(newTier)) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      )
    }

    const accessManager = getRepositoryAccessManager()

    // Update repository access based on tier change
    const accessEvent = await accessManager.updateAccessOnTierChange(
      userId,
      oldTier,
      newTier
    )

    if (!accessEvent) {
      return NextResponse.json(
        { error: 'Failed to update repository access' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Repository access updated from ${oldTier} to ${newTier}`,
      data: {
        githubUsername: accessEvent.github_username,
        oldTier,
        newTier,
        repositories: accessEvent.repositories,
        timestamp: accessEvent.timestamp
      }
    })
  } catch (error) {
    console.error('Error updating repository access:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Cancel pending access revocation
 */
export async function PUT(request: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await getUserByClerkId(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user has a pending cancellation
    if (user.subscription_status !== 'canceled') {
      return NextResponse.json(
        { error: 'No pending access revocation found' },
        { status: 400 }
      )
    }

    // Reactivate subscription and cancel pending revocation
    const { updateUserSubscription } = await import('../../../../lib/database')
    await updateUserSubscription(
      user.id,
      user.subscription_tier,
      'active'
    )

    return NextResponse.json({
      success: true,
      message: 'Access revocation canceled, subscription reactivated',
      data: {
        githubUsername: user.git_username,
        tier: user.subscription_tier,
        status: 'active',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error canceling access revocation:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Get access revocation status
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserByClerkId(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const hasScheduledRevocation = user.subscription_status === 'canceled'
    const gracePeriodEnd = user.subscription_expires_at ? 
      new Date(user.subscription_expires_at) : null

    return NextResponse.json({
      success: true,
      data: {
        hasScheduledRevocation,
        subscriptionStatus: user.subscription_status,
        subscriptionTier: user.subscription_tier,
        gracePeriodEnd: gracePeriodEnd?.toISOString() || null,
        githubUsername: user.git_username,
        canCancelRevocation: hasScheduledRevocation && gracePeriodEnd && gracePeriodEnd > new Date()
      }
    })
  } catch (error) {
    console.error('Error getting access revocation status:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}