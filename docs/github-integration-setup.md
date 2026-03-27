# GitHub Integration Setup Guide

This guide covers the complete setup of the GitHub App integration and progressive repository access system for Stuffnthings.

## Overview

The GitHub integration provides:
- Progressive repository access based on subscription tiers
- Automatic access management via Stripe webhooks
- Repository structure for course materials and integration tools
- Discord community integration for premium users

## Repository Structure

### stuffnthingsio Organization Repositories

```
stuffnthingsio/
├── lms-website/                   (Public - Free tier)
│   ├── README.md
│   ├── deployment/
│   ├── src/
│   └── docs/
├── github-fundamentals/           (Private - Tier 1+)
│   ├── basics/
│   ├── workflows/
│   ├── collaboration/
│   └── exercises/
├── advanced-workflows/            (Private - Tier 2+)
│   ├── ci-cd/
│   ├── actions/
│   ├── automation/
│   └── enterprise/
├── business-automation/           (Private - Tier 3+)
│   ├── processes/
│   ├── integration-patterns/
│   ├── monitoring/
│   └── scaling/
└── integration-code-library/      (Private - Premium only)
    ├── twilio-integration/
    ├── stripe-automation/
    ├── discord-moderation/
    ├── resend-email/
    ├── social-media/
    └── crm-integrations/
```

## Setup Steps

### 1. GitHub App Configuration

Create a GitHub App in the stuffnthingsio organization:

1. Go to GitHub Settings → Developer settings → GitHub Apps
2. Click "New GitHub App"
3. Configure the following:

**Basic Information:**
- App name: `Stuffnthings Access Manager`
- Homepage URL: `https://stuffnthings.io`
- Webhook URL: `https://stuffnthings.io/api/github/webhook`

**Permissions:**
- Repository administration: Read & Write (for collaborator management)
- Organization members: Read & Write (for team access)
- Metadata: Read (for repository information)

**Subscribe to events:**
- Member
- Repository  
- Collaborator
- Organization

**Where can this GitHub App be installed?**
- Only on this account (stuffnthingsio)

### 2. Environment Variables

Add to `.env.local`:

```bash
# GitHub App Configuration
GITHUB_APP_ID=your_app_id
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nyour_private_key\n-----END RSA PRIVATE KEY-----"
GITHUB_APP_INSTALLATION_ID=your_installation_id
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# GitHub Personal Access Token (for setup)
GITHUB_TOKEN=your_personal_access_token
```

### 3. Repository Creation

Run the setup script to create repositories:

```bash
npm run setup:github
```

This creates all the required repositories with proper permissions.

### 4. Integration Code Library Structure

The `integration-code-library` repository contains:

#### Twilio Integration (`/twilio-integration/`)
- **Files:** `setup.md`, `sms-automation.js`, `voice-calls.js`, `whatsapp-bot.js`
- **Purpose:** Complete SMS, Voice, and WhatsApp automation
- **Features:** Number verification, bulk messaging, conversation flows

#### Stripe Automation (`/stripe-automation/`)
- **Files:** `webhook-handler.js`, `subscription-sync.js`, `invoice-automation.js`
- **Purpose:** Payment automation and subscription management
- **Features:** Auto-billing, dunning management, usage tracking

#### Discord Moderation (`/discord-moderation/`)
- **Files:** `bot-setup.js`, `moderation-commands.js`, `role-management.js`
- **Purpose:** Community management and moderation
- **Features:** Auto-moderation, role assignment, engagement tracking

#### Resend Email (`/resend-email/`)
- **Files:** `email-client.js`, `template-system.js`, `automation-workflows.js`
- **Purpose:** Email marketing and transactional emails
- **Features:** Template management, segmentation, analytics

#### Social Media (`/social-media/`)
- **Files:** `twitter-bot.js`, `instagram-scheduler.js`, `linkedin-automation.js`
- **Purpose:** Multi-platform social media automation
- **Features:** Content scheduling, engagement automation, analytics

#### CRM Integrations (`/crm-integrations/`)
- **Files:** `hubspot-sync.js`, `salesforce-integration.js`, `lead-scoring.js`
- **Purpose:** Customer relationship management
- **Features:** Lead sync, scoring, pipeline automation

## Subscription Tier Access

### Free Tier
- ✅ `lms-website` (read access)

### Tier 1 ($29/month)
- ✅ `lms-website` (read access)
- ✅ `github-fundamentals` (read access)

