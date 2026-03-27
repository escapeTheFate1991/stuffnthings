import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { syncClerkUserWithSupabase } from '@/lib/auth'

export async function POST(req: NextRequest) {
  // Get headers for verification
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create new Svix instance with secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: any

  // Attempt to verify webhook
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new NextResponse('Error occurred', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type
  console.log('Clerk webhook received:', eventType)

  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      await syncClerkUserWithSupabase(evt.data)
      console.log('User synced successfully:', evt.data.id)
    } catch (error) {
      console.error('Error syncing user:', error)
      return new NextResponse('Error syncing user', { status: 500 })
    }
  }

  return new NextResponse('OK', { status: 200 })
}