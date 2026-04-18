import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   TECH ARRAY — THIS IS WHERE YOU ADD / SWAP YOUR LOGOS
   ---------------------------------------------------------------
   Each entry:
     label : string  → shown as tooltip on hover
     svg   : string  → raw SVG markup (paste any SVG here)
   ---------------------------------------------------------------
   To add a new logo:
     1. Go to https://simpleicons.org or https://devicons.github.io
     2. Copy the SVG source
     3. Add a new { label: 'YourTech', svg: `...paste SVG...` }
   ═══════════════════════════════════════════════════════════════ */
const TECH = [
  {
    label: 'HTML5',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M4 2l2.28 25.6L16 30l9.73-2.4L28 2z" fill="#E44D26"/><path d="M16 27.6V4.4h-.01L6.87 6.93l1.57 17.6L16 27.6z" fill="#F16529"/><path d="M21 19.6H16v2.6h4.74l-.45 5.02L16 28.4v2.7l5.89-1.63.43-4.86.55-6.1zM11 12.4l.26 2.6H16v-2.6h-5zM10.5 7H16V4.4H7.8l.7 8h7.5V9.8h-5.2l-.3-2.8z" fill="#EBEBEB"/><path d="M16 19.6v2.6h4.74l-.45 5.02L16 28.4v2.7l5.88-1.63.43-4.86.55-6.1H16zM16 9.8v2.6h6.96l-.23 2.6H16v2.6h6.5l-.65 7.28L16 26.6v2.7l6.5-1.8 1.6-18H16z" fill="#fff"/></svg>`,
  },
  {
    label: 'CSS3',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M4 2l2.28 25.6L16 30l9.73-2.4L28 2z" fill="#264de4"/><path d="M16 27.6V4.4h-.01l-9.12 2.53 1.57 17.6L16 27.6z" fill="#2965f1"/><path d="M21 12.4H11l.26 2.6H20.74l-.65 7.28L16 23.6l-4.09-1.32-.28-3.07H9.3l.55 6.13L16 27l6.15-2.26 1.6-18H10.5l.26 2.6H21z" fill="#fff"/></svg>`,
  },
  {
    label: 'JavaScript',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#F7DF1E" d="M2 2h28v28H2z"/><path d="M20.8 24.5c.5.8 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.1 0-.8-.65-1.1-1.73-1.56l-.6-.25c-1.7-.72-2.84-1.63-2.84-3.54 0-1.76 1.34-3.1 3.44-3.1 1.5 0 2.57.52 3.34 1.88l-1.83 1.17c-.4-.72-.84-1-1.5-1-.68 0-1.1.43-1.1 1 0 .7.43 1 1.43 1.44l.6.25c2 .86 3.16 1.74 3.16 3.7 0 2.12-1.66 3.27-3.9 3.27-2.18 0-3.59-1.04-4.28-2.4l1.91-1.1zm-9.5.23c.37.65.7 1.2 1.5 1.2.77 0 1.25-.3 1.25-1.47v-7.96h2.34v8c0 2.42-1.42 3.52-3.49 3.52-1.87 0-2.96-1-3.52-2.1l1.92-1.19z"/></svg>`,
  },
  {
    label: 'Java',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 23.6s-1.1.65.79.87c2.3.26 3.47.22 6-.25 0 0 .67.42 1.6.78-5.68 2.43-12.86-.14-8.39-1.4z" fill="#E76F00"/><path d="M10.8 20.5s-1.24.92.65 1.12c2.44.27 4.37.3 7.7-.4 0 0 .46.47 1.2.73-6.83 2-14.43.16-9.55-1.45z" fill="#E76F00"/><path d="M16.4 14.5c1.39 1.6-.37 3.04-.37 3.04s3.53-1.82 1.91-4.1c-1.51-2.12-2.67-3.17 3.6-6.8 0 0-9.83 2.46-5.14 7.86z" fill="#E76F00"/><path d="M23.1 25.8s.82.67-.9 1.2c-3.27 1-13.6 1.29-16.47.04-1.03-.45.9-1.07 1.5-1.2.63-.14.99-.11.99-.11-1.14-.8-7.38 1.58-3.17 2.26 11.47 1.86 20.9-.84 18.05-2.19z" fill="#E76F00"/><path d="M12 17.4s-5.24 1.25-1.85 1.7c1.42.19 4.25.14 6.88-.07 2.16-.17 4.32-.55 4.32-.55s-.76.32-1.31.7c-5.3 1.4-15.53.75-12.58-.68 2.5-1.2 4.54-1.1 4.54-1.1z" fill="#E76F00"/><path d="M20.2 21.7c5.38-2.8 2.9-5.48 1.15-5.12-.42.09-.61.17-.61.17s.16-.25.46-.35c3.43-1.2 6.07 3.55-1.11 5.44 0 0 .08-.07.11-.14z" fill="#E76F00"/><path d="M17.6 4s2.99 3-2.84 7.6c-4.67 3.69-1.07 5.8 0 8.2-2.73-2.46-4.73-4.63-3.39-6.65C13.29 10.4 18.96 8.97 17.6 4z" fill="#E76F00"/><path d="M12.7 28.9c5.17.33 13.1-.18 13.3-2.6 0 0-.36.93-4.28 1.66-4.43.83-9.9.73-13.14.2 0 0 .66.55 4.12.74z" fill="#E76F00"/></svg>`,
  },
  {
    label: 'Git',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#F05033" d="M30.4 14.6L17.4 1.6a2.03 2.03 0 00-2.86 0L11.86 4.3l3.6 3.6a2.41 2.41 0 013.05 3.07l3.47 3.47a2.41 2.41 0 11-1.45 1.37l-3.24-3.24v8.53a2.41 2.41 0 11-1.98-.07V12.5a2.41 2.41 0 01-1.31-3.17L10.42 5.8 1.6 14.63a2.03 2.03 0 000 2.86l13 13a2.03 2.03 0 002.86 0l12.94-12.94a2.03 2.03 0 000-2.86z"/></svg>`,
  },
  {
    label: 'VS Code',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.3 3.6L22.4.3a1.5 1.5 0 00-1.7.3L.5 19.4a1 1 0 000 1.5l1.8 1.7a1 1 0 001.3.1L27 6.3l2.2 1.1V5.1a1.5 1.5 0 00-.9-1.5z" fill="#0065A9"/><path d="M29.3 28.4L22.4 31.7a1.5 1.5 0 01-1.7-.3L.5 12.6a1 1 0 010-1.5l1.8-1.7a1 1 0 011.3-.1L27 25.7l2.2-1.1v2.3a1.5 1.5 0 01-.9 1.5z" fill="#007ACC"/><path d="M22.4 31.7a1.5 1.5 0 01-1.7-.3 1.5 1.5 0 001.7.3l7.9-3.3a1.5 1.5 0 00.9-1.4v-.2a1.5 1.5 0 01-.9 1.6l-7.9 3.3z" fill="#1F9CF0"/><path d="M27 6.3L3.6 22.7a1 1 0 01-1.3-.1L.5 20.9l-.1.1a1 1 0 000 1.5l1.8 1.7a1 1 0 001.3.1L27 7.7V6.3z" fill="#0065A9" opacity=".25"/></svg>`,
  },
  {
    label: 'Tailwind',
    svg: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 6.4c-4.267 0-6.933 2.133-8 6.4 1.6-2.133 3.467-2.933 5.6-2.4 1.218.304 2.088 1.186 3.051 2.163C18.192 14.126 19.84 15.84 24 15.84c4.267 0 6.933-2.133 8-6.4-1.6 2.133-3.467 2.933-5.6 2.4-1.218-.304-2.088-1.186-3.051-2.163C21.808 8.114 20.16 6.4 16 6.4zM8 15.84c-4.267 0-6.933 2.133-8 6.4 1.6-2.133 3.467-2.933 5.6-2.4 1.218.304 2.088 1.186 3.051 2.163C10.192 23.566 11.84 25.28 16 25.28c4.267 0 6.933-2.133 8-6.4-1.6 2.133-3.467 2.933-5.6 2.4-1.218-.304-2.088-1.186-3.051-2.163C13.808 17.554 12.16 15.84 8 15.84z" fill="#38BDF8"/></svg>`,
  },
  {
    label: 'React',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="2.8" fill="#61DAFB"/><path d="M16 10.5c5.8 0 10.8 1.1 13.5 2.8.9.5 1.5 1.1 1.5 1.7s-.6 1.2-1.5 1.7C26.8 18.4 21.8 19.5 16 19.5S5.2 18.4 2.5 16.7C1.6 16.2 1 15.6 1 15s.6-1.2 1.5-1.7C5.2 11.6 10.2 10.5 16 10.5z" stroke="#61DAFB" stroke-width="1.5" fill="none"/><path d="M11.3 12.75c2.9-5 6.5-8.5 9.2-9.4.9-.3 1.7-.2 2.2.3s.6 1.3.3 2.2c-.9 2.7-4.4 6.3-9.4 9.2-5 2.9-9.8 4.1-12.5 3.2-.9-.3-1.4-.9-1.4-1.6s.5-1.5 1.4-2.1c1.8-1.2 4.8-2 8.2-1.8" stroke="#61DAFB" stroke-width="1.5" fill="none"/><path d="M11.3 17.25c-5-2.9-8.5-6.5-9.4-9.2-.3-.9-.2-1.7.3-2.2s1.3-.6 2.2-.3c2.7.9 6.3 4.4 9.2 9.4 2.9 5 4.1 9.8 3.2 12.5-.3.9-.9 1.4-1.6 1.4s-1.5-.5-2.1-1.4c-1.2-1.8-2-4.8-1.8-8.2" stroke="#61DAFB" stroke-width="1.5" fill="none"/></svg>`,
  },
]

/* ── Typewriter hook ──────────────────────────────────────────── */
function useTypewriter(text, speed = 38, delay = 900) {
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

/* ── Single spinning icon card ───────────────────────────────── */
function TechIcon({ label, svg }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="tech-icon-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div
        className={`tech-icon-img ${hovered ? 'spin-slow' : 'spin-fast'}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      {/* Name tooltip — fades in below the icon on hover */}
      <div className={`tech-icon-label ${hovered ? 'visible' : ''}`}>
        {label}
      </div>
    </div>
  )
}

