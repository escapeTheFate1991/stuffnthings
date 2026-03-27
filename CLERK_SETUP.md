# Clerk Authentication Setup Instructions

This document outlines the steps to complete the Clerk authentication integration for the Stuff N Things LMS platform.

## ✅ What's Already Implemented

1. **Clerk SDK Integration**
   - `@clerk/nextjs` installed and configured
   - ClerkProvider wrapper added to layout
   - Authentication utilities in `src/lib/auth.ts`

2. **Authentication Components**
   - SignInButton, SignUpButton, UserButton components
   - AuthStatus component for navigation
   - ProtectedRoute wrapper for secured pages

3. **Route Protection**
   - Middleware configured to protect `/learn/*` routes
   - Learning interface requires authentication
   - Protected profile page at `/profile`

4. **Database Integration**
   - Supabase user sync utilities
   - Webhook handler for user creation/updates
   - Clerk user ID mapping to Supabase users table

## 🔧 Required Clerk Dashboard Configuration

### 1. Create Clerk Application
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Create a new application
3. Choose your authentication providers:
   - ✅ **GitHub OAuth** (primary for developer audience)
   - ✅ **Google OAuth** (secondary option)
   - ✅ **Email/Password** (fallback)

### 2. Configure OAuth Providers

#### GitHub OAuth Setup:
1. In Clerk Dashboard → Authentication → Social Connections
2. Enable GitHub
3. Add GitHub OAuth app credentials:
   - Client ID: `your_github_client_id`
   - Client Secret: `your_github_client_secret`
4. Set callback URL: `https://your-domain.com/api/auth/callback/github`

#### Google OAuth Setup:
1. Enable Google in Social Connections
2. Add Google OAuth credentials:
   - Client ID: `your_google_client_id`
   - Client Secret: `your_google_client_secret`
3. Set callback URL: `https://your-domain.com/api/auth/callback/google`

### 3. Configure Webhooks
1. Go to Webhooks in Clerk Dashboard
2. Create endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to events:
   - `user.created`
   - `user.updated`
4. Copy the webhook secret for environment variables

### 4. Update Environment Variables

Replace the placeholder values in `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key
CLERK_SECRET_KEY=sk_live_your_actual_secret_key

# Clerk Webhook (for Supabase sync)
CLERK_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
```

## 📊 Database Schema Compatibility

The existing Supabase `users` table already includes:
- `clerk_user_id` column for Clerk integration
- User profile fields that sync with Clerk
- Subscription tiers and Git progress tracking

No additional database migrations required.

## 🚀 Testing the Integration

### 1. Development Testing
```bash
npm run dev
```

Visit:
- `/` - Should show sign-in/sign-up buttons in navigation
- `/learn/*` - Should require authentication
- `/profile` - Should show user profile after login

### 2. Production Deployment

#### Option A: Server Mode (Recommended)
- Current configuration supports server-side rendering
- Webhooks work for real-time user sync
- Deploy to Vercel, Netlify, or any Node.js host

#### Option B: Static Export (Limited)
- Uncomment `output: 'export'` in `next.config.js`
- Note: Webhooks won't work in static mode
- User sync will happen on client-side only

## 🔄 User Flow

1. **New User Registration:**
   - User signs up via GitHub/Google/Email
   - Clerk webhook triggers `/api/webhooks/clerk`
   - User record created in Supabase with Clerk ID mapping
   - Default subscription tier: 'free'

2. **User Authentication:**
   - User signs in with chosen provider
   - Clerk manages session state
   - Supabase user record updated with login timestamp
   - User can access learning content based on subscription tier

3. **Course Access Control:**
   - Free tier: Access to free courses
   - Pro tier: Access to pro + free courses  
   - Premium tier: Access to all courses
   - Git progress requirements checked for advanced content

## 🛡️ Security Features

- OAuth-only authentication (no password storage)
- Automatic CSRF protection via Clerk middleware
- Route-level protection for learning content
- User session management handled by Clerk
- Webhook signature verification for Supabase sync

## 📱 Mobile & Social Features

- Responsive auth components
- Social login buttons optimized for mobile
- User profile with GitHub integration
- Git progress tracking for gamification

## 🚨 Production Checklist

Before going live:
- [ ] Replace all placeholder environment variables
- [ ] Configure OAuth apps in GitHub/Google consoles
- [ ] Set up Clerk webhook endpoint
- [ ] Test user registration flow
- [ ] Test course access permissions
- [ ] Verify Supabase user sync
- [ ] Test mobile authentication flows
- [ ] Set up error monitoring for auth failures

## 🔧 Troubleshooting

### Common Issues:

1. **Build Errors:**
   - Type conflicts with Supabase client: Using `as any` casts temporarily
   - Consider upgrading to latest `@supabase/supabase-js` for better types

2. **Webhook Failures:**
   - Check CLERK_WEBHOOK_SECRET is correct
   - Verify webhook URL is accessible from Clerk
   - Check Supabase credentials in webhook handler

3. **Auth Redirects:**
   - Ensure middleware patterns match your route structure
   - Check Clerk publishable key is set correctly

## 📈 Next Steps

After basic setup:
1. **User Onboarding:** Add welcome flow for new users
2. **Subscription Management:** Integrate Stripe for paid tiers
3. **Git Integration:** Connect GitHub for progress tracking
4. **Analytics:** Track auth conversion and usage metrics
5. **Email Integration:** Set up Resend for transactional emails

---

**Support:** For implementation assistance, check Clerk documentation or create an issue in the project repository.