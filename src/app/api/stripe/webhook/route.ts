import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { constructWebhookEvent, getStripeCustomer, getSubscription } from '@/lib/stripe'
import { getUserByClerkId, updateUserSubscription, createOrUpdateUser } from '@/lib/database'
import { getTierFromPriceId } from '@/lib/stripe'

// ============================================================================
// STRIPE WEBHOOK HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Get the webhook signature
    const headersList = headers()
    const signature = headersList.get('stripe-signature')
    
    if (!signature) {
      console.error('No Stripe signature found')
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Get the raw body
    const body = await request.text()
    
    // Verify the webhook signature and construct the event
    let event
    try {
      event = constructWebhookEvent(body, signature)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Log the event for debugging
    console.log(`Received Stripe webhook: ${event.type}`)

    // Handle the event based on type
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object)
        break

      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// ============================================================================
// WEBHOOK EVENT HANDLERS
// ============================================================================

async function handleSubscriptionCreated(subscription: any) {
  try {
    console.log('Processing subscription created:', subscription.id)

    const { tier, billingCycle } = getTierFromPriceId(subscription.items.data[0].price.id) || {}
    if (!tier) {
      console.error('Could not determine tier from price ID:', subscription.items.data[0].price.id)
      return
    }

    const userId = subscription.metadata?.userId
    if (userId) {
      // Update user subscription status
      await updateUserSubscription(
        parseInt(userId),
        tier,
        subscription.status,
        new Date(subscription.current_period_end * 1000).toISOString()
      )
      console.log(`Updated user ${userId} subscription to ${tier}`)
    } else {
      console.warn('No userId in subscription metadata')
    }

    // Additional setup tasks could go here
    // e.g., send welcome email, grant Discord access, etc.

  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  try {
    console.log('Processing subscription updated:', subscription.id)

    const { tier, billingCycle } = getTierFromPriceId(subscription.items.data[0].price.id) || {}
    if (!tier) {
      console.error('Could not determine tier from price ID:', subscription.items.data[0].price.id)
      return
    }

    const userId = subscription.metadata?.userId
    if (userId) {
      // Update user subscription status
      await updateUserSubscription(
        parseInt(userId),
        tier,
        subscription.status,
        subscription.cancel_at_period_end 
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null
      )
      
      console.log(`Updated user ${userId} subscription: ${tier} (${subscription.status})`)
    } else {
      console.warn('No userId in subscription metadata')
    }

  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  try {
    console.log('Processing subscription deleted:', subscription.id)

    const userId = subscription.metadata?.userId
    if (userId) {
      // Set subscription to canceled
      await updateUserSubscription(
        parseInt(userId),
        'free',
        'canceled',
        new Date().toISOString()
      )
      
      console.log(`Canceled subscription for user ${userId}`)
    } else {
      console.warn('No userId in subscription metadata')
    }

    // Additional cleanup tasks could go here
    // e.g., revoke Discord access, send cancellation email, etc.

  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}

async function handlePaymentSucceeded(invoice: any) {
  try {
    console.log('Processing payment succeeded:', invoice.id)

    if (invoice.subscription) {
      // Get the subscription details
      const subscription = await getSubscription(invoice.subscription)
      const { tier } = getTierFromPriceId(subscription.items.data[0].price.id) || {}
      
      if (tier) {
        const userId = subscription.metadata?.userId
        if (userId) {
          // Ensure subscription is active
          await updateUserSubscription(
            parseInt(userId),
            tier,
            'active',
            new Date(subscription.current_period_end * 1000).toISOString()
          )
          
          console.log(`Payment succeeded for user ${userId}, subscription active`)
        }
      }
    }

  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(invoice: any) {
  try {
    console.log('Processing payment failed:', invoice.id)

    if (invoice.subscription) {
      const subscription = await getSubscription(invoice.subscription)
      const userId = subscription.metadata?.userId
      
      if (userId) {
        // Update subscription status to past_due or unpaid
        await updateUserSubscription(
          parseInt(userId),
          subscription.metadata?.tier || 'free',
          'past_due',
          new Date(subscription.current_period_end * 1000).toISOString()
        )
        
        console.log(`Payment failed for user ${userId}, marked as past due`)
      }
    }

    // Additional actions could include:
    // - Send payment failure notification email
    // - Temporarily restrict access to premium content
    // - Set up retry logic

  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

async function handleCheckoutCompleted(session: any) {
  try {
    console.log('Processing checkout completed:', session.id)

    // Get subscription if it exists
    if (session.subscription) {
      const subscription = await getSubscription(session.subscription)
      const { tier } = getTierFromPriceId(subscription.items.data[0].price.id) || {}
      
      if (tier) {
        const userId = session.metadata?.userId
        if (userId) {
          // Activate subscription
          await updateUserSubscription(
            parseInt(userId),
            tier,
            'active',
            new Date(subscription.current_period_end * 1000).toISOString()
          )
          
          console.log(`Checkout completed for user ${userId}, activated ${tier} subscription`)
        }
      }
    }

    // Additional post-checkout actions:
    // - Send welcome email with onboarding information
    // - Create Discord invitation
    // - Track conversion analytics

  } catch (error) {
    console.error('Error handling checkout completed:', error)
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function findUserByCustomerId(customerId: string) {
  try {
    // In a real implementation, you'd have a mapping table or field
    // For now, we'll try to get customer metadata from Stripe
    const customer = await getStripeCustomer(customerId)
    
    if (customer && !customer.deleted && customer.metadata?.userId) {
      return { id: parseInt(customer.metadata.userId) }
    }
    
    return null
  } catch (error) {
    console.error('Error finding user by customer ID:', error)
    return null
  }
}

async function logWebhookEvent(eventType: string, eventId: string, processed: boolean, error?: string) {
  // Log webhook events for debugging and monitoring
  // In a production system, you might want to store these in a database
  const logEntry = {
    eventType,
    eventId,
    processed,
    timestamp: new Date().toISOString(),
    ...(error && { error })
  }
  
  console.log('Webhook Event:', JSON.stringify(logEntry, null, 2))
}

// ============================================================================
// DISCORD INTEGRATION HELPERS
// ============================================================================

async function grantDiscordAccess(userId: string, tier: string) {
  // Placeholder for Discord integration
  // This would typically:
  // 1. Generate a unique invite link
  // 2. Send it via email or store it for user to claim
  // 3. Set up role assignments based on tier
  
  console.log(`Discord access granted for user ${userId} with tier ${tier}`)
  
  // Example implementation:
  // const discordInvite = await createDiscordInvite(tier)
  // await sendDiscordInviteEmail(userEmail, discordInvite)
}

async function revokeDiscordAccess(userId: string) {
  // Placeholder for Discord integration
  // This would typically:
  // 1. Remove user from Discord server
  // 2. Revoke any pending invitations
  
  console.log(`Discord access revoked for user ${userId}`)
}

// ============================================================================
// EMAIL NOTIFICATION HELPERS
// ============================================================================

async function sendSubscriptionConfirmationEmail(userEmail: string, tier: string, billingCycle: string) {
  // Placeholder for email integration
  // This would use your email service (Resend, SendGrid, etc.) to send
  // a subscription confirmation with next steps
  
  console.log(`Subscription confirmation email sent to ${userEmail} for ${tier} ${billingCycle}`)
}

async function sendPaymentFailedEmail(userEmail: string) {
  // Placeholder for payment failure notifications
  console.log(`Payment failed email sent to ${userEmail}`)
}

export const config = {
  api: {
    bodyParser: false,
  },
}