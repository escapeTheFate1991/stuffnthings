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

    if (url.pathname === '/download' && request.method === 'POST') {
      return handleDownload(request, env, corsHeaders)
    }

    return Response.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  },
}

// ── Email validation ──
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function validateEmail(email) {
  return EMAIL_REGEX.test(email)
}

// ── Get client IP (Cloudflare headers) ──
function getClientIP(request) {
  return request.headers.get('CF-Connecting-IP') ||
         request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
         'unknown'
}

const escapeHtml = (str) =>
  String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ── Contact form handler ──
async function handleContact(request, env, corsHeaders) {
  const { name, email, businessName, websiteUrl, phone, message } = await request.json()

  if (!name || !email || !businessName || !websiteUrl || !phone) {
    return Response.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders })
  }

  if (!validateEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400, headers: corsHeaders })
  }

  try {
    const notifyPayload = {
      from: 'Stuff N Things <noreply@stuffnthings.io>',
      to: [env.NOTIFY_EMAIL],
      subject: `New Site Audit Request — ${businessName}`,
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

    const firstName = name.split(' ')[0]
    const replyPayload = {
      from: 'Stuff N Things <noreply@stuffnthings.io>',
      to: [email],
      subject: `We got your request, ${firstName}!`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e;">
          <h2 style="color:#1a1a2e;">Hey ${escapeHtml(firstName)},</h2>
          <p>Thanks for requesting a Site Audit for <strong>${escapeHtml(businessName)}</strong>.</p>
          <p>We'll review <strong>${escapeHtml(websiteUrl)}</strong> and get back to you within 48 hours with a full diagnostic — performance, AI automation opportunities, and a prioritized action plan.</p>
          <p>No strings attached. If the report speaks for itself, great. If not, no hard feelings.</p>
          <p style="margin-top:24px;">— The Stuff N Things Team<br/><a href="https://stuffnthings.io" style="color:#06b6d4;">stuffnthings.io</a></p>
        </div>`,
    }

    const resendHeaders = {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    }

    const [notifyRes] = await Promise.all([
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

// ── Download form handler (PDF email + IP rate limit) ──
async function handleDownload(request, env, corsHeaders) {
  const { name, email, businessName, phone, report } = await request.json()

  if (!name || !email || !businessName) {
    return Response.json({ error: 'Please fill in all required fields.' }, { status: 400, headers: corsHeaders })
  }

  if (!validateEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400, headers: corsHeaders })
  }

  // ── IP rate limiting (1 download per IP per 24h) ──
  const clientIP = getClientIP(request)
  const rateLimitKey = `download:${clientIP}`

  if (env.DOWNLOAD_KV) {
    const existing = await env.DOWNLOAD_KV.get(rateLimitKey)
    if (existing) {
      return Response.json(
        { error: 'This report has already been sent to this network. Check your inbox, or email info@stuffnthings.io if you need another copy.' },
        { status: 429, headers: corsHeaders }
      )
    }
  }

  const firstName = name.split(' ')[0]
  const reportUrl = 'https://stuffnthings.io/ai-workforce-report-2026.pdf'

  try {
    const resendHeaders = {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    }

    // Email the PDF to the user
    const deliverPayload = {
      from: 'Stuff N Things <noreply@stuffnthings.io>',
      to: [email],
      subject: `Your report is ready, ${firstName} — AI Workforce Report 2026`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e;">
          <h2 style="color:#1a1a2e;">Hey ${escapeHtml(firstName)},</h2>
          <p>Here's the AI Workforce Report 2026 you requested. It covers the latest data on how AI is reshaping the workforce — and what businesses like ${escapeHtml(businessName)} can do to stay ahead.</p>
          <p style="margin:24px 0;">
            <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(90deg,#06b6d4,#8B5CF6);color:#fff;font-weight:600;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:15px;">Download Your Report →</a>
          </p>
          <p style="font-size:13px;color:#666;">The report covers:</p>
          <ul style="font-size:13px;color:#666;padding-left:20px;">
            <li>25+ companies restructuring around AI — with specific numbers</li>
            <li>BLS projections on which roles are shifting through 2034</li>
            <li>8 industry verticals mapped to AI automation opportunities</li>
            <li>Real salary data and monthly savings estimates</li>
          </ul>
          <p style="margin-top:24px;font-size:13px;">If you'd like to see what AI can do for ${escapeHtml(businessName)} specifically, we offer a free AI Site Audit — <a href="https://stuffnthings.io/#contact" style="color:#06b6d4;">request one here</a>.</p>
          <p style="margin-top:24px;">— The Stuff N Things Team<br/><a href="https://stuffnthings.io" style="color:#06b6d4;">stuffnthings.io</a></p>
        </div>`,
    }

    // Notify us of the download lead
    const notifyPayload = {
      from: 'Stuff N Things <noreply@stuffnthings.io>',
      to: [env.NOTIFY_EMAIL],
      subject: `Report Download — ${businessName}`,
      html: `
        <h2>Report Download: ${escapeHtml(businessName)}</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Business</td><td style="padding:6px 12px;">${escapeHtml(businessName)}</td></tr>
          ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>` : ''}
          <tr><td style="padding:6px 12px;font-weight:bold;">Report</td><td style="padding:6px 12px;">${escapeHtml(report || 'ai-workforce-report-2026')}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">IP</td><td style="padding:6px 12px;">${escapeHtml(clientIP)}</td></tr>
        </table>`,
    }

    const [deliverRes] = await Promise.all([
      fetch('https://api.resend.com/emails', { method: 'POST', headers: resendHeaders, body: JSON.stringify(deliverPayload) }),
      fetch('https://api.resend.com/emails', { method: 'POST', headers: resendHeaders, body: JSON.stringify(notifyPayload) }),
    ])

    if (!deliverRes.ok) {
      const err = await deliverRes.text()
      console.error('Resend deliver error:', err)
      throw new Error('Email delivery failed')
    }

    // Store IP in KV with 24h TTL to prevent repeat downloads
    if (env.DOWNLOAD_KV) {
      await env.DOWNLOAD_KV.put(rateLimitKey, JSON.stringify({
        email, name, businessName, timestamp: new Date().toISOString()
      }), { expirationTtl: 86400 }) // 24 hours
    }

    return Response.json({ success: true }, { headers: corsHeaders })
  } catch (err) {
    console.error('Download error:', err)
    return Response.json(
      { error: 'Failed to send the report. Try emailing info@stuffnthings.io and we\'ll send it manually.' },
      { status: 500, headers: corsHeaders }
    )
  }
}

