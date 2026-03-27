import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getRepositoryAccessManager } from '../../../../lib/repository-access'
import { getUserByClerkId } from '../../../../lib/database'
import { validateRepositoryAccess } from '../../../../lib/repository-access'

/**
 * Grant GitHub Repository Access API
 * Handles requests to grant repository access based on subscription tiers
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
    const { githubUsername, tier, repositories } = body

    // Validate required fields
    if (!githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
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

    const accessManager = getRepositoryAccessManager()

    // If GitHub username is provided, link the account first
    if (githubUsername !== user.git_username) {
      console.log(`🔗 Linking GitHub account: ${githubUsername}`)
      await accessManager.linkGitHubAccount(userId, githubUsername)
    }

    // Determine the tier to grant access for
    const targetTier = tier || user.subscription_tier || 'free'

    // Grant repository access
    const accessEvent = await accessManager.grantAccessOnPayment(
      userId,
      targetTier
    )

    if (!accessEvent) {
      return NextResponse.json(
        { error: 'Failed to grant repository access' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Repository access granted successfully',
      data: {
        githubUsername: accessEvent.github_username,
        tier: accessEvent.tier,
        repositories: accessEvent.repositories,
        accessLevel: accessEvent.access_level,
        timestamp: accessEvent.timestamp
      }
    })
  } catch (error) {
    console.error('Error granting repository access:', error)
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
 * Get user's current repository access status
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

    const accessManager = getRepositoryAccessManager()
    const accessStatus = await accessManager.getUserAccessStatus(userId)

    return NextResponse.json({
      success: true,
      data: accessStatus
    })
  } catch (error) {
    console.error('Error getting repository access status:', error)
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
 * Update GitHub username for authenticated user
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
    const { githubUsername } = body

    if (!githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      )
    }

    // Validate GitHub username format
    if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(githubUsername)) {
      return NextResponse.json(
        { error: 'Invalid GitHub username format' },
        { status: 400 }
      )
    }

    const accessManager = getRepositoryAccessManager()
    
    // Link GitHub account
    const success = await accessManager.linkGitHubAccount(userId, githubUsername)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to link GitHub account' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'GitHub account linked successfully',
      data: {
        githubUsername
      }
    })
  } catch (error) {
    console.error('Error updating GitHub username:', error)
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
 * Validate access to a specific repository
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

    const body = await request.json()
    const { repositoryName } = body

    if (!repositoryName) {
      return NextResponse.json(
        { error: 'Repository name is required' },
        { status: 400 }
      )
    }

    // Validate repository access
    const hasAccess = await validateRepositoryAccess(userId, repositoryName)

    return NextResponse.json({
      success: true,
      data: {
        repository: repositoryName,
        hasAccess,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error validating repository access:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}