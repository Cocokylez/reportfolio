import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function Contact() {
  const nameRef    = useRef(null)
  const emailRef   = useRef(null)
  const messageRef = useRef(null)
  const [sent,     setSent]     = useState(false)
  const [errors,   setErrors]   = useState({})

  const handleSend = () => {
    const name    = nameRef.current.value.trim()
    const email   = emailRef.current.value.trim()
    const message = messageRef.current.value.trim()
    const newErrors = {}

    if (!name)    newErrors.name    = true
    if (!email)   newErrors.email   = true
    if (!message) newErrors.message = true

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      setTimeout(() => setErrors({}), 1800)
      return
    }

    setSent(true)
    nameRef.current.value    = ''
    emailRef.current.value   = ''
    messageRef.current.value = ''
    setTimeout(() => setSent(false), 3000)
  }

  const inputClass = (field) =>
    `form-input ${errors[field] ? '!border-red-400/50 !shadow-[0_0_0_3px_rgba(255,59,48,0.08)]' : ''}`

  return (
    <section id="contact" className="relative z-10 py-[100px]" style={{borderTop: "3px solid transparent", borderImage: "linear-gradient(90deg, transparent, #f43f5e, #fb7185, #f43f5e, transparent) 1"}}> 
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">
          Contact
        </motion.span>

        {/* Contact links */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-2.5 mb-8">
          <a href="mailto:kuyag100621@gmail.com" className="contact-card">
            <span className="text-[1.4rem] shrink-0">✉️</span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-[#8e8e93]">
                Email
              </span>
              <span className="text-[0.92rem] font-medium text-[#1c1c1e] dark:text-[#f5f5f7]">
                kuyag100621@gmail.com
              </span>
            </div>
            <span className="contact-arrow text-[#8e8e93] text-base">→</span>
          </a>

          <a
            href="https://github.com/Cocokylez"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="text-[1.4rem] shrink-0">🐙</span>
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-[#8e8e93]">
                GitHub
              </span>
              <span className="text-[0.92rem] font-medium text-[#1c1c1e] dark:text-[#f5f5f7]">
                github.com/Cocokylez
              </span>
            </div>
            <span className="contact-arrow text-[#8e8e93] text-base">→</span>
          </a>
        </motion.div>

        {/* Form */}
        <motion.div {...fadeUp(0.2)} className="flex flex-col gap-3">
          <input
            ref={nameRef}
            type="text"
            placeholder="Your Name"
            className={inputClass('name')}
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Your Email"
            className={inputClass('email')}
          />
          <textarea
            ref={messageRef}
            placeholder="Your Message"
            className={`${inputClass('message')} min-h-[120px]`}
          />

          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary w-full"
            style={sent ? { background: '#34c759', boxShadow: '0 4px 18px rgba(52,199,89,.35)' } : {}}
          >
            {sent ? '✓ Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
