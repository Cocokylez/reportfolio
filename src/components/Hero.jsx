import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'Java', 'VS Code', 'Photoshop', 'PixelLab', 'Alight Motion']

function useTypewriter(text, speed = 36, delay = 1200) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0, tid
    const run = () => {
      tid = setInterval(() => {
        setOut(text.slice(0, ++i))
        if (i >= text.length) clearInterval(tid)
      }, speed)
    }
    const start = setTimeout(run, delay)
    return () => { clearTimeout(start); clearInterval(tid) }
  }, [])
  return out
}

function AboutBubble({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', zIndex: 50 }}
          >
            <div className="cin-bubble">
              <button onClick={onClose} className="cin-bubble-x">×</button>
              <p className="cin-bubble-h">About Me</p>
              <div className="cin-bubble-line" />
              <p className="cin-bubble-p">First-year IT student building a foundation in programming and web development — learning Java, HTML, CSS and JavaScript through real projects.</p>
              <p className="cin-bubble-p" style={{ marginTop: '8px' }}>Passionate about tech, aiming to become a computer engineer and entrepreneur.</p>
              <button className="cin-bubble-btn" onClick={() => {
                onClose()
                setTimeout(() => {
                  const el = document.getElementById('about')
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
                }, 260)
              }}>Read full About Me →</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const [hovered,    setHovered]    = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const typed = useTypewriter('Building skills in web development and programming, one project at a time.')
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 500], [0, -60])
  const textY  = useTransform(scrollY, [0, 500], [0, -25])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="cin-hero">
      <div className="cin-layout">
        <motion.div className="cin-left" style={{ y: textY }}>
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.1 }} className="cin-overline">
            <span className="cin-overline-dot" />Open to opportunities
          </motion.div>
          <div className="cin-name-block">
            <motion.span initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.18, ease:[0.22,1,0.36,1] }} className="cin-name-first">Adrian Kyle</motion.span>
            <motion.span initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.28, ease:[0.22,1,0.36,1] }} className="cin-name-last">Condeza</motion.span>
            <motion.div initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }} transition={{ duration:0.8, delay:0.52, ease:[0.4,0,0.2,1] }} className="cin-name-stroke" />
          </div>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.38 }} className="cin-role">
            1st Year IT Student · Aspiring Computer Engineer
          </motion.p>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4, delay:0.7 }} className="cin-bio">
            {typed}<span className="cin-caret" />
          </motion.p>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.48 }} className="cin-btns">
            <button className="btn-primary" onClick={() => scrollTo('#contact')}>Get in Touch</button>
            <button className="btn-ghost"   onClick={() => scrollTo('#about')}>Learn More</button>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:0.4 }} transition={{ duration:0.6, delay:1.6 }} className="cin-scroll-hint">
            <div className="cin-scroll-line" /><span>scroll</span>
          </motion.div>
        </motion.div>

        <motion.div className="cin-right" style={{ y: photoY }} initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.22, ease:[0.22,1,0.36,1] }}>
          <div className="cin-photo-box" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setBubbleOpen(v => !v)}>
            <img src="/pfp.png" alt="Adrian Kyle Condeza" className="cin-photo" style={{ transform: hovered ? 'scale(1.04) translateY(-5px)' : 'scale(1) translateY(0)' }} />
            <AnimatePresence>
              {hovered && !bubbleOpen && (
                <motion.div initial={{ opacity:0, y:6, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:4 }} transition={{ duration:0.15 }} className="cin-photo-badge">About Me</motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.65 }} className="cin-skills-wrap">
        <div className="cin-skills-inner">
          <span className="cin-skills-eyebrow">Stack</span>
          <div className="cin-skills-sep" />
          <div className="cin-skills-row">
            {SKILLS.map((s, i) => (
              <motion.span key={s} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.32, delay:0.72 + i * 0.065 }} className="cin-skill">{s}</motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <AboutBubble open={bubbleOpen} onClose={() => setBubbleOpen(false)} />

      <style>{`
        .cin-hero { position:relative; min-height:100vh; display:flex; flex-direction:column; overflow:hidden; background:transparent; }
        .cin-layout { flex:1; display:grid; grid-template-columns:1fr 440px; align-items:center; max-width:1100px; margin:0 auto; padding:0 48px; padding-top:80px; gap:32px; position:relative; z-index:2; width:100%; box-sizing:border-box; }
        .cin-left { display:flex; flex-direction:column; gap:0; }
        .cin-overline { display:inline-flex; align-items:center; gap:8px; font-size:0.73rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:rgba(59,158,255,0.85); margin-bottom:22px; }
        .cin-overline-dot { width:7px; height:7px; border-radius:50%; background:#30d158; box-shadow:0 0 7px rgba(48,209,88,0.9); animation:greenPulse 2s ease-in-out infinite; flex-shrink:0; }
        @keyframes greenPulse { 0%,100%{box-shadow:0 0 5px rgba(48,209,88,0.7)} 50%{box-shadow:0 0 14px rgba(48,209,88,1)} }
        .cin-name-block { display:flex; flex-direction:column; margin-bottom:18px; position:relative; }
        .cin-name-first { font-family:'DM Serif Display',serif; font-size:clamp(3rem,5.5vw,4.6rem); font-weight:400; line-height:1.0; letter-spacing:-0.03em; color:#f0f0f0; display:block; }
        .cin-name-last { font-family:'DM Serif Display',serif; font-size:clamp(3rem,5.5vw,4.6rem); font-weight:400; line-height:1.0; letter-spacing:-0.03em; display:block; background:linear-gradient(125deg,#60a5fa 0%,#a78bfa 40%,#38bdf8 80%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; background-size:220% auto; animation:nameGrad 7s ease infinite; }
        @keyframes nameGrad { 0%{background-position:0% center} 50%{background-position:100% center} 100%{background-position:0% center} }
        .cin-name-stroke { height:2px; width:100px; margin-top:12px; background:linear-gradient(90deg,#60a5fa,#a78bfa 60%,transparent); border-radius:999px; transform-origin:left; }
        .cin-role { font-size:0.88rem; font-weight:500; letter-spacing:0.02em; color:#555; margin-bottom:14px; }
        .cin-bio { font-size:0.98rem; font-weight:300; font-style:italic; line-height:1.72; color:#666; margin-bottom:32px; max-width:400px; min-height:3em; }
        .cin-caret { display:inline-block; width:2px; height:0.9em; background:rgba(96,165,250,0.85); margin-left:2px; vertical-align:text-bottom; border-radius:1px; animation:caretBlink 1s step-end infinite; }
        @keyframes caretBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cin-btns { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px; }
        .cin-scroll-hint { display:flex; align-items:center; gap:10px; font-size:0.65rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#444; }
        .cin-scroll-line { width:32px; height:1px; background:linear-gradient(90deg,#60a5fa,transparent); border-radius:1px; }
        .cin-right { position:relative; height:520px; display:flex; align-items:flex-end; justify-content:center; }
        .cin-photo-box { position:relative; z-index:3; width:300px; height:460px; cursor:crosshair; border-radius:8px; overflow:hidden; }
        .cin-photo { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .cin-photo-badge { position:absolute; top:12px; left:50%; transform:translateX(-50%); background:rgba(59,158,255,0.92); color:#fff; font-size:0.66rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:4px 14px; border-radius:999px; white-space:nowrap; pointer-events:none; box-shadow:0 2px 14px rgba(59,158,255,0.5); z-index:10; }
        .cin-skills-wrap { position:relative; z-index:2; border-top:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); }
        .cin-skills-inner { max-width:1100px; margin:0 auto; padding:14px 48px; display:flex; align-items:center; gap:18px; }
        .cin-skills-eyebrow { font-size:0.62rem; font-weight:800; letter-spacing:0.16em; text-transform:uppercase; color:#60a5fa; flex-shrink:0; white-space:nowrap; }
        .cin-skills-sep { width:1px; height:18px; background:rgba(255,255,255,0.1); flex-shrink:0; }
        .cin-skills-row { display:flex; flex-wrap:wrap; gap:7px; }
        .cin-skill { font-size:0.67rem; font-weight:600; letter-spacing:0.04em; color:#555; padding:3px 12px; border:1px solid rgba(255,255,255,0.07); border-radius:999px; background:rgba(255,255,255,0.03); white-space:nowrap; cursor:default; transition:color 0.2s,border-color 0.2s,background 0.2s,transform 0.2s; }
        .cin-skill:hover { color:#60a5fa; border-color:rgba(96,165,250,0.35); background:rgba(96,165,250,0.08); transform:translateY(-2px); }
        .cin-bubble { background:#111; border:1px solid rgba(59,158,255,0.18); border-radius:18px; padding:20px 22px; box-shadow:0 24px 70px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.04); }
        .cin-bubble-x { position:absolute; top:12px; right:14px; color:#444; font-size:1.1rem; line-height:1; background:none; border:none; cursor:crosshair; transition:color 0.15s; }
        .cin-bubble-x:hover { color:#e8e8e8; }
        .cin-bubble-h { font-family:'DM Serif Display',serif; font-size:1rem; color:#e8e8e8; margin-bottom:10px; }
        .cin-bubble-line { height:1px; margin-bottom:12px; background:linear-gradient(90deg,rgba(96,165,250,0.4),rgba(167,139,250,0.3),transparent); }
        .cin-bubble-p { font-size:0.81rem; color:#666; line-height:1.68; font-weight:300; }
        .cin-bubble-btn { display:inline-block; margin-top:14px; font-size:0.74rem; font-weight:700; color:#60a5fa; background:none; border:none; cursor:crosshair; padding:0; transition:opacity 0.15s; }
        .cin-bubble-btn:hover { opacity:0.7; }
        @media (max-width:860px) {
          .cin-layout { grid-template-columns:1fr; padding:20px 24px 0; padding-top:60px; gap:0; }
          .cin-right { order:-1; height:380px; margin-bottom:8px; }
          .cin-photo-box { width:240px; height:360px; }
          .cin-left { align-items:center; text-align:center; }
          .cin-overline { justify-content:center; }
          .cin-name-stroke { margin:10px auto 0; }
          .cin-btns { justify-content:center; }
          .cin-bio { text-align:center; }
          .cin-scroll-hint { display:none; }
          .cin-skills-inner { padding:12px 24px; }
        }
      `}</style>
    </section>
  )
}
