import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'Java', 'VS Code', 'Photoshop', 'PixelLab', 'Alight Motion']

/* ── Typewriter ── */
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

/* ── Particle canvas (very light, ~30 dots) ── */
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const W = canvas.width  = window.innerWidth
    const H = canvas.height = window.innerHeight
    const pts = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.5 + 0.15,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59,158,255,${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', opacity:0.55 }} />
}

/* ── About bubble ── */
function AboutBubble({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={onClose}
            style={{ position:'fixed', inset:0, zIndex:40, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity:0, scale:0.88, y:16 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.88 }}
            transition={{ type:'spring', stiffness:380, damping:28 }}
            style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'300px', zIndex:50 }}
          >
            <div className="cin-bubble">
              <button onClick={onClose} className="cin-bubble-x">×</button>
              <p className="cin-bubble-h">About Me</p>
              <div className="cin-bubble-line" />
              <p className="cin-bubble-p">First-year IT student building a foundation in programming and web development — learning Java, HTML, CSS and JavaScript through real projects.</p>
              <p className="cin-bubble-p" style={{marginTop:'8px'}}>Passionate about tech, aiming to become a computer engineer and entrepreneur.</p>
              <button className="cin-bubble-btn" onClick={() => { onClose(); setTimeout(() => { const el = document.getElementById('about'); if(el) window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'}) }, 260) }}>Read full About Me →</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const [hovered,    setHovered]    = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const sectionRef = useRef(null)
  const typed = useTypewriter('Building skills in web development and programming, one project at a time.')

  /* Parallax — photo drifts up slightly on scroll */
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 500], [0, -60])
  const textY  = useTransform(scrollY, [0, 500], [0, -25])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="hero" className="cin-hero">

      {/* ── Particles ── */}
      <Particles />

      {/* ── Grid overlay ── */}
      <div className="cin-grid" aria-hidden />

      {/* ── Gradient spotlight behind photo ── */}
      <div className="cin-spotlight" aria-hidden />

      {/* ═══════════ MAIN LAYOUT ═══════════ */}
      <div className="cin-layout">

        {/* ── LEFT: All text ── */}
        <motion.div className="cin-left" style={{ y: textY }}>

          {/* Overline */}
          <motion.div
            initial={{ opacity:0, x:-20 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, delay:0.1 }}
            className="cin-overline"
          >
            <span className="cin-overline-dot" />
            Open to opportunities
          </motion.div>

          {/* Name block */}
          <div className="cin-name-block">
            <motion.span
              initial={{ opacity:0, y:32 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.18, ease:[0.22,1,0.36,1] }}
              className="cin-name-first"
            >
              Adrian Kyle
            </motion.span>
            <motion.span
              initial={{ opacity:0, y:32 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.28, ease:[0.22,1,0.36,1] }}
              className="cin-name-last"
            >
              Condeza
            </motion.span>
            {/* Animated underline stroke */}
            <motion.div
              initial={{ scaleX:0, opacity:0 }}
              animate={{ scaleX:1, opacity:1 }}
              transition={{ duration:0.8, delay:0.52, ease:[0.4,0,0.2,1] }}
              className="cin-name-stroke"
            />
          </div>

          {/* Role */}
          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.5, delay:0.38 }}
            className="cin-role"
          >
            1st Year IT Student · Aspiring Computer Engineer
          </motion.p>

          {/* Typewriter bio */}
          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.4, delay:0.7 }}
            className="cin-bio"
          >
            {typed}<span className="cin-caret" />
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.48 }}
            className="cin-btns"
          >
            <button className="btn-primary" onClick={() => scrollTo('#contact')}>Get in Touch</button>
            <button className="btn-ghost"   onClick={() => scrollTo('#about')}>Learn More</button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:0.4 }}
            transition={{ duration:0.6, delay:1.6 }}
            className="cin-scroll-hint"
          >
            <div className="cin-scroll-line" />
            <span>scroll</span>
          </motion.div>

        </motion.div>

        {/* ── RIGHT: Photo ── */}
        <motion.div
          className="cin-right"
          style={{ y: photoY }}
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8, delay:0.22, ease:[0.22,1,0.36,1] }}
        >
          {/* Decorative ring behind photo */}
          <div className="cin-ring cin-ring-a" aria-hidden />
          <div className="cin-ring cin-ring-b" aria-hidden />

          {/* Corner brackets */}
          {['tl','tr','bl','br'].map(p => (
            <div key={p} className={`cin-corner cin-corner-${p}`} aria-hidden />
          ))}

          {/* Photo */}
          <div
            className="cin-photo-box"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setBubbleOpen(v => !v)}
          >
            <img
              src="/pfp.png"
              alt="Adrian Kyle Condeza"
              className="cin-photo"
              style={{ transform: hovered ? 'scale(1.04) translateY(-5px)' : 'scale(1) translateY(0)' }}
            />

            {/* Hover badge */}
            <AnimatePresence>
              {hovered && !bubbleOpen && (
                <motion.div
                  initial={{ opacity:0, y:6, scale:0.9 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, y:4 }}
                  transition={{ duration:0.15 }}
                  className="cin-photo-badge"
                >About Me</motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating index label */}
          <div className="cin-index-label" aria-hidden>01 / HERO</div>
        </motion.div>

      </div>

      {/* ═══════════ SKILLS BAR ═══════════ */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6, delay:0.65 }}
        className="cin-skills-wrap"
      >
        <div className="cin-skills-inner">
          <span className="cin-skills-eyebrow">Stack</span>
          <div className="cin-skills-sep" />
          <div className="cin-skills-row">
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.32, delay:0.72 + i * 0.065 }}
                className="cin-skill"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <AboutBubble open={bubbleOpen} onClose={() => setBubbleOpen(false)} />

      {/* ═══════════ STYLES ═══════════ */}
      <style>{`

        /* ── Section shell ── */
        .cin-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: transparent;
        }

        /* ── Backgrounds ── */
        .cin-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(59,158,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,158,255,0.045) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 75% 90% at 72% 48%, black 0%, transparent 68%);
          -webkit-mask-image: radial-gradient(ellipse 75% 90% at 72% 48%, black 0%, transparent 68%);
        }
        .cin-spotlight {
          position: absolute;
          width: 680px; height: 680px;
          top: -60px; right: -60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,158,255,0.09) 0%, rgba(120,40,200,0.07) 45%, transparent 72%);
          filter: blur(50px);
          pointer-events: none; z-index: 0;
          animation: spotBreath 5s ease-in-out infinite;
        }
        @keyframes spotBreath {
          0%,100% { opacity:0.7; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.08); }
        }

        /* ── Main layout grid ── */
        .cin-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 440px;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
          padding-top: 80px;
          gap: 32px;
          position: relative;
          z-index: 2;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Left text ── */
        .cin-left {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .cin-overline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.73rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(59,158,255,0.85);
          margin-bottom: 22px;
        }
        .cin-overline-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 7px rgba(48,209,88,0.9);
          animation: greenPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes greenPulse {
          0%,100% { box-shadow: 0 0 5px rgba(48,209,88,0.7); }
          50%      { box-shadow: 0 0 14px rgba(48,209,88,1); }
        }

        /* Name */
        .cin-name-block {
          display: flex;
          flex-direction: column;
          margin-bottom: 18px;
          position: relative;
        }
        .cin-name-first {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 5.5vw, 4.6rem);
          font-weight: 400;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #f5f5f7;
          display: block;
        }
        .cin-name-last {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 5.5vw, 4.6rem);
          font-weight: 400;
          line-height: 1.0;
          letter-spacing: -0.03em;
          display: block;
          background: linear-gradient(125deg, #60a5fa 0%, #a78bfa 40%, #38bdf8 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 220% auto;
          animation: nameGrad 7s ease infinite;
        }
        @keyframes nameGrad {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        .cin-name-stroke {
          height: 2px;
          width: 100px;
          margin-top: 12px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa 60%, transparent);
          border-radius: 999px;
          transform-origin: left;
        }

        /* Role / bio */
        .cin-role {
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #636366;
          margin-bottom: 14px;
        }
        .dark .cin-role { color: #8e8e93; }
        .cin-bio {
          font-size: 0.98rem;
          font-weight: 300;
          font-style: italic;
          line-height: 1.72;
          color: #8e8e93;
          margin-bottom: 32px;
          max-width: 400px;
          min-height: 3em;
        }
        .cin-caret {
          display: inline-block;
          width: 2px; height: 0.9em;
          background: rgba(96,165,250,0.85);
          margin-left: 2px;
          vertical-align: text-bottom;
          border-radius: 1px;
          animation: caretBlink 1s step-end infinite;
        }
        @keyframes caretBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Buttons */
        .cin-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }

        /* Scroll hint */
        .cin-scroll-hint {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #48484a;
        }
        .cin-scroll-line {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, #60a5fa, transparent);
          border-radius: 1px;
        }

        /* ── Right photo ── */
        .cin-right {
          position: relative;
          height: 520px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        /* Glow rings */
        .cin-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          left: 50%;
          transform: translateX(-50%);
        }
        .cin-ring-a {
          width: 300px; height: 300px;
          bottom: 60px;
          background: radial-gradient(circle, rgba(59,158,255,0.16) 0%, rgba(120,40,200,0.09) 50%, transparent 75%);
          filter: blur(32px);
          animation: ringBreath 4s ease-in-out infinite;
        }
        .cin-ring-b {
          width: 280px; height: 280px;
          bottom: 70px;
          box-shadow:
            0 0 0 1px rgba(59,158,255,0.25),
            0 0 28px 8px rgba(59,158,255,0.2),
            0 0 70px 20px rgba(59,158,255,0.1),
            0 0 120px 40px rgba(120,40,200,0.07);
          animation: ringPulse2 4s ease-in-out infinite;
        }
        @keyframes ringBreath {
          0%,100% { opacity:0.65; transform:translateX(-50%) scale(1); }
          50%      { opacity:1; transform:translateX(-50%) scale(1.09); }
        }
        @keyframes ringPulse2 {
          0%,100% { box-shadow: 0 0 0 1px rgba(59,158,255,0.25), 0 0 28px 8px rgba(59,158,255,0.2), 0 0 70px 20px rgba(59,158,255,0.1), 0 0 120px 40px rgba(120,40,200,0.07); }
          50%      { box-shadow: 0 0 0 1.5px rgba(59,158,255,0.5), 0 0 44px 14px rgba(59,158,255,0.34), 0 0 100px 32px rgba(59,158,255,0.16), 0 0 170px 60px rgba(120,40,200,0.13); }
        }

        /* Corner brackets */
        .cin-corner {
          position: absolute;
          width: 20px; height: 20px;
          z-index: 4; pointer-events: none;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .cin-right:hover .cin-corner { opacity: 1; }
        .cin-corner-tl { top:20px; left:52px; border-top:2px solid #60a5fa; border-left:2px solid #60a5fa; }
        .cin-corner-tr { top:20px; right:52px; border-top:2px solid #60a5fa; border-right:2px solid #60a5fa; }
        .cin-corner-bl { bottom:55px; left:52px; border-bottom:2px solid #a78bfa; border-left:2px solid #a78bfa; }
        .cin-corner-br { bottom:55px; right:52px; border-bottom:2px solid #a78bfa; border-right:2px solid #a78bfa; }

        /* Photo box */
        .cin-photo-box {
          position: relative;
          z-index: 3;
          width: 300px;
          height: 460px;
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
        }
        .cin-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          background: transparent;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          filter: drop-shadow(0 0 16px rgba(59,158,255,0.38));
        }
        .cin-photo-badge {
          position: absolute;
          top: 12px; left: 50%;
          transform: translateX(-50%);
          background: rgba(59,158,255,0.92);
          color: #fff;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 999px;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 2px 14px rgba(59,158,255,0.5);
          z-index: 10;
        }

        /* Index label */
        .cin-index-label {
          position: absolute;
          bottom: 20px; right: 8px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(59,158,255,0.35);
          writing-mode: vertical-rl;
          user-select: none;
          pointer-events: none;
        }

        /* ── Skills bar ── */
        .cin-skills-wrap {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.055);
          background: rgba(255,255,255,0.018);
        }
        .cin-skills-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 14px 48px;
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .cin-skills-eyebrow {
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #60a5fa;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .cin-skills-sep {
          width: 1px; height: 18px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .cin-skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .cin-skill {
          font-size: 0.67rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #8e8e93;
          padding: 3px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.035);
          white-space: nowrap;
          cursor: default;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .cin-skill:hover {
          color: #60a5fa;
          border-color: rgba(96,165,250,0.35);
          background: rgba(96,165,250,0.08);
          transform: translateY(-2px);
        }

        /* ── About bubble ── */
        .cin-bubble {
          background: rgba(10,10,16,0.98);
          border: 1px solid rgba(59,158,255,0.18);
          border-radius: 18px;
          padding: 20px 22px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .cin-bubble-x {
          position:absolute; top:12px; right:14px;
          color:#48484a; font-size:1.1rem; line-height:1;
          background:none; border:none; cursor:pointer;
          transition: color 0.15s;
        }
        .cin-bubble-x:hover { color:#f5f5f7; }
        .cin-bubble-h { font-family:'DM Serif Display',serif; font-size:1rem; color:#f5f5f7; margin-bottom:10px; }
        .cin-bubble-line { height:1px; margin-bottom:12px; background:linear-gradient(90deg,rgba(96,165,250,0.4),rgba(167,139,250,0.3),transparent); }
        .cin-bubble-p { font-size:0.81rem; color:#8e8e93; line-height:1.68; font-weight:300; }
        .cin-bubble-btn { display:inline-block; margin-top:14px; font-size:0.74rem; font-weight:700; color:#60a5fa; background:none; border:none; cursor:pointer; padding:0; transition:opacity 0.15s; }
        .cin-bubble-btn:hover { opacity:0.7; }

        /* ── Light mode ── */
        :root:not(.dark) .cin-name-first { color:#1c1c1e; }
        :root:not(.dark) .cin-role { color:#48484a; }
        :root:not(.dark) .cin-bio { color:#636366; }
        :root:not(.dark) .cin-overline { color:#0071e3; }
        :root:not(.dark) .cin-scroll-hint { color:#aeaeb2; }
        :root:not(.dark) .cin-skills-wrap { background:rgba(0,0,0,0.018); border-top-color:rgba(0,0,0,0.07); }
        :root:not(.dark) .cin-skill { color:#636366; border-color:rgba(0,0,0,0.1); background:rgba(0,0,0,0.025); }
        :root:not(.dark) .cin-skill:hover { color:#0071e3; border-color:rgba(0,113,227,0.3); background:rgba(0,113,227,0.06); }
        :root:not(.dark) .cin-skills-sep { background:rgba(0,0,0,0.1); }
        :root:not(.dark) .cin-grid { background-image: linear-gradient(rgba(0,113,227,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.04) 1px, transparent 1px); }
        :root:not(.dark) .cin-bubble { background:rgba(255,255,255,0.99); border-color:rgba(0,113,227,0.15); }
        :root:not(.dark) .cin-bubble-h { color:#1c1c1e; }
        :root:not(.dark) .cin-bubble-p { color:#48484a; }
        :root:not(.dark) .cin-bubble-x:hover { color:#1c1c1e; }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .cin-layout {
            grid-template-columns: 1fr;
            padding: 20px 24px 0;
            padding-top: 60px;
            gap: 0;
          }
          .cin-right {
            order: -1;
            height: 380px;
            margin-bottom: 8px;
          }
          .cin-photo-box { width: 240px; height: 360px; }
          .cin-ring-a { width: 230px; height: 230px; bottom: 30px; }
          .cin-ring-b { width: 215px; height: 215px; bottom: 38px; }
          .cin-corner-tl,.cin-corner-tr { top:8px; }
          .cin-corner-tl,.cin-corner-bl { left:28px; }
          .cin-corner-tr,.cin-corner-br { right:28px; }
          .cin-corner-bl,.cin-corner-br { bottom:28px; }
          .cin-left { align-items: center; text-align: center; }
          .cin-overline { justify-content: center; }
          .cin-name-stroke { margin: 10px auto 0; }
          .cin-btns { justify-content: center; }
          .cin-bio { text-align: center; }
          .cin-scroll-hint { display: none; }
          .cin-skills-inner { padding: 12px 24px; }
          .cin-index-label { display: none; }
        }
      `}</style>
    </section>
  )
}
