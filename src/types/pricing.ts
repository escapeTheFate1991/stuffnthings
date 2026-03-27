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

// Pricing Configuration - stuffnthings LMS 4-Tier Structure (AI-centric)
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'spark',
    name: 'spark',
    displayName: 'Spark',
    description: 'Launch your automation journey with AI fundamentals',
    features: [
      'Access to foundational AI automation courses',
      'Community Discord access',
      'Email support',
      'Starter templates library'
    ],
    repositoryAccess: ['ai-fundamentals'],
    monthlyPrice: 99,
    annualPrice: 70, // 29% discount
    priceId: {
      monthly: process.env.STRIPE_SPARK_MONTHLY_PRICE_ID || 'price_spark_monthly_placeholder',
      annual: process.env.STRIPE_SPARK_ANNUAL_PRICE_ID || 'price_spark_annual_placeholder'
    },
    community: true,
    priority: 'standard'
  },
  {
    id: 'synapse',
    name: 'synapse',
    displayName: 'Synapse',
    description: 'Connect the dots with advanced AI workflows',
    features: [
      'All Spark features',
      'Advanced AI workflow courses',
      'Priority support',
      'Pro templates & integrations',
      'Monthly office hours'
    ],
    repositoryAccess: ['ai-fundamentals', 'advanced-workflows'],
    monthlyPrice: 299,
    annualPrice: 212, // 29% discount
    priceId: {
      monthly: process.env.STRIPE_SYNAPSE_MONTHLY_PRICE_ID || 'price_synapse_monthly_placeholder',
      annual: process.env.STRIPE_SYNAPSE_ANNUAL_PRICE_ID || 'price_synapse_annual_placeholder'
    },
    popular: true,
    community: true,
    priority: 'priority'
  },
  {
    id: 'cortex',
    name: 'cortex',
    displayName: 'Cortex',
    description: 'Master enterprise-grade AI automation',
    features: [
      'All Synapse features',
      'Enterprise AI masterclasses',
      'Custom workflow consultation',
      'Advanced business integrations',
      'Priority support'
    ],
    repositoryAccess: ['ai-fundamentals', 'advanced-workflows', 'business-automation'],
    monthlyPrice: 499,
    annualPrice: 354, // 29% discount
    priceId: {
      monthly: process.env.STRIPE_CORTEX_MONTHLY_PRICE_ID || 'price_cortex_monthly_placeholder',
      annual: process.env.STRIPE_CORTEX_ANNUAL_PRICE_ID || 'price_cortex_annual_placeholder'
    },
    community: true,
    priority: 'priority'
  },
  {
    id: 'singularity',
    name: 'singularity',
    displayName: 'Singularity',
    description: 'Full-spectrum AI transformation for your business',
    features: [
      'All Cortex features',
      'White-glove AI setup & consulting',
      'Custom enterprise integrations',
      'Dedicated account manager',
      'Priority phone support'
    ],
    repositoryAccess: ['ai-fundamentals', 'advanced-workflows', 'business-automation', 'enterprise-integrations'],
    monthlyPrice: 799,
    annualPrice: 567, // 29% discount
    priceId: {
      monthly: process.env.STRIPE_SINGULARITY_MONTHLY_PRICE_ID || 'price_singularity_monthly_placeholder',
      annual: process.env.STRIPE_SINGULARITY_ANNUAL_PRICE_ID || 'price_singularity_annual_placeholder'
    },
    supportHours: 8,
    community: true,
    priority: 'urgent'
  }
]

export const REPOSITORY_ACCESS: RepositoryAccess[] = [
  {
    tierName: 'spark',
    repositories: ['ai-fundamentals'],
    description: 'Basic AI automation workflows, email sequences, and simple integrations'
  },
  {
    tierName: 'synapse',
    repositories: ['ai-fundamentals', 'advanced-workflows'],
    description: 'Includes advanced AI automation, multi-step workflows, and team coordination'
  },
  {
    tierName: 'cortex',
    repositories: ['ai-fundamentals', 'advanced-workflows', 'business-automation'],
    description: 'Adds enterprise AI patterns, security, and advanced business process automation'
  },
  {
    tierName: 'singularity',
    repositories: ['ai-fundamentals', 'advanced-workflows', 'business-automation', 'enterprise-integrations'],
    description: 'Complete access including custom enterprise AI integrations and consulting'
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