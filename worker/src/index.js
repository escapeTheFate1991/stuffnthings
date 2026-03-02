export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(request.url)

    if (url.pathname === '/health') {
      return Response.json({ ok: true }, { headers: corsHeaders })
    }

    if (url.pathname === '/contact' && request.method === 'POST') {
      return handleContact(request, env, corsHeaders)
    }

    return Response.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  },
}

async function handleContact(request, env, corsHeaders) {
  const { name, email, businessName, websiteUrl, phone, message } = await request.json()

  if (!name || !email || !businessName || !websiteUrl || !phone) {
    return Response.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders })
  }

  const escapeHtml = (str) =>
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  try {
    // Lead notification to us
    const notifyPayload = {
      from: 'Stuff N Things <info@stuffnthings.io>',
      to: [env.NOTIFY_EMAIL],
      subject: `New Friction Audit Request — ${businessName}`,
      html: `
        <h2>New Lead: ${escapeHtml(businessName)}</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Business</td><td style="padding:6px 12px;">${escapeHtml(businessName)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Website</td><td style="padding:6px 12px;"><a href="${escapeHtml(websiteUrl)}">${escapeHtml(websiteUrl)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>
          ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${escapeHtml(message)}</td></tr>` : ''}
        </table>`,
    }

    // Auto-reply to customer
    const firstName = name.split(' ')[0]
    const replyPayload = {
      from: 'Stuff N Things <info@stuffnthings.io>',
      to: [email],
      subject: `We got your request, ${firstName}!`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e;">
          <h2 style="color:#1a1a2e;">Hey ${escapeHtml(firstName)},</h2>
          <p>Thanks for requesting a Friction Audit for <strong>${escapeHtml(businessName)}</strong>.</p>
          <p>We'll review <strong>${escapeHtml(websiteUrl)}</strong> and get back to you within 24 hours with a full diagnostic — performance scores, web vitals, and a prioritized action plan.</p>
          <p>No strings attached. If the report speaks for itself, great. If not, no hard feelings.</p>
          <p style="margin-top:24px;">— The Stuff N Things Team<br/><a href="https://stuffnthings.io" style="color:#06b6d4;">stuffnthings.io</a></p>
        </div>`,
    }

    const resendHeaders = {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    }

    const [notifyRes, replyRes] = await Promise.all([
      fetch('https://api.resend.com/emails', { method: 'POST', headers: resendHeaders, body: JSON.stringify(notifyPayload) }),
      fetch('https://api.resend.com/emails', { method: 'POST', headers: resendHeaders, body: JSON.stringify(replyPayload) }),
    ])

    if (!notifyRes.ok) {
      const err = await notifyRes.text()
      console.error('Resend notify error:', err)
      throw new Error('Email delivery failed')
    }

    return Response.json({ success: true }, { headers: corsHeaders })
  } catch (err) {
    console.error('Contact error:', err)
    return Response.json(
      { error: 'Failed to send. Try emailing info@stuffnthings.io directly.' },
      { status: 500, headers: corsHeaders }
    )
  }
}
