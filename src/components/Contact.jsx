import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:24},
  whileInView:{opacity:1,y:0},
  viewport:{once:false,margin:'-30px'},
  transition:{duration:0.65,delay,ease:[0.4,0,0.2,1]}
})

export default function Contact() {
  const nameRef  = useRef(null)
  const emailRef = useRef(null)
  const msgRef   = useRef(null)

  const [status, setStatus]  = useState('idle')
  const [errors, setErrors]  = useState({})

  const handleSend = async () => {
    const name    = nameRef.current.value.trim()
    const email   = emailRef.current.value.trim()
    const message = msgRef.current.value.trim()

    const err = {}
    if (!name)    err.name  = true
    if (!email)   err.email = true
    if (!message) err.msg   = true
    if (Object.keys(err).length) {
      setErrors(err)
      setTimeout(() => setErrors({}), 1800)
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('sent')
        nameRef.current.value  = ''
        emailRef.current.value = ''
        msgRef.current.value   = ''
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const ic = (f) =>
    `form-input${errors[f] ? ' !border-red-500/40 !shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''}`

  const btnLabel = {
    idle:    'Send Message',
    sending: 'Sending...',
    sent:    'Message Sent',
    error:   'Failed - check server',
  }[status]

  const btnStyle = {
    sent:  { background: '#16a34a', boxShadow: '0 4px 18px rgba(22,163,74,.35)' },
    error: { background: '#dc2626', boxShadow: '0 4px 18px rgba(220,38,38,.35)' },
  }[status] || {}

  return (
    <section id="contact" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">

        <motion.span {...fadeUp(0)} className="section-label block">Contact</motion.span>

        {/* Contact links */}
        <motion.div {...fadeUp(0.1)}>
          <TiltCard className="glass-card" style={{ marginBottom: '20px' }}>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:kuyag100621@gmail.com" className="contact-card">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10"
                  aria-hidden="true"
                >
                  <svg className="h-[18px] w-[22px]" viewBox="0 0 24 18" focusable="false">
                    <path fill="#4285F4" d="M2 4.4v11.1c0 .83.67 1.5 1.5 1.5H6V7.8L2 4.4Z" />
                    <path fill="#34A853" d="M18 7.8V17h2.5c.83 0 1.5-.67 1.5-1.5V4.4l-4 3.4Z" />
                    <path fill="#EA4335" d="M20.5 1C21.33 1 22 1.67 22 2.5v1.9l-10 8-10-8V2.5C2 1.67 2.67 1 3.5 1L12 7.8 20.5 1Z" />
                    <path fill="#FBBC04" d="M2 4.4 6 7.8v3.4L2 8Z" />
                    <path fill="#C5221F" d="M22 4.4 18 7.8v3.4L22 8Z" />
                  </svg>
                </span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase" style={{color:'#444'}}>Email</span>
                  <span className="text-[0.92rem] font-medium" style={{color:'#bbb'}}>kuyag100621@gmail.com</span>
                </div>
                <span className="contact-arrow text-base" style={{color:'#444'}}>→</span>
              </a>
              <a href="https://github.com/Cocokylez" target="_blank" rel="noopener noreferrer" className="contact-card">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10"
                  style={{color:'#b8b8b8'}}
                  aria-hidden="true"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" focusable="false">
                    <path d="M12 .5C5.73.5.75 5.61.75 12c0 5.11 3.44 9.44 8.2 10.97.6.11.82-.27.82-.58v-2.23c-3.34.74-4.04-1.45-4.04-1.45-.55-1.44-1.35-1.82-1.35-1.82-1.11-.77.08-.76.08-.76 1.22.09 1.86 1.28 1.86 1.28 1.08 1.9 2.83 1.35 3.52 1.03.11-.8.42-1.35.76-1.66-2.67-.31-5.47-1.37-5.47-6.08 0-1.34.47-2.44 1.23-3.3-.12-.31-.53-1.56.12-3.25 0 0 1.01-.33 3.3 1.26a11.14 11.14 0 0 1 6 0c2.29-1.59 3.3-1.26 3.3-1.26.65 1.69.24 2.94.12 3.25.76.86 1.23 1.96 1.23 3.3 0 4.72-2.8 5.76-5.48 6.07.43.38.82 1.13.82 2.28v3.38c0 .32.22.7.83.58A11.5 11.5 0 0 0 23.25 12C23.25 5.61 18.27.5 12 .5Z" />
                  </svg>
                </span>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase" style={{color:'#444'}}>GitHub</span>
                  <span className="text-[0.92rem] font-medium" style={{color:'#bbb'}}>github.com/Cocokylez</span>
                </div>
                <span className="contact-arrow text-base" style={{color:'#444'}}>→</span>
              </a>
            </div>
          </TiltCard>
        </motion.div>

        {/* Form */}
        <motion.div {...fadeUp(0.2)}>
          <TiltCard className="glass-card">
            <div className="flex flex-col gap-3">
              <input
                ref={nameRef}
                type="text"
                placeholder="Your Name"
                className={ic('name')}
                disabled={status === 'sending'}
              />
              <input
                ref={emailRef}
                type="email"
                placeholder="Your Email"
                className={ic('email')}
                disabled={status === 'sending'}
              />
              <textarea
                ref={msgRef}
                placeholder="Your Message"
                className={`${ic('msg')} min-h-[120px]`}
                disabled={status === 'sending'}
              />
              <motion.button
                onClick={handleSend}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                disabled={status === 'sending'}
                className="btn-primary w-full"
                style={{
                  opacity: status === 'sending' ? 0.7 : 1,
                  cursor: status === 'sending' ? 'wait' : 'default',
                  ...btnStyle,
                }}
              >
                {btnLabel}
              </motion.button>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  )
}
