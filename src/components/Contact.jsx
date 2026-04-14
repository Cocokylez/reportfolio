import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
const fadeUp = (delay=0) => ({ initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:'-30px'}, transition:{duration:0.65,delay,ease:[0.4,0,0.2,1]} })
export default function Contact() {
  const nameRef=useRef(null), emailRef=useRef(null), msgRef=useRef(null)
  const [sent,setSent]=useState(false), [errors,setErrors]=useState({})
  const handleSend = () => {
    const n=nameRef.current.value.trim(), e=emailRef.current.value.trim(), m=msgRef.current.value.trim()
    const err={}
    if(!n) err.name=true; if(!e) err.email=true; if(!m) err.msg=true
    if(Object.keys(err).length){ setErrors(err); setTimeout(()=>setErrors({}),1800); return }
    setSent(true)
    nameRef.current.value=''; emailRef.current.value=''; msgRef.current.value=''
    setTimeout(()=>setSent(false),3000)
  }
  const ic = (f) => `form-input${errors[f]?' !border-red-500/40 !shadow-[0_0_0_3px_rgba(239,68,68,0.08)]':''}`
  return (
    <section id="contact" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">Contact</motion.span>
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-2.5 mb-8">
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
        <motion.div {...fadeUp(0.2)} className="flex flex-col gap-3">
          <input ref={nameRef} type="text" placeholder="Your Name" className={ic('name')} />
          <input ref={emailRef} type="email" placeholder="Your Email" className={ic('email')} />
          <textarea ref={msgRef} placeholder="Your Message" className={`${ic('msg')} min-h-[120px]`} />
          <motion.button onClick={handleSend} whileHover={{scale:1.02}} whileTap={{scale:0.97}}
            className="btn-primary w-full"
            style={sent?{background:'#16a34a',boxShadow:'0 4px 18px rgba(22,163,74,.35)'}:{}}>
            {sent ? '✓ Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
