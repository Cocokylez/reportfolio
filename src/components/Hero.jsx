import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════
   TECH ARRAY — add your logos here
   Each entry: { label: 'Name', svg: `...paste SVG...` }
   Get SVGs from: simpleicons.org  (click the < > copy button)
   ═══════════════════════════════════════════════════════════════ */
const TECH = [
  {
    label: 'HTML5',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/></svg>`,
  },
  {
    label: 'CSS3',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" fill="#1572B6"/></svg>`,
  },
  {
    label: 'JavaScript',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#F7DF1E"/></svg>`,
  },
  {
    label: 'Java',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747 1.002c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.56 1.553 17.418-.7 14.977-1.831M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.545.123 5.743-.062 1.798-.153 3.604-.454 3.604-.454s-.634.272-1.092.587c-4.408 1.158-12.927.618-10.478-.568 2.082-.995 3.767-.915 3.767-.915M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-.998 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.54 1.644-2.469 6.197-3.665 5.19-7.626M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#007396"/></svg>`,
  },
  {
    label: 'Git',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.605-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032"/></svg>`,
  },
  {
    label: 'VS Code',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.995V4.005a1.5 1.5 0 0 0-.85-1.418zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC"/></svg>`,
  },
  {
    label: 'Tailwind CSS',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/></svg>`,
  },
  {
    label: 'React',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.445 0 .719.1.938.227.664.383.897 1.707.498 3.442-.09.361-.20.737-.35 1.12-.656-.22-1.373-.414-2.128-.563a34.159 34.159 0 0 0-1.457-1.946c.557-.526 1.103-.984 1.61-1.325.5-.336.937-.555 1.389-.555zm-7.617.002c.447 0 .882.217 1.386.55.506.34 1.052.8 1.608 1.325a34.007 34.007 0 0 0-1.455 1.943c-.752.148-1.467.34-2.12.56-.152-.384-.27-.759-.36-1.12-.4-1.73-.166-3.054.495-3.438.217-.127.488-.226.928-.226zm4.807 3.87c.35.107.693.225 1.022.35-.106.346-.228.7-.368 1.058-.136-.27-.275-.542-.42-.813-.147-.27-.298-.538-.452-.797.073-.004.145-.012.218-.012zm-2.002.002c-.157.26-.31.527-.456.8-.143.268-.281.539-.415.806a21.77 21.77 0 0 1-.37-1.056c.328-.125.67-.242 1.02-.35.073.004.148.012.22.012zm4.782 2.513c.193.57.355 1.148.484 1.716-.568.12-1.156.22-1.764.296a21.04 21.04 0 0 0 .828-1.232c.15-.26.302-.527.452-.78zm-7.572 0c.15.253.302.52.452.78.254.42.534.836.826 1.232-.607-.076-1.194-.175-1.763-.295.13-.57.29-1.148.485-1.717zm8.867-.65c.344.134.673.276.982.428-.08.256-.175.51-.285.758-.24-.127-.486-.25-.74-.368.015-.27.03-.545.043-.818zm-10.16 0c.013.273.028.547.043.817-.254.118-.498.24-.738.367-.11-.248-.205-.502-.286-.758.31-.152.637-.294.98-.427zm4.97.8c.386.204.77.418 1.145.645a23.26 23.26 0 0 1-.587.587c-.19-.19-.385-.384-.587-.577.01-.218.02-.437.03-.655zm-3.78 0c.01.218.02.437.03.655-.202.193-.396.387-.587.577a23.26 23.26 0 0 1-.585-.587c.374-.227.758-.44 1.143-.645zm1.89 1.104c.304.306.597.617.878.935-.293-.01-.586-.018-.878-.018-.293 0-.586.008-.878.02.28-.32.574-.632.878-.937zm0 3.547c-.304-.306-.597-.617-.878-.935.292.01.585.017.878.017.293 0 .586-.007.878-.018-.28.318-.574.63-.878.936zm-1.89-2.443c-.386-.203-.77-.418-1.143-.644.19-.2.383-.395.585-.587.2.19.396.385.587.577-.01.218-.02.437-.03.654zm3.78 0c-.01-.217-.02-.436-.03-.653.19-.193.386-.387.587-.577.202.192.395.387.585.587-.374.226-.758.44-1.143.643zM8.336 17.95c-.15-.254-.302-.52-.453-.78a22.7 22.7 0 0 0-.826-1.232c.607.076 1.194.175 1.763.295-.13.57-.29 1.148-.484 1.717zm7.572 0c-.195-.57-.356-1.148-.485-1.718.569-.12 1.156-.22 1.764-.295a21.08 21.08 0 0 0-.828 1.232c-.15.26-.302.527-.451.78zm-9.027-.866c-.344-.133-.672-.275-.98-.427.08-.256.174-.51.285-.758.24.127.485.25.74.368-.015.27-.03.545-.044.817zm10.16 0c-.014-.272-.03-.546-.044-.817.254-.118.498-.24.738-.367.11.248.205.502.286.758-.31.152-.637.294-.98.427zm-5.055 3.14c-.446 0-.72-.1-.938-.228-.664-.382-.897-1.706-.498-3.441.09-.362.2-.738.35-1.12.655.22 1.372.413 2.127.562.463.63.956 1.248 1.458 1.946-.557.526-1.103.984-1.61 1.326-.5.335-.936.555-1.389.555zm3.808-1.317c.4 1.73.166 3.054-.495 3.438-.217.128-.489.226-.93.226-.445 0-.882-.218-1.385-.55-.506-.34-1.052-.8-1.608-1.326a33.832 33.832 0 0 0 1.456-1.943c.752-.148 1.467-.34 2.12-.56.152.384.27.759.36 1.12l.482-.405zm2.434-4.32c3.053.933 5.043 2.44 5.043 4.03 0 1.585-1.98 3.09-5.025 4.024.7-3.113.39-5.588-.988-6.38-.31-.183-.68-.276-1.09-.277 1.34 0 3.1-.96 4.882-2.622 1.78 1.654 3.54 2.603 4.885 2.603z" fill="#61DAFB"/></svg>`,
  },
  {
    label: 'Node.js',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.053-.139.146-.139.241v10.15c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.661.352-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.603v10.15c0 .661-.354 1.275-.924 1.604l-8.794 5.078c-.282.163-.6.247-.925.247zm2.718-6.979c-3.855 0-4.663-1.772-4.663-3.259 0-.142.114-.253.256-.253h1.138c.127 0 .233.092.253.217.172 1.161.683 1.748 3.018 1.748 1.857 0 2.646-.42 2.646-1.405 0-.568-.224-.99-3.112-1.273-2.415-.238-3.907-.773-3.907-2.708 0-1.784 1.503-2.845 4.022-2.845 2.829 0 4.231.981 4.406 3.091.006.07-.019.138-.063.189-.045.05-.108.079-.175.079h-1.143c-.12 0-.225-.084-.251-.199-.276-1.222-.946-1.613-2.774-1.613-2.041 0-2.278.711-2.278 1.244 0 .646.281.835 3.017 1.199 2.709.361 3.997.872 3.997 2.77 0 1.926-1.606 3.017-4.406 3.017z" fill="#339933"/></svg>`,
  },
]

