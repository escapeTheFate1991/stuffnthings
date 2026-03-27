import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createPortalSession, findCustomerByEmail } from '@/lib/stripe'
import { getUserByClerkId } from '@/lib/database'

// ============================================================================
// STRIPE CUSTOMER PORTAL
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId: clerkUserId } = auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await getUserByClerkId(clerkUserId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please complete registration first.' },
        { status: 404 }
      )
    }

    // Find Stripe customer
    const customer = await findCustomerByEmail(user.email)
    if (!customer) {
      return NextResponse.json(
        { error: 'No billing account found. Please subscribe to a plan first.' },
        { status: 404 }
      )
    }

    // Set return URL
    const baseUrl = new URL(request.url).origin
    const returnUrl = `${baseUrl}/profile`

    // Create billing portal session
    const session = await createPortalSession(customer.id, returnUrl)

    return NextResponse.json({
      url: session.url
    })

  } catch (error) {
    console.error('Billing portal error:', error)
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}

// Get current subscription status
export async function GET(request: NextRequest) {
  try {
    const { userId: clerkUserId } = auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserByClerkId(clerkUserId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get current subscription from database
    const subscription = {
      tier: user.subscription_tier,
      status: user.subscription_status,
      expiresAt: user.subscription_expires_at
    }

    return NextResponse.json({ subscription })

  } catch (error) {
    console.error('Get subscription status error:', error)
    return NextResponse.json(
      { error: 'Failed to get subscription status' },
      { status: 500 }
    )
  }
}