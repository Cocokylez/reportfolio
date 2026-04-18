import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ── Tech icons as inline SVGs / emoji-free unicode symbols ── */
const TECH = [
  {
    label: 'Tailwind',
    svg: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 6.4c-4.267 0-6.933 2.133-8 6.4 1.6-2.133 3.467-2.933 5.6-2.4 1.218.304 2.088 1.186 3.051 2.163C18.192 14.126 19.84 15.84 24 15.84c4.267 0 6.933-2.133 8-6.4-1.6 2.133-3.467 2.933-5.6 2.4-1.218-.304-2.088-1.186-3.051-2.163C21.808 8.114 20.16 6.4 16 6.4zM8 15.84c-4.267 0-6.933 2.133-8 6.4 1.6-2.133 3.467-2.933 5.6-2.4 1.218.304 2.088 1.186 3.051 2.163C10.192 23.566 11.84 25.28 16 25.28c4.267 0 6.933-2.133 8-6.4-1.6 2.133-3.467 2.933-5.6 2.4-1.218-.304-2.088-1.186-3.051-2.163C13.808 17.554 12.16 15.84 8 15.84z" fill="#38BDF8"/></svg>`,
  },
  {
    label: 'Java',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 23.6s-1.1.65.79.87c2.3.26 3.47.22 6-.25 0 0 .67.42 1.6.78-5.68 2.43-12.86-.14-8.39-1.4z" fill="#E76F00"/><path d="M10.8 20.5s-1.24.92.65 1.12c2.44.27 4.37.3 7.7-.4 0 0 .46.47 1.2.73-6.83 2-14.43.16-9.55-1.45z" fill="#E76F00"/><path d="M16.4 14.5c1.39 1.6-.37 3.04-.37 3.04s3.53-1.82 1.91-4.1c-1.51-2.12-2.67-3.17 3.6-6.8 0 0-9.83 2.46-5.14 7.86z" fill="#E76F00"/><path d="M23.1 25.8s.82.67-.9 1.2c-3.27 1-13.6 1.29-16.47.04-1.03-.45.9-1.07 1.5-1.2.63-.14.99-.11.99-.11-1.14-.8-7.38 1.58-3.17 2.26 11.47 1.86 20.9-.84 18.05-2.19z" fill="#E76F00"/><path d="M12 17.4s-5.24 1.25-1.85 1.7c1.42.19 4.25.14 6.88-.07 2.16-.17 4.32-.55 4.32-.55s-.76.32-1.31.7c-5.3 1.4-15.53.75-12.58-.68 2.5-1.2 4.54-1.1 4.54-1.1z" fill="#E76F00"/><path d="M20.2 21.7c5.38-2.8 2.9-5.48 1.15-5.12-.42.09-.61.17-.61.17s.16-.25.46-.35c3.43-1.2 6.07 3.55-1.11 5.44 0 0 .08-.07.11-.14z" fill="#E76F00"/><path d="M17.6 4s2.99 3-2.84 7.6c-4.67 3.69-1.07 5.8 0 8.2-2.73-2.46-4.73-4.63-3.39-6.65C13.29 10.4 18.96 8.97 17.6 4z" fill="#E76F00"/><path d="M12.7 28.9c5.17.33 13.1-.18 13.3-2.6 0 0-.36.93-4.28 1.66-4.43.83-9.9.73-13.14.2 0 0 .66.55 4.12.74z" fill="#E76F00"/></svg>`,
  },
  {
    label: 'HTML5',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M4 2l2.28 25.6L16 30l9.73-2.4L28 2z" fill="#E44D26"/><path d="M16 27.6V4.4h-.01L6.87 6.93l1.57 17.6L16 27.6z" fill="#F16529"/><path d="M21 19.6H16v2.6h4.74l-.45 5.02L16 28.4v2.7l5.89-1.63.43-4.86.55-6.1zM11 12.4l.26 2.6H16v-2.6h-5zM10.5 7H16V4.4H7.8l.7 8h7.5V9.8h-5.2l-.3-2.8z" fill="#EBEBEB"/><path d="M16 19.6v2.6h4.74l-.45 5.02L16 28.4v2.7l5.88-1.63.43-4.86.55-6.1H16zM16 9.8v2.6h6.96l-.23 2.6H16v2.6h6.5l-.65 7.28L16 26.6v2.7l6.5-1.8 1.6-18H16z" fill="#fff"/></svg>`,
  },
  {
    label: 'JavaScript',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#F7DF1E" d="M2 2h28v28H2z"/><path d="M20.8 24.5c.5.8 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.1 0-.8-.65-1.1-1.73-1.56l-.6-.25c-1.7-.72-2.84-1.63-2.84-3.54 0-1.76 1.34-3.1 3.44-3.1 1.5 0 2.57.52 3.34 1.88l-1.83 1.17c-.4-.72-.84-1-1.5-1-.68 0-1.1.43-1.1 1 0 .7.43 1 1.43 1.44l.6.25c2 .86 3.16 1.74 3.16 3.7 0 2.12-1.66 3.27-3.9 3.27-2.18 0-3.59-1.04-4.28-2.4l1.91-1.1zm-9.5.23c.37.65.7 1.2 1.5 1.2.77 0 1.25-.3 1.25-1.47v-7.96h2.34v8c0 2.42-1.42 3.52-3.49 3.52-1.87 0-2.96-1-3.52-2.1l1.92-1.19z"/></svg>`,
  },
  {
    label: 'Git',
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#F05033" d="M30.4 14.6L17.4 1.6a2.03 2.03 0 00-2.86 0L11.86 4.3l3.6 3.6a2.41 2.41 0 013.05 3.07l3.47 3.47a2.41 2.41 0 11-1.45 1.37l-3.24-3.24v8.53a2.41 2.41 0 11-1.98-.07V12.5a2.41 2.41 0 01-1.31-3.17L10.42 5.8 1.6 14.63a2.03 2.03 0 000 2.86l13 13a2.03 2.03 0 002.86 0l12.94-12.94a2.03 2.03 0 000-2.86z"/></svg>`,
  },
]

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