/* ── Typewriter hook ─────────────────────────────────────────── */
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

/* ── Single icon card ────────────────────────────────────────── */
function TechIcon({ label, svg }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="tech-icon-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`tech-icon-img ${hovered ? 'icon-hovered' : ''}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div className={`tech-icon-label ${hovered ? 'label-visible' : ''}`}>
        {label}
      </div>
    </div>
  )
}

/* ── Marquee ─────────────────────────────────────────────────── */
function TechMarquee() {
  const [paused, setPaused] = useState(false)
  const items = [...TECH, ...TECH, ...TECH]   // triple so center is always full

  return (
    <div
      className="marquee-outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The spotlight: only logos near the center are fully visible */}
      <div className="marquee-spotlight-l" />
      <div className="marquee-spotlight-r" />

      <div className={`marquee-track ${paused ? 'marquee-paused' : ''}`}>
        {items.map((t, i) => (
          <TechIcon key={`${t.label}-${i}`} label={t.label} svg={t.svg} />
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const typed = useTypewriter('1ST YEAR IT STUDENT  •  ASPIRING IT EXPERT')

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="hero-badge"
      >
        <span className="hero-badge-dot" />
        OPEN TO OPPORTUNITIES
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="hero-name"
      >
        ADRIAN KYLE CONDEZA
      </motion.h1>

      {/* Role typewriter */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="hero-role"
      >
        {typed}<span className="hero-caret" />
      </motion.p>

      {/* CTA buttons */}
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

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ width: '100%' }}
      >
        <TechMarquee />
      </motion.div>

      {/* ══ STYLES ══════════════════════════════════════════════ */}
      <style>{`

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px 40px;
          background: transparent;
          position: relative;
        }

        /* ── Badge ── */
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
          box-shadow: 0 0 24px rgba(255,255,255,0.05);
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
          justify-content: center; margin-bottom: 64px;
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

        /* ══ MARQUEE ═══════════════════════════════════════════ */
        .marquee-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 12px 0 20px;
        }

        /*
          THE SPOTLIGHT EFFECT
          Two overlapping gradients from each side.
          They leave only the center ~40% of the width fully visible.
          Everything else fades to the background color (#0a0a0a).
        */
        .marquee-spotlight-l,
        .marquee-spotlight-r {
          position: absolute;
          top: 0; bottom: 0;
          width: 30%;          /* how wide each fade zone is */
          z-index: 2;
          pointer-events: none;
        }
        .marquee-spotlight-l {
          left: 0;
          background: linear-gradient(
            to right,
            #0a0a0a 0%,
            #0a0a0a 30%,
            transparent 100%
          );
        }
        .marquee-spotlight-r {
          right: 0;
          background: linear-gradient(
            to left,
            #0a0a0a 0%,
            #0a0a0a 30%,
            transparent 100%
          );
        }

        /* The scrolling track */
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 52px;
          width: max-content;
          /* 50% because items = TECH*3, scroll 1/3 of total = 33% of 3x */
          animation: marqueeScroll 40s linear infinite;
        }
        .marquee-track.marquee-paused {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }

        /* ══ ICON CARD ═════════════════════════════════════════ */
        .tech-icon-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: crosshair;
          flex-shrink: 0;
        }

        .tech-icon-img {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(0.3) opacity(0.55);
          transition: filter 0.25s ease, transform 0.25s ease;
        }
        .tech-icon-img svg {
          width: 100%;
          height: 100%;
        }

        /* Hover: full color + glow + scale */
        .tech-icon-img.icon-hovered {
          filter: grayscale(0) opacity(1) drop-shadow(0 0 8px rgba(255,255,255,0.25));
          transform: scale(1.25) translateY(-3px);
        }

        /* Name label */
        .tech-icon-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #60a5fa;
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
          pointer-events: none;
        }
        .tech-icon-label.label-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 600px) {
          .hero-badge  { margin-bottom: 28px; }
          .hero-name   { margin-bottom: 16px; }
          .hero-role   { margin-bottom: 28px; }
          .hero-btns   { margin-bottom: 44px; gap: 12px; }
          .tech-icon-img { width: 36px; height: 36px; }
          .marquee-spotlight-l,
          .marquee-spotlight-r { width: 20%; }
        }
      `}</style>
    </section>
  )
}
