import { NextRequest, NextResponse } from 'next/server'
import { GitHubClient } from '../../../../lib/github'
import { getRepositoryAccessManager } from '../../../../lib/repository-access'
import type { 
  GitHubWebhookEvent, 
  GitHubMembershipEvent, 
  GitHubRepositoryEvent,
  GitHubCollaboratorEvent 
} from '../../../../types/github'

/**
 * GitHub Webhook Handler
 * Processes GitHub organization and repository events for access management
 */

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-hub-signature-256')
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET

    if (!signature || !webhookSecret) {
      console.error('Missing webhook signature or secret')
      return NextResponse.json(
        { error: 'Missing webhook signature or secret' },
        { status: 400 }
      )
    }

    const payload = await request.text()
    
    // Verify webhook signature
    const isValidSignature = GitHubClient.verifyWebhookSignature(
      payload,
      signature,
      webhookSecret
    )

    if (!isValidSignature) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 403 }
      )
    }

    const event: GitHubWebhookEvent = JSON.parse(payload)
    const eventType = request.headers.get('x-github-event')

    console.log(`📡 Received GitHub webhook: ${eventType}`)
    console.log(`   Action: ${event.action}`)
    console.log(`   Sender: ${event.sender.login}`)

    // Process the webhook event
    await processWebhookEvent(eventType, event)

    return NextResponse.json(
      { success: true, message: `Processed ${eventType} event` },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing GitHub webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * Process different types of GitHub webhook events
 */
async function processWebhookEvent(eventType: string | null, event: GitHubWebhookEvent): Promise<void> {
  const accessManager = getRepositoryAccessManager()

  switch (eventType) {
    case 'membership':
      await handleMembershipEvent(event as GitHubMembershipEvent, accessManager)
      break

    case 'repository':
      await handleRepositoryEvent(event as GitHubRepositoryEvent, accessManager)
      break

    case 'collaborator':
      await handleCollaboratorEvent(event as GitHubCollaboratorEvent, accessManager)
      break

    case 'organization':
      await handleOrganizationEvent(event, accessManager)
      break

    case 'ping':
      console.log('✅ GitHub webhook ping received - connection verified')
      break

    default:
      console.log(`ℹ️ Unhandled webhook event type: ${eventType}`)
  }
}

/**
 * Handle organization membership events
 */
async function handleMembershipEvent(
  event: GitHubMembershipEvent,
  accessManager: any
): Promise<void> {
  const { action, member } = event

  switch (action) {
    case 'added':
      console.log(`👥 New member added to organization: ${member.login}`)
      // Could trigger welcome email or setup process
      break

    case 'removed':
      console.log(`👋 Member removed from organization: ${member.login}`)
      // Could clean up any remaining access or notify user
      break

    default:
      console.log(`ℹ️ Unhandled membership action: ${action}`)
  }
}

/**
 * Handle repository events (create, delete, etc.)
 */
async function handleRepositoryEvent(
  event: GitHubRepositoryEvent,
  accessManager: any
): Promise<void> {
  const { action, repository } = event

  switch (action) {
    case 'created':
      console.log(`📁 New repository created: ${repository.full_name}`)
      // Could automatically configure repository settings or webhooks
      await configureNewRepository(repository)
      break

    case 'deleted':
      console.log(`🗑️ Repository deleted: ${repository.full_name}`)
      // Could clean up access records or notify affected users
      break

    case 'privatized':
      console.log(`🔒 Repository made private: ${repository.full_name}`)
      // Could trigger access review for newly private repo
      break

    case 'publicized':
      console.log(`🌐 Repository made public: ${repository.full_name}`)
      // Could update access controls for newly public repo
      break

    default:
      console.log(`ℹ️ Unhandled repository action: ${action}`)
  }
}

/**
 * Handle collaborator events (added/removed from repositories)
 */
async function handleCollaboratorEvent(
  event: GitHubCollaboratorEvent,
  accessManager: any
): Promise<void> {
  const { action, collaborator, repository } = event

  switch (action) {
    case 'added':
      console.log(`✅ Collaborator added: ${collaborator.login} to ${repository.name}`)
      // Could trigger welcome email with repository documentation
      await sendRepositoryWelcomeEmail(collaborator, repository)
      break

    case 'removed':
      console.log(`❌ Collaborator removed: ${collaborator.login} from ${repository.name}`)
      // Could log the removal for audit purposes
      break

    default:
      console.log(`ℹ️ Unhandled collaborator action: ${action}`)
  }
}

/**
 * Handle organization-level events
 */
async function handleOrganizationEvent(
  event: GitHubWebhookEvent,
  accessManager: any
): Promise<void> {
  console.log(`🏢 Organization event: ${event.action}`)
  // Handle organization-level changes that might affect access policies
}

/**
 * Configure settings for newly created repositories
 */
async function configureNewRepository(repository: any): Promise<void> {
  try {
    // This would configure repository settings like:
    // - Enable branch protection
    // - Setup required status checks
    // - Configure merge settings
    // - Add repository description/topics
    
    console.log(`⚙️ Configuring repository settings for: ${repository.name}`)
    
    // Example configurations could be added here
    // await githubClient.configureRepositorySettings(repository.name)
  } catch (error) {
    console.error('Error configuring new repository:', error)
  }
}

/**
 * Send welcome email when user gains repository access
 */
async function sendRepositoryWelcomeEmail(collaborator: any, repository: any): Promise<void> {
  try {
    // This would integrate with your email system (Resend)
    // to send repository access welcome emails with:
    // - Repository overview and documentation links
    // - Getting started guide
    // - Support contact information
    
    console.log(`📧 Sending welcome email to ${collaborator.login} for ${repository.name}`)
    
    // Example email integration:
    // await emailClient.sendRepositoryWelcome({
    //   to: collaborator.email,
    //   repository: repository.name,
    //   repositoryUrl: repository.html_url
    // })
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

/**
 * Health check endpoint for webhook
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'healthy',
    webhook: 'github-access-management',
    timestamp: new Date().toISOString(),
    organization: 'stuffnthingsio'
  })
}

/**
 * Webhook event verification utility
 */
function verifyWebhookOrigin(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')
  return userAgent?.startsWith('GitHub-Hookshot/') || false
}

/**
 * Extract repository tier from event
 */
function extractRepositoryTier(repository: any): string {
  // Logic to determine tier based on repository name or metadata
  const { name } = repository
  
  if (name === 'lms-website') return 'free'
  if (name === 'ai-fundamentals') return 'spark'
  if (name === 'advanced-workflows') return 'synapse'
  if (name === 'business-automation') return 'cortex'
  if (name === 'enterprise-integrations') return 'singularity'
  
  return 'singularity' // Default to highest tier for unknown repos
}

/**
 * Log webhook event for debugging and auditing
 */
async function logWebhookEvent(eventType: string, event: GitHubWebhookEvent): Promise<void> {
  const logData = {
    type: eventType,
    action: event.action,
    sender: event.sender.login,
    repository: event.repository?.name || null,
    timestamp: new Date().toISOString()
  }

  console.log('GitHub Webhook Event Log:', JSON.stringify(logData, null, 2))
  
  // Could store in database for audit trail:
  // await insertWebhookLog(logData)
}