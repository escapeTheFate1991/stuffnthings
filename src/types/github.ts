// GitHub Integration Types

export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name?: string
  email?: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  html_url: string
  private: boolean
  description?: string
  tier_required: string
  access_level: 'read' | 'write' | 'admin'
}

export interface GitHubWebhookEvent {
  action: string
  sender: GitHubUser
  repository?: GitHubRepository
  organization?: {
    id: number
    login: string
  }
}

export interface GitHubMembershipEvent extends GitHubWebhookEvent {
  action: 'added' | 'removed' | 'edited'
  member: GitHubUser
  scope: 'organization' | 'team'
}

export interface GitHubRepositoryEvent extends GitHubWebhookEvent {
  action: 'created' | 'deleted' | 'archived' | 'unarchived' | 'publicized' | 'privatized'
  repository: GitHubRepository
}

export interface GitHubCollaboratorEvent extends GitHubWebhookEvent {
  action: 'added' | 'removed'
  collaborator: GitHubUser
  repository: GitHubRepository
}

export interface RepositoryAccess {
  repository_name: string
  tier_required: string
  access_level: 'read' | 'write' | 'admin'
  description: string
  category: 'course' | 'tools' | 'premium'
}

// Subscription tier to repository mapping
export const REPOSITORY_ACCESS_MAP: Record<string, RepositoryAccess[]> = {
  free: [
    {
      repository_name: 'lms-website',
      tier_required: 'free',
      access_level: 'read',
      description: 'Public LMS website source code',
      category: 'course'
    }
  ],
  tier1: [
    {
      repository_name: 'lms-website',
      tier_required: 'free',
      access_level: 'read',
      description: 'Public LMS website source code',
      category: 'course'
    },
    {
      repository_name: 'github-fundamentals',
      tier_required: 'tier1',
      access_level: 'read',
      description: 'Git & GitHub fundamentals course materials',
      category: 'course'
    }
  ],
  tier2: [
    {
      repository_name: 'lms-website',
      tier_required: 'free',
      access_level: 'read',
      description: 'Public LMS website source code',
      category: 'course'
    },
    {
      repository_name: 'github-fundamentals',
      tier_required: 'tier1',
      access_level: 'read',
      description: 'Git & GitHub fundamentals course materials',
      category: 'course'
    },
    {
      repository_name: 'advanced-workflows',
      tier_required: 'tier2',
      access_level: 'read',
      description: 'Advanced Git workflows and CI/CD patterns',
      category: 'course'
    }
  ],
  tier3: [
    {
      repository_name: 'lms-website',
      tier_required: 'free',
      access_level: 'read',
      description: 'Public LMS website source code',
      category: 'course'
    },
    {
      repository_name: 'github-fundamentals',
      tier_required: 'tier1',
      access_level: 'read',
      description: 'Git & GitHub fundamentals course materials',
      category: 'course'
    },
    {
      repository_name: 'advanced-workflows',
      tier_required: 'tier2',
      access_level: 'read',
      description: 'Advanced Git workflows and CI/CD patterns',
      category: 'course'
    },
    {
      repository_name: 'business-automation',
      tier_required: 'tier3',
      access_level: 'read',
      description: 'Business process automation with GitHub Actions',
      category: 'course'
    }
  ],
  premium: [
    {
      repository_name: 'lms-website',
      tier_required: 'free',
      access_level: 'read',
      description: 'Public LMS website source code',
      category: 'course'
    },
    {
      repository_name: 'github-fundamentals',
      tier_required: 'tier1',
      access_level: 'read',
      description: 'Git & GitHub fundamentals course materials',
      category: 'course'
    },
    {
      repository_name: 'advanced-workflows',
      tier_required: 'tier2',
      access_level: 'read',
      description: 'Advanced Git workflows and CI/CD patterns',
      category: 'course'
    },
    {
      repository_name: 'business-automation',
      tier_required: 'tier3',
      access_level: 'read',
      description: 'Business process automation with GitHub Actions',
      category: 'course'
    },
    {
      repository_name: 'integration-code-library',
      tier_required: 'premium',
      access_level: 'write',
      description: 'Complete integration code library and tools',
      category: 'premium'
    }
  ]
}

export const INTEGRATION_CODE_STRUCTURE = {
  'twilio-integration': {
    description: 'SMS, Voice, and WhatsApp automation with Twilio API',
    files: ['setup.md', 'sms-automation.js', 'voice-calls.js', 'whatsapp-bot.js'],
    documentation: 'Complete Twilio integration guide'
  },
  'stripe-automation': {
    description: 'Payment automation and subscription management',
    files: ['webhook-handler.js', 'subscription-sync.js', 'invoice-automation.js'],
    documentation: 'Stripe payment automation patterns'
  },
  'discord-moderation': {
    description: 'Discord bot setup and community moderation',
    files: ['bot-setup.js', 'moderation-commands.js', 'role-management.js'],
    documentation: 'Discord community management automation'
  },
  'resend-email': {
    description: 'Email automation and transactional templates',
    files: ['email-client.js', 'template-system.js', 'automation-workflows.js'],
    documentation: 'Email marketing and automation'
  },
  'social-media': {
    description: 'Multi-platform social media automation',
    files: ['twitter-bot.js', 'instagram-scheduler.js', 'linkedin-automation.js'],
    documentation: 'Social media management tools'
  },
  'crm-integrations': {
    description: 'HubSpot, Salesforce, and CRM automation',
    files: ['hubspot-sync.js', 'salesforce-integration.js', 'lead-scoring.js'],
    documentation: 'CRM integration and data sync'
  }
}

export interface GitHubAccessEvent {
  user_id: number
  github_username: string
  repositories: string[]
  access_level: string
  tier: string
  action: 'grant' | 'revoke' | 'update'
  timestamp: string
}

export interface GitHubAppConfig {
  app_id: string
  private_key: string
  webhook_secret: string
  organization: string
  installation_id?: string
}