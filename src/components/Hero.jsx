import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

const ARC_CX = 210
const ARC_CY = 280
const ARC_RX = 200
const ARC_RY = 210

const skills = [
  { label: 'Photoshop',     icon: '🖼️', angle: 200 },
  { label: 'PixelLab',      icon: '✏️', angle: 222 },
  { label: 'Alight Motion', icon: '🎬', angle: 248 },
  { label: 'VS Code',       icon: '💻', angle: 270 },
  { label: 'Java',          icon: '☕', angle: 292 },
  { label: 'HTML',          icon: '🌐', angle: 315 },
  { label: 'CSS',           icon: '🎨', angle: 335 },
  { label: 'JavaScript',    icon: '⚡', angle: 355 },
]

const degToRad = (d) => (d * Math.PI) / 180

export default function Hero() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative z-10 pt-[120px] pb-[80px] px-0">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-4">

          {/* ── LEFT: Text ── */}
          <div className="flex-1 flex flex-col items-start text-left">
            <motion.div {...fadeUp(0)} className="mb-5">
              <div className="inline-flex items-center gap-[7px]
                bg-white/65 dark:bg-[rgba(28,28,30,0.75)]
                border border-black/7 dark:border-white/8
                px-3 py-[5px] rounded-full backdrop-blur-md
                shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                text-[0.78rem] font-medium text-[#48484a] dark:text-[#aeaeb2]">
                <span className="status-dot" />
                Open to opportunities
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-serif font-normal text-[clamp(2.4rem,5vw,3.6rem)]
                tracking-[-0.02em] leading-[1.1] mb-3
                text-[#1c1c1e] dark:text-[#f5f5f7]"
            >
              Adrian Kyle<br />Condeza
            </motion.h1>

            <motion.p
              {...fadeUp(0.14)}
              className="text-base font-medium mb-4 text-[rgb(var(--accent-rgb))]"
            >
              1st Year IT Student · Aspiring Computer Engineer
            </motion.p>

            <motion.p
              {...fadeUp(0.2)}
              className="text-[1.05rem] text-[#48484a] dark:text-[#aeaeb2] font-light
                leading-[1.7] max-w-[420px] mb-8 italic"
            >
              Building skills in web development and programming, one project at a time.
            </motion.p>

            <motion.div {...fadeUp(0.26)} className="flex gap-3 flex-wrap">
              <button className="btn-primary" onClick={() => scrollTo('#contact')}>
                Get in Touch
              </button>
              <button className="btn-ghost" onClick={() => scrollTo('#about')}>
                Learn More
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: Photo + Arc Skills ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 relative"
            style={{ width: '420px', height: '520px' }}
          >
            {/* Arc skill chips — behind photo */}
            {skills.map((s, i) => {
              const rad = degToRad(s.angle)
              const x = ARC_CX + ARC_RX * Math.cos(rad)
              const y = ARC_CY + ARC_RY * Math.sin(rad)
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.35, delay: 0.5 + i * 0.07 },
                    scale:   { duration: 0.35, delay: 0.5 + i * 0.07 },
                    y: { duration: 2.6 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18, repeatType: 'loop' },
                  }}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                  }}
                  className="flex items-center gap-1.5
                    bg-white/85 dark:bg-[rgba(20,20,28,0.90)]
                    border border-white/60 dark:border-white/12
                    backdrop-blur-md rounded-full
                    px-2.5 py-[5px]
                    shadow-[0_4px_24px_rgba(0,0,0,0.25)]
                    text-[0.68rem] font-semibold
                    text-[#1c1c1e] dark:text-[#f0f0f5]
                    whitespace-nowrap cursor-default select-none"
                >
                  <span className="text-[13px] leading-none">{s.icon}</span>
                  {s.label}
                </motion.div>
              )
            })}

            {/* Pulsing glow blob behind photo — no outline ring */}
            <div className="hero-glow-blob" />

            {/* Profile photo */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
              <img
                src="/pfp.png"
                alt="Adrian Kyle Condeza"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  background: 'transparent',
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .hero-glow-blob {
          position: absolute;
          width: 65%;
          height: 65%;
          top: 17%;
          left: 17%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,113,227,0.35) 0%, rgba(100,30,200,0.20) 50%, transparent 78%);
          filter: blur(28px);
          z-index: 1;
          animation: glowBreath 3s ease-in-out infinite;
        }
        @keyframes glowBreath {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.18); }
        }
      `}</style>
    </section>
  )
}
