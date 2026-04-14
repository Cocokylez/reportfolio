import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'Java', 'VS Code', 'Photoshop', 'PixelLab', 'Alight Motion']

/* Typewriter hook */
function useTypewriter(text, speed = 38, startDelay = 800) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(t)
  }, [text])
  return displayed
}

/* About bubble */
function AboutBubble({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(3px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', zIndex: 50 }}
          >
            <div className="akc-bubble">
              <button onClick={onClose} className="akc-bubble-close">×</button>
              <p className="akc-bubble-title">About Me</p>
              <div className="akc-bubble-hr" />
              <p className="akc-bubble-body">
                First-year IT student building a foundation in programming and
                web development — learning Java, HTML, CSS and JavaScript through real projects.
              </p>
              <p className="akc-bubble-body" style={{ marginTop: '8px' }}>
                Passionate about tech, aiming to become a computer engineer and entrepreneur.
              </p>
              <button
                className="akc-bubble-link"
                onClick={() => {
                  onClose()
                  setTimeout(() => {
                    const el = document.getElementById('about')
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
                  }, 260)
                }}
              >Read full About Me →</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const [hovered, setHovered]       = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const typed = useTypewriter('Building skills in web development and programming, one project at a time.')

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="akc-hero">

      {/* ── Noise texture overlay ── */}
      <div className="akc-noise" aria-hidden />

      {/* ── Diagonal grid lines ── */}
      <div className="akc-grid" aria-hidden />

      {/* ── Scan line ── */}
      <div className="akc-scan" aria-hidden />

      {/* ── Photo — right side, full height bleed ── */}
      <div
        className="akc-photo-wrap"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setBubbleOpen(v => !v)}
      >
        {/* Corner bracket decorations */}
        <div className="akc-bracket akc-bracket-tl" aria-hidden />
        <div className="akc-bracket akc-bracket-tr" aria-hidden />
        <div className="akc-bracket akc-bracket-bl" aria-hidden />
        <div className="akc-bracket akc-bracket-br" aria-hidden />

        {/* Glow rings */}
        <div className="akc-ring akc-ring-1" aria-hidden />
        <div className="akc-ring akc-ring-2" aria-hidden />

        <img
          src="/pfp.png"
          alt="Adrian Kyle Condeza"
          className="akc-photo"
          style={{ transform: hovered ? 'scale(1.04) translateY(-4px)' : 'scale(1) translateY(0)' }}
        />

        {/* Hover hint */}
        <AnimatePresence>
          {hovered && !bubbleOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
              className="akc-photo-hint"
            >About Me</motion.div>
          )}
        </AnimatePresence>

        {/* Vertical name watermark beside photo */}
        <div className="akc-watermark" aria-hidden>AKC</div>
      </div>

      {/* ── Left: Text content ── */}
      <div className="akc-content">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="akc-badge"
        >
          <span className="akc-badge-dot" />
          Open to opportunities
        </motion.div>

        {/* Name — staggered lines */}
        <div className="akc-name-wrap">
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="akc-name-line1"
          >
            Adrian Kyle
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="akc-name-line2"
          >
            Condeza
          </motion.div>

          {/* Accent underline */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="akc-underline"
          />
        </div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="akc-role"
        >
          1st Year IT Student · Aspiring Computer Engineer
        </motion.p>

        {/* Typewriter bio */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="akc-bio"
        >
          {typed}
          <span className="akc-cursor" />
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="akc-btns"
        >
          <button className="btn-primary" onClick={() => scrollTo('#contact')}>Get in Touch</button>
          <button className="btn-ghost"   onClick={() => scrollTo('#about')}>Learn More</button>
        </motion.div>

      </div>

      {/* ── Skills bar — bottom strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        className="akc-skills-bar"
      >
        <span className="akc-skills-label">Stack</span>
        <div className="akc-skills-divider" />
        <div className="akc-skills-list">
          {SKILLS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.55 + i * 0.06 }}
              className="akc-skill-tag"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <AboutBubble open={bubbleOpen} onClose={() => setBubbleOpen(false)} />

      <style>{`
        /* ══ LAYOUT ══ */
        .akc-hero {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 420px;
          grid-template-rows: 1fr auto;
          grid-template-areas:
            "content photo"
            "skills  skills";
          overflow: hidden;
          padding-top: 80px;
        }

        /* ══ BACKGROUND LAYERS ══ */
        .akc-noise {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .akc-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(59,158,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,158,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 60% 80% at 80% 40%, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 60% 80% at 80% 40%, black 10%, transparent 70%);
        }
        .akc-scan {
          position: absolute; left: 0; right: 0; height: 2px; z-index: 1;
          background: linear-gradient(90deg, transparent, rgba(59,158,255,0.3), rgba(167,139,250,0.2), transparent);
          animation: scanMove 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes scanMove {
          0%   { top: 15%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 85%; opacity: 0; }
        }

        /* ══ PHOTO ══ */
        .akc-photo-wrap {
          grid-area: photo;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 40px;
          cursor: pointer;
          z-index: 2;
        }
        .akc-photo {
          width: 320px;
          height: 460px;
          object-fit: cover;
          object-position: top center;
          display: block;
          position: relative;
          z-index: 3;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          filter: drop-shadow(0 0 18px rgba(59,158,255,0.4)) drop-shadow(0 0 40px rgba(59,158,255,0.18));
        }

        /* Glow rings */
        .akc-ring {
          position: absolute;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }
        .akc-ring-1 {
          width: 280px; height: 280px;
          bottom: 80px; left: 50%; transform: translateX(-50%);
          background: radial-gradient(circle, rgba(59,158,255,0.18) 0%, rgba(120,40,200,0.10) 50%, transparent 75%);
          filter: blur(30px);
          animation: glowBreath 3.5s ease-in-out infinite;
        }
        .akc-ring-2 {
          width: 260px; height: 260px;
          bottom: 90px; left: 50%; transform: translateX(-50%);
          box-shadow:
            0 0 0 1px rgba(59,158,255,0.3),
            0 0 24px 6px rgba(59,158,255,0.22),
            0 0 60px 18px rgba(59,158,255,0.10),
            0 0 100px 32px rgba(120,40,200,0.08);
          animation: ringPulse 3.5s ease-in-out infinite;
        }
        @keyframes glowBreath {
          0%,100% { opacity:0.7; transform: translateX(-50%) scale(1); }
          50%      { opacity:1;   transform: translateX(-50%) scale(1.1); }
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 1px rgba(59,158,255,0.3), 0 0 24px 6px rgba(59,158,255,0.22), 0 0 60px 18px rgba(59,158,255,0.10), 0 0 100px 32px rgba(120,40,200,0.08); }
          50%      { box-shadow: 0 0 0 1.5px rgba(59,158,255,0.6), 0 0 38px 10px rgba(59,158,255,0.38), 0 0 80px 28px rgba(59,158,255,0.18), 0 0 140px 50px rgba(120,40,200,0.14); }
        }

        /* Corner brackets */
        .akc-bracket {
          position: absolute;
          width: 22px; height: 22px;
          z-index: 4; pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .akc-photo-wrap:hover .akc-bracket { opacity: 0.9; }
        .akc-bracket-tl { top: 28px; left: 60px;  border-top: 2px solid rgba(59,158,255,0.7);  border-left: 2px solid rgba(59,158,255,0.7); }
        .akc-bracket-tr { top: 28px; right: 60px; border-top: 2px solid rgba(59,158,255,0.7);  border-right: 2px solid rgba(59,158,255,0.7); }
        .akc-bracket-bl { bottom: 48px; left: 60px;  border-bottom: 2px solid rgba(167,139,250,0.6); border-left: 2px solid rgba(167,139,250,0.6); }
        .akc-bracket-br { bottom: 48px; right: 60px; border-bottom: 2px solid rgba(167,139,250,0.6); border-right: 2px solid rgba(167,139,250,0.6); }

        /* Photo hint */
        .akc-photo-hint {
          position: absolute;
          top: 38px; left: 50%;
          transform: translateX(-50%);
          background: rgba(59,158,255,0.92);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 999px;
          white-space: nowrap;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          z-index: 10;
          pointer-events: none;
          box-shadow: 0 2px 14px rgba(59,158,255,0.45);
        }

        /* Watermark */
        .akc-watermark {
          position: absolute;
          right: -8px; top: 50%;
          transform: translateY(-50%) rotate(90deg);
          font-family: 'DM Serif Display', serif;
          font-size: 4.5rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(59,158,255,0.12);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
        }

        /* ══ CONTENT ══ */
        .akc-content {
          grid-area: content;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 0 40px 60px;
          z-index: 2;
        }

        /* Badge */
        .akc-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid rgba(59,158,255,0.2);
          background: rgba(59,158,255,0.06);
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(59,158,255,0.9);
          margin-bottom: 24px;
          width: fit-content;
          letter-spacing: 0.03em;
        }
        .akc-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 6px rgba(48,209,88,0.8);
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 5px rgba(48,209,88,0.7); }
          50%      { box-shadow: 0 0 12px rgba(48,209,88,1); }
        }

        /* Name */
        .akc-name-wrap {
          margin-bottom: 16px;
          position: relative;
        }
        .akc-name-line1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f5f5f7;
        }
        .akc-name-line2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          background: linear-gradient(120deg, #3b9eff 0%, #a78bfa 50%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradientShift 5s ease infinite;
        }
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        .akc-underline {
          height: 2px;
          width: 120px;
          margin-top: 10px;
          background: linear-gradient(90deg, #3b9eff, #a78bfa, transparent);
          transform-origin: left;
          border-radius: 999px;
        }

        /* Role */
        .akc-role {
          font-size: 0.9rem;
          font-weight: 500;
          color: #636366;
          margin-bottom: 16px;
          letter-spacing: 0.02em;
        }
        .dark .akc-role { color: #8e8e93; }

        /* Bio typewriter */
        .akc-bio {
          font-size: 0.98rem;
          color: #8e8e93;
          font-style: italic;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 420px;
          min-height: 2.8em;
        }
        .akc-cursor {
          display: inline-block;
          width: 2px; height: 1em;
          background: rgba(59,158,255,0.8);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }

        /* Buttons */
        .akc-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        /* ══ SKILLS BAR ══ */
        .akc-skills-bar {
          grid-area: skills;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 60px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          z-index: 2;
        }
        .dark .akc-skills-bar { border-top-color: rgba(255,255,255,0.05); }
        .akc-skills-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3b9eff;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .akc-skills-divider {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.12);
          flex-shrink: 0;
        }
        .akc-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .akc-skill-tag {
          font-size: 0.68rem;
          font-weight: 600;
          color: #8e8e93;
          padding: 3px 11px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          letter-spacing: 0.03em;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
          white-space: nowrap;
        }
        .akc-skill-tag:hover {
          color: #3b9eff;
          border-color: rgba(59,158,255,0.35);
          background: rgba(59,158,255,0.08);
          transform: translateY(-2px);
        }

        /* ══ ABOUT BUBBLE ══ */
        .akc-bubble {
          background: rgba(12,12,18,0.98);
          border: 1px solid rgba(59,158,255,0.18);
          border-radius: 18px;
          padding: 20px 22px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,158,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
        }
        .akc-bubble-close {
          position: absolute; top: 12px; right: 14px;
          color: #48484a; font-size: 1.1rem; line-height: 1;
          background: none; border: none; cursor: pointer;
          transition: color 0.15s;
        }
        .akc-bubble-close:hover { color: #f5f5f7; }
        .akc-bubble-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem; color: #f5f5f7;
          margin-bottom: 10px;
        }
        .akc-bubble-hr {
          height: 1px; margin-bottom: 12px;
          background: linear-gradient(90deg, rgba(59,158,255,0.4), rgba(167,139,250,0.3), transparent);
        }
        .akc-bubble-body {
          font-size: 0.82rem; color: #8e8e93;
          line-height: 1.68; font-weight: 300;
        }
        .akc-bubble-link {
          display: inline-block; margin-top: 14px;
          font-size: 0.75rem; font-weight: 700;
          color: #3b9eff; background: none; border: none;
          cursor: pointer; padding: 0; letter-spacing: 0.02em;
          transition: opacity 0.15s;
        }
        .akc-bubble-link:hover { opacity: 0.7; }

        /* ══ LIGHT MODE ══ */
        :root:not(.dark) .akc-badge { border-color: rgba(0,113,227,0.25); background: rgba(0,113,227,0.07); color: #0071e3; }
        :root:not(.dark) .akc-name-line1 { color: #1c1c1e; }
        :root:not(.dark) .akc-role { color: #48484a; }
        :root:not(.dark) .akc-bio { color: #636366; }
        :root:not(.dark) .akc-skills-bar { background: rgba(0,0,0,0.02); border-top-color: rgba(0,0,0,0.07); }
        :root:not(.dark) .akc-skill-tag { color: #636366; border-color: rgba(0,0,0,0.1); background: rgba(0,0,0,0.03); }
        :root:not(.dark) .akc-skill-tag:hover { color: #0071e3; border-color: rgba(0,113,227,0.3); background: rgba(0,113,227,0.06); }
        :root:not(.dark) .akc-skills-divider { background: rgba(0,0,0,0.1); }
        :root:not(.dark) .akc-watermark { -webkit-text-stroke-color: rgba(0,113,227,0.07); }
        :root:not(.dark) .akc-grid { background-image: linear-gradient(rgba(0,113,227,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.04) 1px, transparent 1px); }
        :root:not(.dark) .akc-bubble { background: rgba(255,255,255,0.99); border-color: rgba(0,113,227,0.15); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        :root:not(.dark) .akc-bubble-title { color: #1c1c1e; }
        :root:not(.dark) .akc-bubble-body { color: #48484a; }
        :root:not(.dark) .akc-bubble-close { color: #aeaeb2; }
        :root:not(.dark) .akc-bubble-close:hover { color: #1c1c1e; }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 820px) {
          .akc-hero {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            grid-template-areas:
              "photo"
              "content"
              "skills";
            padding-top: 80px;
            min-height: auto;
          }
          .akc-content { padding: 32px 24px 24px; align-items: center; text-align: center; }
          .akc-badge { margin: 0 auto 20px; }
          .akc-underline { margin: 10px auto 0; }
          .akc-btns { justify-content: center; }
          .akc-bio { text-align: center; }
          .akc-photo-wrap { padding: 30px 0 20px; justify-content: center; }
          .akc-photo { width: 240px; height: 360px; }
          .akc-ring-1 { width: 210px; height: 210px; bottom: 30px; }
          .akc-ring-2 { width: 195px; height: 195px; bottom: 38px; }
          .akc-bracket-tl, .akc-bracket-tr { top: 36px; }
          .akc-bracket-tl { left: 30px; }
          .akc-bracket-tr { right: 30px; }
          .akc-bracket-bl, .akc-bracket-br { bottom: 28px; }
          .akc-bracket-bl { left: 30px; }
          .akc-bracket-br { right: 30px; }
          .akc-watermark { display: none; }
          .akc-skills-bar { padding: 14px 24px; }
        }
      `}</style>
    </section>
  )
}