/* ── Marquee ticker ──────────────────────────────────────────── */
function TechMarquee() {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)

  // Duplicate items so the loop is seamless
  const items = [...TECH, ...TECH]

  return (
    <div
      className="marquee-outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div className="marquee-fade-l" />
      <div className="marquee-fade-r" />

      <div
        ref={trackRef}
        className={`marquee-track ${paused ? 'paused' : ''}`}
      >
        {items.map((t, i) => (
          <TechIcon key={`${t.label}-${i}`} label={t.label} svg={t.svg} />
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const typed = useTypewriter('1ST YEAR IT STUDENT  •  ASPIRING IT EXPERT')

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">

      {/* ── Status badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="hero-badge"
      >
        <span className="hero-badge-dot" />
        OPEN TO OPPORTUNITIES
      </motion.div>

      {/* ── Name ── */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="hero-name"
      >
        ADRIAN KYLE CONDEZA
      </motion.h1>

      {/* ── Role typewriter ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="hero-role"
      >
        {typed}<span className="hero-caret" />
      </motion.p>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="hero-btns"
      >
        <motion.button
          onClick={() => scrollTo('#contact')}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="hero-btn-primary"
        >
          CONTACT
        </motion.button>
        <motion.button
          onClick={() => scrollTo('#about')}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="hero-btn-ghost"
        >
          LEARN MORE
        </motion.button>
      </motion.div>

      {/* ── Spinning marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ width: '100%' }}
      >
        <TechMarquee />
      </motion.div>

      {/* ══ ALL STYLES SCOPED HERE ══════════════════════════════ */}
      <style>{`

        /* ── Section shell ── */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px 40px;
          gap: 0;
          background: transparent;
          position: relative;
        }

        /* ── Status badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 9px 22px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #e0e0e0;
          margin-bottom: 44px;
          box-shadow: 0 0 24px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.02);
        }
        .hero-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 8px rgba(48,209,88,0.9);
          flex-shrink: 0;
          animation: greenPulse 2s ease-in-out infinite;
        }
        @keyframes greenPulse {
          0%,100% { box-shadow: 0 0 5px rgba(48,209,88,0.7); }
          50%      { box-shadow: 0 0 14px rgba(48,209,88,1); }
        }

        /* ── Name ── */
        .hero-name {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.6rem, 7.5vw, 6rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.0;
          color: #f5f5f5;
          margin: 0 0 22px 0;
        }

        /* ── Role ── */
        .hero-role {
          font-size: clamp(0.7rem, 1.6vw, 0.9rem);
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #3b9eff;
          margin-bottom: 44px;
          min-height: 1.4em;
        }
        .hero-caret {
          display: inline-block;
          width: 2px; height: 0.9em;
          background: #3b9eff;
          margin-left: 2px;
          vertical-align: text-bottom;
          border-radius: 1px;
          animation: caretBlink 1s step-end infinite;
        }
        @keyframes caretBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Buttons ── */
        .hero-btns {
          display: flex; gap: 20px; flex-wrap: wrap;
          justify-content: center; margin-bottom: 60px;
        }
        .hero-btn-primary {
          background: #2563eb; color: #fff; border: none;
          border-radius: 999px; padding: 13px 34px;
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em;
          cursor: crosshair;
          box-shadow: 0 4px 24px rgba(37,99,235,0.45);
        }
        .hero-btn-ghost {
          background: rgba(255,255,255,0.06); color: #ccc;
          border: 1.5px solid rgba(255,255,255,0.14);
          border-radius: 999px; padding: 13px 34px;
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em;
          cursor: crosshair;
        }

        /* ══════════════════════════════════════════════
           MARQUEE — horizontal infinite scroll
           ══════════════════════════════════════════════ */
        .marquee-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 8px 0 16px;
        }
        /* Fade-out edges so it looks infinite */
        .marquee-fade-l,
        .marquee-fade-r {
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-fade-l {
          left: 0;
          background: linear-gradient(to right, #0a0a0a, transparent);
        }
        .marquee-fade-r {
          right: 0;
          background: linear-gradient(to left, #0a0a0a, transparent);
        }

        /* The scrolling track */
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          /* Move exactly half — because we duplicated the list */
          to   { transform: translateX(-50%); }
        }

        /* ══════════════════════════════════════════════
           INDIVIDUAL ICON CARD
           ══════════════════════════════════════════════ */
        .tech-icon-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: crosshair;
          flex-shrink: 0;
        }

        /* The SVG icon itself */
        .tech-icon-img {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: filter 0.3s ease, transform 0.3s ease;
          filter: grayscale(0.2) opacity(0.7);
        }
        .tech-icon-img svg {
          width: 100%;
          height: 100%;
        }

        /* Normal state: spinning fast */
        .spin-fast {
          animation: spinY 4s linear infinite;
        }

        /* Hovered state: spin slows + full color + glow */
        .spin-slow {
          animation: spinY 12s linear infinite;
          filter: grayscale(0) opacity(1) drop-shadow(0 0 10px rgba(255,255,255,0.3));
          transform: scale(1.2);
        }

        @keyframes spinY {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }

        /* Name label — hidden by default, slides up on hover */
        .tech-icon-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #60a5fa;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
          pointer-events: none;
        }
        .tech-icon-label.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .hero-badge { margin-bottom: 32px; }
          .hero-name { margin-bottom: 16px; }
          .hero-role { margin-bottom: 32px; }
          .hero-btns { margin-bottom: 44px; }
          .tech-icon-img { width: 38px; height: 38px; }
        }
      `}</style>
    </section>
  )
}
