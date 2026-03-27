# Clerk Application Setup - Wave 1B Execution

## 🎯 Setup Status: READY FOR EXECUTION

All code integration is complete. Need to configure Clerk Dashboard and OAuth providers.

## 📋 Step 1: Create Clerk Application

### 1.1 Access Clerk Dashboard
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Sign in with GitHub account (recommended for developer workflow)
3. Click "Create Application"

### 1.2 Application Configuration
```
Application Name: Stuff N Things LMS
Application Type: Next.js
Framework: Next.js (App Router)
Primary Domain: stuffnthings.io
```

### 1.3 Copy API Keys
After creating the application:
```bash
# Development Keys (for testing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Production Keys (for live deployment)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
```

## 🔐 Step 2: Configure OAuth Providers

### 2.1 GitHub OAuth Setup
1. **Create GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Click "New OAuth App"
   
   ```
   Application Name: Stuff N Things LMS
   Homepage URL: https://stuffnthings.io
   Authorization callback URL: https://stuffnthings.io/api/auth/callback/github
   ```

2. **Copy GitHub Credentials**
   ```bash
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

3. **Configure in Clerk Dashboard**
   - Go to Clerk Dashboard → Authentication → Social Connections
   - Enable GitHub
   - Add GitHub Client ID and Secret
   - Set callback URL: `https://stuffnthings.io/api/auth/callback/github`

### 2.2 Google OAuth Setup
1. **Create Google OAuth App**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Google+ API
   - Go to Credentials > Create OAuth 2.0 Client ID
   
   ```
   Application Type: Web application
   Name: Stuff N Things LMS
   Authorized JavaScript origins: https://stuffnthings.io
   Authorized redirect URIs: https://stuffnthings.io/api/auth/callback/google
   ```

2. **Copy Google Credentials**
   ```bash
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Configure in Clerk Dashboard**
   - Enable Google in Social Connections
   - Add Google Client ID and Secret
   - Set callback URL: `https://stuffnthings.io/api/auth/callback/google`

### 2.3 Email/Password Setup
1. **Enable Email Provider**
   - In Clerk Dashboard → Authentication → Email & Phone
   - Enable "Email address" as identifier
   - Enable "Password" authentication
   - Configure email verification settings

## 🔗 Step 3: Webhook Configuration

### 3.1 Create Webhook Endpoint
1. **In Clerk Dashboard → Webhooks**
   ```
   Endpoint URL: https://stuffnthings.io/api/webhooks/clerk
   Description: Supabase User Sync
   ```

2. **Subscribe to Events**
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted` (optional)

3. **Copy Webhook Secret**
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
   ```

### 3.2 Webhook Handler (Already Implemented)
The webhook handler at `/src/app/api/webhooks/clerk/route.ts` is ready and will:
- Verify webhook signatures using SVIX
- Sync user data to Supabase on create/update events
- Handle user profile updates and email verification

## ⚙️ Step 4: Environment Variables Update

### 4.1 Update .env.local
Replace placeholder values with actual credentials:

```bash
# Clerk Authentication (PRODUCTION)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[ACTUAL_KEY]
CLERK_SECRET_KEY=sk_live_[ACTUAL_KEY]
CLERK_WEBHOOK_SECRET=whsec_[ACTUAL_SECRET]

# OAuth Provider Credentials
GITHUB_CLIENT_ID=[ACTUAL_GITHUB_CLIENT_ID]
GITHUB_CLIENT_SECRET=[ACTUAL_GITHUB_CLIENT_SECRET]
GOOGLE_CLIENT_ID=[ACTUAL_GOOGLE_CLIENT_ID] 
GOOGLE_CLIENT_SECRET=[ACTUAL_GOOGLE_CLIENT_SECRET]
```

### 4.2 Development vs Production
```bash
# For development/testing
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[TEST_KEY]
CLERK_SECRET_KEY=sk_test_[TEST_KEY]

# For production deployment
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[LIVE_KEY]
CLERK_SECRET_KEY=sk_live_[LIVE_KEY]
```

## 🧪 Step 5: Testing Protocol

