require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Resend } = require('resend')

const PORT = process.env.PORT || 3100
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'info@stuffnthings.io'

if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY environment variable is required')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)
const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/contact', async (req, res) => {
  const { name, email, businessName, websiteUrl, phone, message } = req.body

  if (!name || !email || !businessName || !websiteUrl || !phone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Send lead notification to us
    await resend.emails.send({
      from: 'Stuff N Things <info@stuffnthings.io>',
      to: [NOTIFY_EMAIL],
      subject: `New Friction Audit Request — ${businessName}`,
      html: `
        <h2>New Lead: ${businessName}</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Business</td><td style="padding:6px 12px;">${escapeHtml(businessName)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Website</td><td style="padding:6px 12px;"><a href="${escapeHtml(websiteUrl)}">${escapeHtml(websiteUrl)}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>
          ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${escapeHtml(message)}</td></tr>` : ''}
        </table>
      `,
    })

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'Stuff N Things <info@stuffnthings.io>',
      to: [email],
      subject: `We got your request, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e;">
          <h2 style="color:#1a1a2e;">Hey ${escapeHtml(name.split(' ')[0])},</h2>
          <p>Thanks for requesting a Friction Audit for <strong>${escapeHtml(businessName)}</strong>.</p>
          <p>We'll review <strong>${escapeHtml(websiteUrl)}</strong> and get back to you within 24 hours with a full diagnostic — performance scores, web vitals, and a prioritized action plan.</p>
          <p>No strings attached. If the report speaks for itself, great. If not, no hard feelings.</p>
          <p style="margin-top:24px;">— The Stuff N Things Team<br/><a href="https://stuffnthings.io" style="color:#06b6d4;">stuffnthings.io</a></p>
        </div>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ error: 'Failed to send. Try emailing info@stuffnthings.io directly.' })
  }
})

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

app.listen(PORT, () => console.log(`Contact API listening on :${PORT}`))