export default function Hero() {
  const typed = useTypewriter('1ST YEAR IT STUDENT  •  ASPIRING IT EXPERT')

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" style={sectionStyle}>

      {/* ── Status badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={badgeStyle}
      >
        <span style={dotStyle} />
        OPEN TO OPPORTUNITIES
      </motion.div>

      {/* ── Name ── */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={nameStyle}
      >
        ADRIAN KYLE CONDEZA
      </motion.h1>

      {/* ── Role typewriter ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={roleStyle}
      >
        {typed}<span style={caretStyle} />
      </motion.p>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={btnsStyle}
      >
        <motion.button
          onClick={() => scrollTo('#contact')}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={btnPrimaryStyle}
        >
          CONTACT
        </motion.button>
        <motion.button
          onClick={() => scrollTo('#about')}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={btnGhostStyle}
        >
          LEARN MORE
        </motion.button>
      </motion.div>

      {/* ── Tech icons ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.8 }}
        style={iconsRowStyle}
      >
        {TECH.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.85 + i * 0.07 }}
            whileHover={{ scale: 1.18, y: -4 }}
            title={t.label}
            style={iconWrapStyle}
            dangerouslySetInnerHTML={{ __html: t.svg }}
          />
        ))}
      </motion.div>

    </section>
  )
}

/* ── Styles ─────────────────────────────────────────────────── */
const sectionStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0 24px',
  gap: '0',
  background: 'transparent',
  position: 'relative',
}

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: '999px',
  padding: '9px 22px',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  color: '#e0e0e0',
  marginBottom: '48px',
  boxShadow: '0 0 24px rgba(255,255,255,0.06), inset 0 0 20px rgba(255,255,255,0.02)',
}

const dotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#30d158',
  boxShadow: '0 0 8px rgba(48,209,88,1)',
  flexShrink: 0,
  animation: 'none',
}

const nameStyle = {
  fontFamily: '"DM Serif Display", serif',
  fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
  fontWeight: 400,
  letterSpacing: '-0.01em',
  lineHeight: 1.0,
  color: '#f5f5f5',
  margin: '0 0 24px 0',
}

const roleStyle = {
  fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)',
  fontWeight: 600,
  letterSpacing: '0.14em',
  color: '#3b9eff',
  marginBottom: '48px',
  minHeight: '1.4em',
}

const caretStyle = {
  display: 'inline-block',
  width: '2px',
  height: '0.9em',
  background: '#3b9eff',
  marginLeft: '2px',
  verticalAlign: 'text-bottom',
  borderRadius: '1px',
}

const btnsStyle = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: '64px',
}

const btnPrimaryStyle = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '999px',
  padding: '14px 36px',
  fontSize: '0.82rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  cursor: 'crosshair',
  boxShadow: '0 4px 24px rgba(37,99,235,0.45)',
  transition: 'box-shadow 0.2s',
}

const btnGhostStyle = {
  background: 'rgba(255,255,255,0.07)',
  color: '#ccc',
  border: '1.5px solid rgba(255,255,255,0.14)',
  borderRadius: '999px',
  padding: '14px 36px',
  fontSize: '0.82rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  cursor: 'crosshair',
}

const iconsRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
}

const iconWrapStyle = {
  width: '52px',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'crosshair',
  transition: 'filter 0.2s',
  filter: 'drop-shadow(0 0 0px transparent)',
}