### 5.1 Local Development Testing
```bash
# Start development server
npm run dev

# Test URLs
http://localhost:3000/          # Should show auth buttons
http://localhost:3000/learn/    # Should require authentication
http://localhost:3000/profile/  # Should redirect to sign-in
```

### 5.2 Authentication Flow Testing
1. **GitHub OAuth Flow**
   - Click "Sign in with GitHub"
   - Verify redirect to GitHub
   - Verify successful callback and user creation

2. **Google OAuth Flow**
   - Click "Sign in with Google" 
   - Verify Google consent flow
   - Verify successful authentication

3. **Email/Password Flow**
   - Test email signup with verification
   - Test password signin
   - Test password reset flow

### 5.3 Database Sync Verification
After each auth test, verify in Supabase:
```sql
-- Check user sync
SELECT clerk_user_id, email, first_name, last_name, subscription_tier, created_at
FROM users 
WHERE clerk_user_id IS NOT NULL
ORDER BY created_at DESC;

-- Verify webhook events
SELECT * FROM webhook_logs WHERE source = 'clerk' ORDER BY created_at DESC;
```

## 🚀 Step 6: Production Deployment

### 6.1 Clerk Dashboard Production Settings
1. **Update Application URLs**
   ```
   Production Domain: stuffnthings.io
   Webhook URL: https://stuffnthings.io/api/webhooks/clerk
   ```

2. **OAuth Callback URLs**
   ```
   GitHub: https://stuffnthings.io/api/auth/callback/github
   Google: https://stuffnthings.io/api/auth/callback/google
   ```

### 6.2 Deploy to Production
```bash
# Build and deploy
npm run build
npm run start

# Or deploy to Vercel/Netlify with production env vars
```

## 🔍 Step 7: Monitoring & Troubleshooting

### 7.1 Common Issues
1. **OAuth Callback Mismatch**
   - Ensure callback URLs match exactly in provider settings
   - Check for trailing slashes and protocol (https vs http)

2. **Webhook Failures** 
   - Verify CLERK_WEBHOOK_SECRET is correct
   - Check webhook URL is publicly accessible
   - Monitor Supabase logs for sync errors

3. **Environment Variable Issues**
   - Ensure NEXT_PUBLIC_ prefix for client-side variables
   - Verify no trailing spaces in .env.local
   - Restart dev server after env changes

### 7.2 Debug Commands
```bash
# Check environment variables
npm run env:check

# Test webhook endpoint
curl -X POST https://stuffnthings.io/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Monitor logs
npm run logs:dev
```

## ✅ Completion Checklist

### Clerk Application Setup
- [ ] Clerk application created
- [ ] API keys copied to environment
- [ ] Application configured for stuffnthings.io domain

### OAuth Providers
- [ ] GitHub OAuth app created and configured
- [ ] Google OAuth app created and configured  
- [ ] Email/password authentication enabled
- [ ] All provider credentials added to Clerk Dashboard

### Webhook Configuration
- [ ] Webhook endpoint created in Clerk Dashboard
- [ ] Webhook secret added to environment variables
- [ ] User sync events configured (user.created, user.updated)

### Testing & Verification
- [ ] Local development authentication tested
- [ ] All OAuth flows working (GitHub, Google, Email)
- [ ] User data syncing to Supabase correctly
- [ ] Protected routes require authentication
- [ ] User profile and session management working

### Production Readiness
- [ ] Production domain configured in Clerk
- [ ] OAuth callback URLs updated for production
- [ ] Production environment variables set
- [ ] Webhook endpoint accessible from Clerk
- [ ] Error monitoring and logging configured

---

## 📞 Support Resources

- **Clerk Documentation**: https://clerk.dev/docs
- **GitHub OAuth Guide**: https://docs.github.com/en/apps/oauth-apps
- **Google OAuth Guide**: https://developers.google.com/identity/protocols/oauth2
- **Next.js Clerk Integration**: https://clerk.dev/docs/nextjs
- **Webhook Security**: https://clerk.dev/docs/integrations/webhooks

**Status**: Ready for execution. All code is implemented, need OAuth provider configuration and credential setup.