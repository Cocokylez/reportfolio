import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

/* ─── Skill tags — left column, right column ─── */
const LEFT_SKILLS  = ['HTML', 'CSS', 'JavaScript', 'Photoshop']
const RIGHT_SKILLS = ['Java', 'VS Code', 'PixelLab', 'Alight Motion']

/* ─── Tiny animated dots for the bg grid ─── */
function GridBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          radial-gradient(circle, rgba(59,158,255,0.13) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 70% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 50%, black 30%, transparent 100%)',
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─── Single floating skill chip ─── */
function Chip({ label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="chip"
    >
      {label}
    </motion.div>
  )
}

/* ─── Speech bubble about me ─── */
function AboutBubble({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.18)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            style={{ position: 'absolute', bottom: '105%', left: '50%', transform: 'translateX(-50%)', width: '270px', zIndex: 50 }}
          >
            <div className="about-bubble">
              <button onClick={(e) => { e.stopPropagation(); onClose() }} className="bubble-close">×</button>
              <p className="bubble-title">About Me</p>
              <div className="bubble-divider" />
              <p className="bubble-text">
                First-year IT student building a foundation in programming and web development —
                learning Java, HTML, CSS and JavaScript through real projects.
              </p>
              <p className="bubble-text" style={{ marginTop: '8px' }}>
                Passionate about tech, aiming to become a computer engineer and entrepreneur.
              </p>
              <button
                className="bubble-link"
                onClick={(e) => {
                  e.stopPropagation(); onClose()
                  setTimeout(() => {
                    const el = document.getElementById('about')
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
                  }, 250)
                }}
              >
                Read full About Me →
              </button>
              <div className="bubble-tail" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════ */
export default function Hero() {
  const [hovering, setHovering]     = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const photoRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">

      {/* Subtle dot-grid background — only on right half */}
      <GridBackground />

      {/* Ambient orbs — CSS-driven, no JS */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="hero-inner">

        {/* ── LEFT: Text column ── */}
        <div className="hero-text">

          {/* Eyebrow line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-eyebrow"
          >
            <span className="eyebrow-dot" />
            Open to opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="hero-name"
          >
            Adrian Kyle<br />
            <span className="hero-name-accent">Condeza</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="hero-role"
          >
            1st Year IT Student · Aspiring Computer Engineer
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="hero-bio"
          >
            Building skills in web development and programming,<br className="hidden md:block" /> one project at a time.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-btns"
          >
            <button className="btn-primary" onClick={() => scrollTo('#contact')}>Get in Touch</button>
            <button className="btn-ghost"   onClick={() => scrollTo('#about')}>Learn More</button>
          </motion.div>

        </div>

        {/* ── RIGHT: Photo + skills ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="hero-photo-col"
        >

          {/* Left skill column */}
          <div className="skill-col skill-col-left">
            {LEFT_SKILLS.map((s, i) => <Chip key={s} label={s} delay={0.4 + i * 0.07} />)}
          </div>

          {/* Photo frame */}
          <div className="photo-frame" ref={photoRef}>
            {/* Glow layers */}
            <div className="photo-glow-outer" />
            <div className="photo-glow-inner" />

            {/* Photo — click for about bubble */}
            <div
              className="photo-hitbox"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={() => setBubbleOpen(v => !v)}
            >
              <img
                src="/pfp.png"
                alt="Adrian Kyle Condeza"
                className="photo-img"
                style={{ transform: hovering ? 'scale(1.025)' : 'scale(1)' }}
              />

              {/* Hover hint */}
              <AnimatePresence>
                {hovering && !bubbleOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.14 }}
                    className="photo-hint"
                  >
                    About Me
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About speech bubble */}
            <AboutBubble open={bubbleOpen} onClose={() => setBubbleOpen(false)} />
          </div>

          {/* Right skill column */}
          <div className="skill-col skill-col-right">
            {RIGHT_SKILLS.map((s, i) => <Chip key={s} label={s} delay={0.4 + i * 0.07} />)}
          </div>

        </motion.div>
      </div>

      <style>{`
        /* ── Section ── */
        .hero-section {
          position: relative;
          z-index: 10;
          padding-top: 120px;
          padding-bottom: 80px;
          overflow: visible;
        }
        .hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        /* ── Text ── */
        .hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 500px;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #aeaeb2;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
        .dark .hero-eyebrow {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.09);
        }
        .eyebrow-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 6px rgba(48,209,88,0.7);
          animation: pulse-green 2s ease-in-out infinite;
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 6px rgba(48,209,88,0.6); }
          50%       { box-shadow: 0 0 12px rgba(48,209,88,0.9); }
        }
        .hero-name {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.6rem, 5.5vw, 4rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #f5f5f7;
          margin-bottom: 14px;
        }
        .hero-name-accent {
          background: linear-gradient(135deg, #3b9eff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-role {
          font-size: 0.95rem;
          font-weight: 500;
          color: rgb(var(--accent-rgb));
          margin-bottom: 16px;
          letter-spacing: 0.01em;
        }
        .hero-bio {
          font-size: 1rem;
          color: #8e8e93;
          line-height: 1.7;
          font-style: italic;
          font-weight: 300;
          margin-bottom: 32px;
          max-width: 400px;
        }
        .hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ── Photo column ── */
        .hero-photo-col {
          flex-shrink: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
        }

        /* ── Skill columns ── */
        .skill-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── Chip ── */
        .chip {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 999px;
          padding: 5px 13px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #d1d1d6;
          white-space: nowrap;
          letter-spacing: 0.02em;
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
          cursor: default;
          animation: chipFloat 3.5s ease-in-out infinite;
        }
        .chip:nth-child(2) { animation-delay: 0.4s; }
        .chip:nth-child(3) { animation-delay: 0.8s; }
        .chip:nth-child(4) { animation-delay: 1.2s; }
        .chip:hover {
          background: rgba(59,158,255,0.15);
          border-color: rgba(59,158,255,0.35);
          color: #fff;
          transform: translateX(0) scale(1.04);
        }
        .skill-col-left .chip:hover { transform: translateX(3px) scale(1.04); }
        .skill-col-right .chip:hover { transform: translateX(-3px) scale(1.04); }
        @keyframes chipFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }

        /* ── Photo frame ── */
        .photo-frame {
          position: relative;
          width: 280px;
          height: 420px;
          flex-shrink: 0;
        }
        .photo-glow-outer {
          position: absolute;
          width: 220px; height: 220px;
          top: 60px; left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,158,255,0.22) 0%, rgba(120,40,200,0.12) 55%, transparent 78%);
          filter: blur(28px);
          z-index: 1;
          animation: glowPulse 3s ease-in-out infinite;
        }
        .photo-glow-inner {
          position: absolute;
          width: 220px; height: 220px;
          top: 60px; left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          z-index: 1;
          box-shadow:
            0 0 0 1px rgba(59,158,255,0.35),
            0 0 20px 6px rgba(59,158,255,0.28),
            0 0 50px 16px rgba(59,158,255,0.14),
            0 0 80px 24px rgba(120,40,200,0.09);
          animation: ringPulse 3s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.1); }
        }
        @keyframes ringPulse {
          0%, 100% {
            box-shadow: 0 0 0 1px rgba(59,158,255,0.35), 0 0 20px 6px rgba(59,158,255,0.28), 0 0 50px 16px rgba(59,158,255,0.14), 0 0 80px 24px rgba(120,40,200,0.09);
          }
          50% {
            box-shadow: 0 0 0 1.5px rgba(59,158,255,0.65), 0 0 32px 10px rgba(59,158,255,0.42), 0 0 70px 24px rgba(59,158,255,0.2), 0 0 120px 40px rgba(120,40,200,0.15);
          }
        }

        /* ── Photo hitbox ── */
        .photo-hitbox {
          position: absolute;
          inset: 0;
          z-index: 2;
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
        }
        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          background: transparent;
          transition: transform 0.3s ease;
          filter: drop-shadow(0 0 14px rgba(59,158,255,0.4));
        }
        .photo-hint {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(59,158,255,0.92);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 2px 12px rgba(59,158,255,0.4);
          letter-spacing: 0.02em;
        }

        /* ── About bubble ── */
        .about-bubble {
          background: rgba(18,18,26,0.97);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 18px 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(59,158,255,0.12);
          position: relative;
        }
        .bubble-close {
          position: absolute; top: 10px; right: 12px;
          color: #636366; font-size: 1.1rem; line-height: 1;
          background: none; border: none; cursor: pointer;
          transition: color 0.15s;
        }
        .bubble-close:hover { color: #f5f5f7; }
        .bubble-title {
          font-family: 'DM Serif Display', serif;
          font-size: 0.95rem; font-weight: 400;
          color: #f5f5f7; margin-bottom: 10px;
        }
        .bubble-divider {
          height: 1px; margin-bottom: 10px;
          background: linear-gradient(90deg, transparent, rgba(59,158,255,0.3), transparent);
        }
        .bubble-text {
          font-size: 0.8rem; color: #8e8e93;
          line-height: 1.65; font-weight: 300;
        }
        .bubble-link {
          display: inline-block; margin-top: 12px;
          font-size: 0.75rem; font-weight: 600;
          color: rgb(var(--accent-rgb));
          background: none; border: none; cursor: pointer;
          transition: opacity 0.15s;
          padding: 0;
        }
        .bubble-link:hover { opacity: 0.75; }
        .bubble-tail {
          position: absolute;
          bottom: -9px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid rgba(18,18,26,0.97);
        }

        /* ── Light mode overrides ── */
        :root:not(.dark) .hero-eyebrow { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); color: #636366; }
        :root:not(.dark) .hero-name { color: #1c1c1e; }
        :root:not(.dark) .hero-bio { color: #636366; }
        :root:not(.dark) .chip { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); color: #3a3a3c; }
        :root:not(.dark) .chip:hover { background: rgba(0,113,227,0.1); border-color: rgba(0,113,227,0.3); color: #0071e3; }
        :root:not(.dark) .about-bubble { background: rgba(255,255,255,0.98); border-color: rgba(0,0,0,0.08); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        :root:not(.dark) .bubble-title { color: #1c1c1e; }
        :root:not(.dark) .bubble-text { color: #636366; }
        :root:not(.dark) .bubble-tail { border-top-color: rgba(255,255,255,0.98); }
        :root:not(.dark) .bubble-close { color: #aeaeb2; }
        :root:not(.dark) .bubble-close:hover { color: #1c1c1e; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
            gap: 48px;
          }
          .hero-text { align-items: center; }
          .hero-photo-col { gap: 10px; }
          .photo-frame { width: 220px; height: 340px; }
          .photo-glow-outer, .photo-glow-inner { width: 170px; height: 170px; top: 40px; }
          .chip { font-size: 0.62rem; padding: 4px 10px; }
          .hero-name { font-size: clamp(2rem, 8vw, 2.6rem); }
        }
      `}</style>
    </section>
  )
}
