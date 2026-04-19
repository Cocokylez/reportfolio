import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to:   'kuyag100621@gmail.com',
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#0a0a0a;color:#e0e0e0;border-radius:12px;">
          <h2 style="color:#3b9eff;margin-bottom:4px;">New Portfolio Message</h2>
          <hr style="border-color:#222;margin-bottom:20px"/>
          <p><strong style="color:#888">Name:</strong><br/>${name}</p>
          <p><strong style="color:#888">Email:</strong><br/>
            <a href="mailto:${email}" style="color:#3b9eff">${email}</a>
          </p>
          <p><strong style="color:#888">Message:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
}
