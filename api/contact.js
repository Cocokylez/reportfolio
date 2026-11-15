import { Resend } from 'resend'

const defaultContactEmail = 'kuyag100621@gmail.com'
const emailPattern = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function readField(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => htmlEntities[character])
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const name = readField(req.body?.name)
  const email = readField(req.body?.email)
  const message = readField(req.body?.message)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.error('Contact email is unavailable because RESEND_API_KEY is missing.')
    return res.status(503).json({ error: 'Contact email is temporarily unavailable.' })
  }

  const safeEmail = escapeHtml(email)

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL?.trim() || 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL?.trim() || defaultContactEmail],
      reply_to: email,
      subject: `Portfolio Message from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#111;color:#e0e0e0;border-radius:12px;">
          <h2 style="color:#3b9eff;">New Portfolio Message</h2>
          <hr style="border-color:#333;margin-bottom:20px"/>
          <p><strong style="color:#888">Name:</strong><br/>${escapeHtml(name)}</p>
          <p><strong style="color:#888">Email:</strong><br/>
            <a href="mailto:${safeEmail}" style="color:#3b9eff">${safeEmail}</a>
          </p>
          <p><strong style="color:#888">Message:</strong><br/>
            ${escapeHtml(message).replace(/\r?\n/g, '<br/>')}
          </p>
        </div>
      `,
    })

    if (error || !data?.id) {
      throw new Error(error?.message || 'Resend returned no message ID.')
    }

    console.info('Resend accepted a portfolio message:', data.id)
    return res.status(200).json({ success: true, id: data.id })
  } catch (error) {
    console.error('Portfolio contact email failed:', error?.message ?? 'Unknown error')
    return res.status(502).json({ error: 'The email service could not accept your message.' })
  }
}
