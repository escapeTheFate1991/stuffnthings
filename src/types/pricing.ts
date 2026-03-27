// ============================================================================
// PRICING TYPES & STRUCTURES
// ============================================================================

export interface PricingTier {
  id: string
  name: string
  displayName: string
  description: string
  features: string[]
  repositoryAccess: string[]
  monthlyPrice: number
  annualPrice: number
  priceId: {
    monthly: string
    annual: string
  }
  popular?: boolean
  comingSoon?: boolean
  supportHours?: number
  community?: boolean
  priority?: 'standard' | 'priority' | 'urgent'
}

export interface PricingPlan {
  tier: string
  billingCycle: 'monthly' | 'annual'
  price: number
  priceId: string
}

export interface RepositoryAccess {
  tierName: string
  repositories: string[]
  description: string
}

// Pricing Configuration
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier1',
    name: 'tier1',
    displayName: 'Beginner',
    description: 'Perfect for GitHub beginners',
    features: [
      'Beginner-level courses',
      'Community Discord access',
      'Basic GitHub fundamentals',
      'Email support'
    ],
    repositoryAccess: ['github-fundamentals'],
    monthlyPrice: 99,
    annualPrice: 70, // 29% discount
    priceId: {
      monthly: 'price_tier1_monthly',
      annual: 'price_tier1_annual'
    },
    community: true,
    priority: 'standard'
  },
  {
    id: 'tier2',
    name: 'tier2',
    displayName: 'Intermediate',
    description: 'For developers ready to level up',
    features: [
      'All Beginner courses',
      'Intermediate courses',
      'Advanced GitHub workflows',
      'Priority Discord support',
      'Project templates'
    ],
    repositoryAccess: ['github-fundamentals', 'advanced-workflows'],
    monthlyPrice: 149,
    annualPrice: 106, // 29% discount
    priceId: {
      monthly: 'price_tier2_monthly',
      annual: 'price_tier2_annual'
    },
    popular: true,
    community: true,
    priority: 'priority'
  },
  {
    id: 'tier3',
    name: 'tier3',
    displayName: 'Professional',
    description: 'Complete GitHub mastery',
    features: [
      'All Beginner + Intermediate',
      'Professional courses',
      'Business automation workflows',
      'Advanced CI/CD patterns',
      'Code review best practices',
      'Priority support'
    ],
    repositoryAccess: ['github-fundamentals', 'advanced-workflows', 'business-automation'],
    monthlyPrice: 249,
    annualPrice: 177, // 29% discount
    priceId: {
      monthly: 'price_tier3_monthly',
      annual: 'price_tier3_annual'
    },
    community: true,
    priority: 'priority'
  },
  {
    id: 'premium',
    name: 'premium',
    displayName: 'Premium',
    description: 'Everything + business tools',
    features: [
      'All course content',
      'Business tool integration library',
      '3 hours monthly video support',
      'Custom workflow consultation',
      'White-glove repository setup',
      'Urgent support priority'
    ],
    repositoryAccess: ['github-fundamentals', 'advanced-workflows', 'business-automation', 'integration-code-library'],
    monthlyPrice: 799,
    annualPrice: 567, // 29% discount
    priceId: {
      monthly: 'price_premium_monthly',
      annual: 'price_premium_annual'
    },
    supportHours: 3,
    community: true,
    priority: 'urgent'
  }
]

export const REPOSITORY_ACCESS: RepositoryAccess[] = [
  {
    tierName: 'tier1',
    repositories: ['github-fundamentals'],
    description: 'Basic GitHub operations, commits, branches, and pull requests'
  },
  {
    tierName: 'tier2',
    repositories: ['github-fundamentals', 'advanced-workflows'],
    description: 'Includes advanced automation, GitHub Actions, and team workflows'
  },
  {
    tierName: 'tier3',
    repositories: ['github-fundamentals', 'advanced-workflows', 'business-automation'],
    description: 'Adds enterprise patterns, security, and business process automation'
  },
  {
    tierName: 'premium',
    repositories: ['github-fundamentals', 'advanced-workflows', 'business-automation', 'integration-code-library'],
    description: 'Complete access including custom business tool integrations'
  }
]

// Annual discount calculation
export const ANNUAL_DISCOUNT_PERCENTAGE = 29

export const calculateAnnualPrice = (monthlyPrice: number): number => {
  const annualBeforeDiscount = monthlyPrice * 12
  const discount = annualBeforeDiscount * (ANNUAL_DISCOUNT_PERCENTAGE / 100)
  return Math.round((annualBeforeDiscount - discount) / 12)
}

// Helper functions
export const getTierByName = (tierName: string): PricingTier | undefined => {
  return PRICING_TIERS.find(tier => tier.name === tierName)
}

export const getPriceForTier = (tierName: string, billingCycle: 'monthly' | 'annual'): number => {
  const tier = getTierByName(tierName)
  if (!tier) return 0
  return billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice
}

export const getPriceIdForTier = (tierName: string, billingCycle: 'monthly' | 'annual'): string => {
  const tier = getTierByName(tierName)
  if (!tier) return ''
  return billingCycle === 'annual' ? tier.priceId.annual : tier.priceId.monthly
}

export const getRepositoriesForTier = (tierName: string): string[] => {
  const access = REPOSITORY_ACCESS.find(access => access.tierName === tierName)
  return access?.repositories || []
}

// Subscription types
export interface Subscription {
  id: string
  userId: string
  tier: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  billingCycle: 'monthly' | 'annual'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeCustomerId: string
  stripeSubscriptionId: string
}

export interface CheckoutSession {
  id: string
  url: string
  tier: string
  billingCycle: 'monthly' | 'annual'
  priceId: string
  customerId?: string
}

// Webhook event types
export type StripeWebhookEvent = 
  | 'customer.subscription.created'
  | 'customer.subscription.updated' 
  | 'customer.subscription.deleted'
  | 'invoice.payment_succeeded'
  | 'invoice.payment_failed'

export interface WebhookData {
  type: StripeWebhookEvent
  data: {
    object: any
  }
}