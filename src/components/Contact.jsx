import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const flip = (delay=0) => ({
  initial:{opacity:0,rotateX:60,y:40,scale:0.95},
  whileInView:{opacity:1,rotateX:0,y:0,scale:1},
  viewport:{once:true,margin:'-30px'},
  transition:{duration:0.75,delay,ease:[0.22,1,0.36,1]}
})

export default function Contact() {
  const nameRef  = useRef(null)
  const emailRef = useRef(null)
  const msgRef   = useRef(null)

  const [status, setStatus]  = useState('idle') // idle | sending | sent | error
  const [errors, setErrors]  = useState({})

  const handleSend = async () => {
    const name    = nameRef.current.value.trim()
    const email   = emailRef.current.value.trim()
    const message = msgRef.current.value.trim()

    // Front-end validation
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
      // Server not running or network error
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const ic = (f) =>
    `form-input${errors[f] ? ' !border-red-500/40 !shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''}`

  const btnLabel = {
    idle:    'Send Message',
    sending: 'Sending...',
    sent:    '✓ Message Sent!',
    error:   '✗ Failed — check server',
  }[status]

  const btnStyle = {
    sent:  { background: '#16a34a', boxShadow: '0 4px 18px rgba(22,163,74,.35)' },
    error: { background: '#dc2626', boxShadow: '0 4px 18px rgba(220,38,38,.35)' },
  }[status] || {}

  return (
    <section id="contact" className="relative z-10 py-[100px]" style={{ perspective: '1200px' }}>
      <div className="max-w-[680px] mx-auto px-6">

        <motion.span {...flip(0)} className="section-label block">Contact</motion.span>

        {/* Contact links */}
        <motion.div {...flip(0.1)} className="flex flex-col gap-2.5 mb-8">
          <a href="mailto:kuyag100621@gmail.com" className="contact-card">
            <span className="text-[1.4rem] shrink-0">✉️</span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase" style={{color:'#444'}}>Email</span>
              <span className="text-[0.92rem] font-medium" style={{color:'#bbb'}}>kuyag100621@gmail.com</span>
            </div>
            <span className="contact-arrow text-base" style={{color:'#444'}}>→</span>
          </a>
          <a href="https://github.com/Cocokylez" target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="text-[1.4rem] shrink-0">🐙</span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase" style={{color:'#444'}}>GitHub</span>
              <span className="text-[0.92rem] font-medium" style={{color:'#bbb'}}>github.com/Cocokylez</span>
            </div>
            <span className="contact-arrow text-base" style={{color:'#444'}}>→</span>
          </a>
        </motion.div>

        {/* Form */}
        <motion.div {...flip(0.2)} className="flex flex-col gap-3">
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
              cursor: status === 'sending' ? 'wait' : 'crosshair',
              ...btnStyle,
            }}
          >
            {btnLabel}
          </motion.button>


        </motion.div>

      </div>
    </section>
  )
}
