import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        
        if (userId) {
          await updateUserSubscription(userId, 'active', session.subscription as string)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        if ('metadata' in customer && customer.metadata?.userId) {
          const status = subscription.status === 'active' ? 'active' : 'inactive'
          await updateUserSubscription(customer.metadata.userId, status, subscription.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        if ('metadata' in customer && customer.metadata?.userId) {
          await updateUserSubscription(customer.metadata.userId, 'canceled', subscription.id)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customer = await stripe.customers.retrieve(invoice.customer as string)
        
        if ('metadata' in customer && customer.metadata?.userId) {
          await updateUserSubscription(customer.metadata.userId, 'past_due', invoice.subscription as string)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function updateUserSubscription(userId: string, status: string, subscriptionId: string) {
  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: status,
      stripe_subscription_id: subscriptionId,
      subscription_expires_at: status === 'canceled' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq('clerk_user_id', userId)

  if (error) {
    console.error('Failed to update user subscription:', error)
    throw error
  }
}