### Tier 2 ($79/month)
- ✅ `lms-website` (read access)
- ✅ `github-fundamentals` (read access)
- ✅ `advanced-workflows` (read access)

### Tier 3 ($149/month)
- ✅ `lms-website` (read access)
- ✅ `github-fundamentals` (read access)
- ✅ `advanced-workflows` (read access)
- ✅ `business-automation` (read access)

### Premium Tier ($299/month)
- ✅ All above repositories (read access)
- ✅ `integration-code-library` (write access)
- ✅ Discord premium community access
- ✅ 1-on-1 consultation calls
- ✅ Custom integration development

## API Endpoints

### Grant Access
```http
POST /api/github/grant-access
Content-Type: application/json
Authorization: Bearer <clerk_token>

{
  "githubUsername": "username",
  "tier": "tier1"
}
```

### Revoke Access
```http
POST /api/github/revoke-access
Content-Type: application/json
Authorization: Bearer <clerk_token>

{
  "gracePeriodDays": 3
}
```

### Get Access Status
```http
GET /api/github/grant-access
Authorization: Bearer <clerk_token>
```

### Update Tier
```http
PATCH /api/github/revoke-access
Content-Type: application/json
Authorization: Bearer <clerk_token>

{
  "oldTier": "tier1",
  "newTier": "tier2"
}
```

## Webhook Integration

### Stripe Webhooks
The system listens for these Stripe events:
- `checkout.session.completed` → Grant access
- `customer.subscription.deleted` → Revoke access (with grace period)
- `customer.subscription.updated` → Update tier access

### GitHub Webhooks
The system handles these GitHub events:
- `member` → Organization membership changes
- `repository` → Repository creation/deletion
- `collaborator` → Repository access changes

## Discord Integration

Premium tier users get:
1. Invitation to private Discord server
2. Premium role assignment
3. Access to exclusive channels
4. Priority support

## Security Features

1. **Webhook Signature Verification:** All webhooks are verified using HMAC-SHA256
2. **User Authentication:** Clerk integration for secure user management
3. **Access Logging:** All access changes are logged for audit
4. **Grace Period:** 3-day grace period before access revocation
5. **Admin Override:** Super admin can immediately revoke access

## Testing

### Build Test
```bash
npm run github:test
```

### Manual Tests
1. Create test user in Clerk
2. Link GitHub username
3. Test subscription upgrade/downgrade
4. Verify repository access changes
5. Test webhook handlers

### Verification Commands
```bash
# Check GitHub client functionality
test -f src/lib/github.ts && echo "GitHub client created"

# Check API endpoints
test -f src/app/api/github/grant-access/route.ts && echo "Grant access API ready"
test -f src/app/api/github/revoke-access/route.ts && echo "Revoke access API ready"

# Check access control logic
test -f src/lib/repository-access.ts && echo "Access control logic implemented"

# Build verification
npm run build && echo "Build successful with GitHub integration"
```

## Monitoring

Monitor the following:
- Webhook delivery failures
- Access grant/revoke operations
- User subscription status
- Repository access audits

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Events**
   - Verify webhook URL is accessible
   - Check webhook secret configuration
   - Ensure GitHub App has proper permissions

2. **Access Grant Failures**
   - Verify GitHub username exists
   - Check repository permissions
   - Validate subscription status

3. **Build Failures**
   - Ensure all dependencies are installed
   - Check TypeScript compilation
   - Verify environment variables

### Debug Commands
```bash
# Test GitHub connection
node -e "require('./src/lib/github').getGitHubClient().getOrganizationRepositories().then(console.log)"

# Check user access
curl -H "Authorization: Bearer <token>" https://stuffnthings.io/api/github/grant-access

# Verify webhook endpoint
curl -X POST https://stuffnthings.io/api/github/webhook
```

## Next Steps

1. **Deploy to Production**
   - Update webhook URLs to production
   - Configure production GitHub App
   - Test with real subscriptions

2. **Enhanced Features**
   - Repository templates for new projects
   - Automated onboarding flows
   - Advanced analytics dashboard

3. **Monitoring Setup**
   - Set up error tracking
   - Configure access audit reports
   - Monitor subscription churn

## Support

For issues with the GitHub integration:
1. Check the troubleshooting section
2. Review webhook delivery logs
3. Contact support with error details and user ID