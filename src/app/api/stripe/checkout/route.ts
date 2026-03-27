import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createCheckoutSession, findCustomerByEmail, createStripeCustomer, STRIPE_PRICE_IDS } from '@/lib/stripe'
import { getUserByClerkId } from '@/lib/database'
import { PRICING_TIERS, getPriceIdForTier, getTierByName } from '@/types/pricing'

// ============================================================================
// STRIPE CHECKOUT SESSION CREATION
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId: clerkUserId } = auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { tier, billingCycle, returnUrl } = body

    // Validate inputs
    if (!tier || !billingCycle) {
      return NextResponse.json(
        { error: 'Missing required fields: tier and billingCycle' },
        { status: 400 }
      )
    }

    if (!['monthly', 'annual'].includes(billingCycle)) {
      return NextResponse.json(
        { error: 'Invalid billing cycle. Must be monthly or annual' },
        { status: 400 }
      )
    }

    // Validate tier
    const tierConfig = getTierByName(tier)
    if (!tierConfig) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}` },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await getUserByClerkId(clerkUserId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please complete registration first.' },
        { status: 404 }
      )
    }

    // Get price ID from configuration
    const priceId = getPriceIdForTier(tier, billingCycle)
    if (!priceId || priceId.includes('placeholder')) {
      return NextResponse.json(
        { error: 'Pricing not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Set up URLs
    const baseUrl = new URL(request.url).origin
    const successUrl = returnUrl || `${baseUrl}/profile?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = returnUrl || `${baseUrl}/pricing`

    let customerId: string | undefined

    // Find or create Stripe customer
    try {
      const existingCustomer = await findCustomerByEmail(user.email)
      if (existingCustomer) {
        customerId = existingCustomer.id
      } else {
        const newCustomer = await createStripeCustomer(
          user.email,
          user.first_name && user.last_name 
            ? `${user.first_name} ${user.last_name}`
            : user.username || undefined,
          user.id.toString()
        )
        customerId = newCustomer.id
      }
    } catch (customerError) {
      console.error('Error handling customer:', customerError)
      // Continue without customer ID - Stripe will create one during checkout
    }

    // Create checkout session
    const session = await createCheckoutSession({
      priceId,
      customerId,
      customerEmail: !customerId ? user.email : undefined,
      tier,
      billingCycle,
      successUrl,
      cancelUrl,
      userId: user.id.toString()
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      tier,
      billingCycle,
      price: billingCycle === 'annual' ? tierConfig.annualPrice : tierConfig.monthlyPrice
    })

  } catch (error) {
    console.error('Checkout session creation error:', error)

    // Handle specific Stripe errors
    if (error && typeof error === 'object' && 'type' in error) {
      const stripeError = error as any
      switch (stripeError.type) {
        case 'StripeInvalidRequestError':
          return NextResponse.json(
            { error: 'Invalid request parameters' },
            { status: 400 }
          )
        case 'StripeAuthenticationError':
          return NextResponse.json(
            { error: 'Payment system configuration error' },
            { status: 500 }
          )
        default:
          return NextResponse.json(
            { error: 'Payment system error' },
            { status: 500 }
          )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// ============================================================================
// GET PRICING INFORMATION
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tier = searchParams.get('tier')
    const billingCycle = searchParams.get('billingCycle') as 'monthly' | 'annual'

    // Return all pricing tiers if no specific tier requested
    if (!tier) {
      return NextResponse.json({
        tiers: PRICING_TIERS.map(t => ({
          id: t.id,
          name: t.name,
          displayName: t.displayName,
          description: t.description,
          features: t.features,
          repositoryAccess: t.repositoryAccess,
          monthlyPrice: t.monthlyPrice,
          annualPrice: t.annualPrice,
          popular: t.popular,
          supportHours: t.supportHours,
          community: t.community
        })),
        priceIds: STRIPE_PRICE_IDS
      })
    }

    // Return specific tier information
    const tierConfig = getTierByName(tier)
    if (!tierConfig) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}` },
        { status: 400 }
      )
    }

    const price = billingCycle === 'annual' ? tierConfig.annualPrice : tierConfig.monthlyPrice
    const priceId = getPriceIdForTier(tier, billingCycle || 'monthly')

    return NextResponse.json({
      tier: tierConfig,
      price,
      priceId,
      billingCycle: billingCycle || 'monthly'
    })

  } catch (error) {
    console.error('Get pricing error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve pricing information' },
      { status: 500 }
    )
  }
}

// ============================================================================
// VALIDATE CHECKOUT SESSION
// ============================================================================

export async function PUT(request: NextRequest) {
  try {
    const { userId: clerkUserId } = auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    // Import stripe here to avoid issues with API route bundling
    const { stripe } = await import('@/lib/stripe')

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      sessionId: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email,
      subscriptionId: typeof session.subscription === 'string' 
        ? session.subscription 
        : session.subscription?.id,
      tier: session.metadata?.tier,
      billingCycle: session.metadata?.billingCycle
    })

  } catch (error) {
    console.error('Session validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate session' },
      { status: 500 }
    )
  }
}