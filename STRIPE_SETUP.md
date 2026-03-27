# Stripe Setup for Course System & Pricing Tiers

This guide explains how to configure Stripe products and webhooks for the GitHub course paywall system.

## Quick Setup

### 1. Create Products in Stripe Dashboard

Using your existing War Room test keys, create these products in the Stripe Dashboard:

#### Tier 1: Beginner ($99/month, $70/month annual)
- **Product Name**: "GitHub Fundamentals - Beginner"
- **Monthly Price ID**: Save as `STRIPE_TIER1_MONTHLY_PRICE_ID` 
- **Annual Price ID**: Save as `STRIPE_TIER1_ANNUAL_PRICE_ID`

#### Tier 2: Intermediate ($149/month, $106/month annual) 
- **Product Name**: "GitHub Workflows - Intermediate"
- **Monthly Price ID**: Save as `STRIPE_TIER2_MONTHLY_PRICE_ID`
- **Annual Price ID**: Save as `STRIPE_TIER2_ANNUAL_PRICE_ID`

#### Tier 3: Professional ($249/month, $177/month annual)
- **Product Name**: "GitHub Mastery - Professional" 
- **Monthly Price ID**: Save as `STRIPE_TIER3_MONTHLY_PRICE_ID`
- **Annual Price ID**: Save as `STRIPE_TIER3_ANNUAL_PRICE_ID`

#### Premium: Enterprise ($799/month, $567/month annual)
- **Product Name**: "GitHub Enterprise - Premium"
- **Monthly Price ID**: Save as `STRIPE_PREMIUM_MONTHLY_PRICE_ID`
- **Annual Price ID**: Save as `STRIPE_PREMIUM_ANNUAL_PRICE_ID`

### 2. Configure Webhooks

Create a webhook endpoint in Stripe Dashboard:
- **URL**: `https://yourdomain.com/api/stripe/webhook`
- **Events to Send**:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `checkout.session.completed`

### 3. Update Environment Variables

Add the price IDs to your `.env.local`:

```bash
# Stripe Price IDs (replace with actual IDs from dashboard)
STRIPE_TIER1_MONTHLY_PRICE_ID=price_1234567890
STRIPE_TIER1_ANNUAL_PRICE_ID=price_0987654321
STRIPE_TIER2_MONTHLY_PRICE_ID=price_1111111111
STRIPE_TIER2_ANNUAL_PRICE_ID=price_2222222222
STRIPE_TIER3_MONTHLY_PRICE_ID=price_3333333333
STRIPE_TIER3_ANNUAL_PRICE_ID=price_4444444444
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_5555555555
STRIPE_PREMIUM_ANNUAL_PRICE_ID=price_6666666666

# Webhook secret from Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Architecture Overview

### Components Created
1. **PricingTiers.tsx** - Main pricing display with 4 tiers
2. **PricingToggle.tsx** - Monthly/annual billing toggle
3. **Stripe Integration** - Complete checkout and webhook system
4. **Database Functions** - Subscription management and access control
5. **API Routes** - Checkout, webhook, and portal management

### Repository Access Mapping
- **Tier 1**: `github-fundamentals` 
- **Tier 2**: `github-fundamentals` + `advanced-workflows`
- **Tier 3**: Tier 2 + `business-automation`
- **Premium**: All repos + `integration-code-library` + 3hrs monthly support

### Key Features
- ✅ 29% annual discount automatically applied
- ✅ Progressive repository access based on tier
- ✅ Discord community integration ready
- ✅ Stripe Customer Portal for subscription management
- ✅ Webhook-driven subscription lifecycle
- ✅ Access control for courses and chapters
- ✅ Real-time subscription status sync

### Database Integration
The system integrates with existing Supabase tables:
- Updates `users.subscription_tier`, `subscription_status`, `subscription_expires_at`
- Uses existing `courses.access_tier` for content gating
- Maintains compatibility with Clerk authentication

### Testing the System
1. Navigate to `/pricing`
2. Click "Get Started" on any tier
3. Complete checkout with Stripe test card: `4242 4242 4242 4242`
4. Webhook should update user subscription in database
5. Access control should be enforced on protected content

## Production Checklist
- [ ] Switch to production Stripe keys
- [ ] Update webhook URL to production domain  
- [ ] Configure Discord bot integration
- [ ] Set up monitoring for failed webhooks
- [ ] Test subscription lifecycle (create/update/cancel)
- [ ] Verify course access control
- [ ] Set up email notifications for subscription events