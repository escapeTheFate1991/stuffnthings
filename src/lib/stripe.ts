import Stripe from 'stripe'

// ============================================================================
// STRIPE CONFIGURATION
// ============================================================================

// Initialize Stripe with API key from environment
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

// Client-side publishable key
export const getStripePublishableKey = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
  }
  return key
}

// ============================================================================
// PRICE MANAGEMENT
// ============================================================================

// Stripe Price IDs - Update these after creating products in Stripe Dashboard
export const STRIPE_PRICE_IDS = {
  tier1: {
    monthly: process.env.STRIPE_TIER1_MONTHLY_PRICE_ID || 'price_tier1_monthly_placeholder',
    annual: process.env.STRIPE_TIER1_ANNUAL_PRICE_ID || 'price_tier1_annual_placeholder'
  },
  tier2: {
    monthly: process.env.STRIPE_TIER2_MONTHLY_PRICE_ID || 'price_tier2_monthly_placeholder',
    annual: process.env.STRIPE_TIER2_ANNUAL_PRICE_ID || 'price_tier2_annual_placeholder'
  },
  tier3: {
    monthly: process.env.STRIPE_TIER3_MONTHLY_PRICE_ID || 'price_tier3_monthly_placeholder',
    annual: process.env.STRIPE_TIER3_ANNUAL_PRICE_ID || 'price_tier3_annual_placeholder'
  },
  premium: {
    monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || 'price_premium_monthly_placeholder',
    annual: process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID || 'price_premium_annual_placeholder'
  }
} as const

// ============================================================================
// CUSTOMER MANAGEMENT
// ============================================================================

export const createStripeCustomer = async (email: string, name?: string, userId?: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        ...(userId && { userId })
      }
    })
    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw new Error('Failed to create customer')
  }
}

export const getStripeCustomer = async (customerId: string) => {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return customer
  } catch (error) {
    console.error('Error retrieving Stripe customer:', error)
    throw new Error('Failed to retrieve customer')
  }
}

export const findCustomerByEmail = async (email: string) => {
  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1
    })
    return customers.data[0] || null
  } catch (error) {
    console.error('Error finding customer by email:', error)
    return null
  }
}

// ============================================================================
// CHECKOUT SESSION MANAGEMENT
// ============================================================================

export const createCheckoutSession = async ({
  priceId,
  customerId,
  customerEmail,
  tier,
  billingCycle,
  successUrl,
  cancelUrl,
  userId
}: {
  priceId: string
  customerId?: string
  customerEmail?: string
  tier: string
  billingCycle: 'monthly' | 'annual'
  successUrl: string
  cancelUrl: string
  userId?: string
}) => {
  try {
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        tier,
        billingCycle,
        ...(userId && { userId })
      },
      subscription_data: {
        metadata: {
          tier,
          billingCycle,
          ...(userId && { userId })
        }
      }
    }

    // Add customer information
    if (customerId) {
      sessionConfig.customer = customerId
    } else if (customerEmail) {
      sessionConfig.customer_email = customerEmail
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)
    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

export const getSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['customer', 'items.data.price']
    })
    return subscription
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    throw new Error('Failed to retrieve subscription')
  }
}

export const cancelSubscription = async (subscriptionId: string, cancelAtPeriodEnd = true) => {
  try {
    if (cancelAtPeriodEnd) {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      })
      return subscription
    } else {
      const subscription = await stripe.subscriptions.cancel(subscriptionId)
      return subscription
    }
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw new Error('Failed to cancel subscription')
  }
}

export const updateSubscription = async (subscriptionId: string, priceId: string) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId
        }
      ],
      proration_behavior: 'always_invoice'
    })
    
    return updatedSubscription
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw new Error('Failed to update subscription')
  }
}

export const getCustomerSubscriptions = async (customerId: string) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      expand: ['data.items.data.price']
    })
    return subscriptions.data
  } catch (error) {
    console.error('Error retrieving customer subscriptions:', error)
    return []
  }
}

// ============================================================================
// WEBHOOK UTILITIES
// ============================================================================

export const constructWebhookEvent = (body: string | Buffer, signature: string) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!endpointSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw new Error('Invalid webhook signature')
  }
}

// ============================================================================
// PRICE HELPERS
// ============================================================================

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const calculateAnnualSavings = (monthlyPrice: number, annualPrice: number): number => {
  const annualCostMonthly = monthlyPrice * 12
  const actualAnnualCost = annualPrice * 12
  return Math.round(((annualCostMonthly - actualAnnualCost) / annualCostMonthly) * 100)
}

// ============================================================================
// PORTAL MANAGEMENT
// ============================================================================

export const createPortalSession = async (customerId: string, returnUrl: string) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    })
    return session
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw new Error('Failed to create portal session')
  }
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export const validatePriceId = (priceId: string): boolean => {
  return Object.values(STRIPE_PRICE_IDS)
    .flatMap(tier => [tier.monthly, tier.annual])
    .includes(priceId)
}

export const getTierFromPriceId = (priceId: string): { tier: string; billingCycle: 'monthly' | 'annual' } | null => {
  for (const [tier, prices] of Object.entries(STRIPE_PRICE_IDS)) {
    if (prices.monthly === priceId) {
      return { tier, billingCycle: 'monthly' }
    }
    if (prices.annual === priceId) {
      return { tier, billingCycle: 'annual' }
    }
  }
  return null
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class StripeError extends Error {
  constructor(message: string, public stripeError?: Stripe.StripeError) {
    super(message)
    this.name = 'StripeError'
  }
}

export const handleStripeError = (error: any): StripeError => {
  if (error.type) {
    // This is a Stripe error
    switch (error.type) {
      case 'StripeCardError':
        return new StripeError('Your card was declined. Please try a different payment method.', error)
      case 'StripeInvalidRequestError':
        return new StripeError('Invalid request. Please check your information and try again.', error)
      case 'StripeAPIError':
        return new StripeError('An error occurred with our payment system. Please try again later.', error)
      case 'StripeConnectionError':
        return new StripeError('Network error. Please check your connection and try again.', error)
      case 'StripeAuthenticationError':
        return new StripeError('Authentication error. Please contact support.', error)
      default:
        return new StripeError('An unexpected error occurred. Please try again.', error)
    }
  }
  
  return new StripeError('An unexpected error occurred. Please try again.', error)
}