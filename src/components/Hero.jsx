import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

// Above head: 3 chips spread across top of the 300px container
// Left shoulder: chips sitting just outside left edge
// Right shoulder: chips sitting just outside right edge
const skills = [
  // Above head
  { label: 'HTML',          icon: '🌐', x: 0,    y: -48 },
  { label: 'VS Code',       icon: '💻', x: 105,  y: -64 },
  { label: 'CSS',           icon: '🎨', x: 215,  y: -48 },

  // Left shoulder
  { label: 'Photoshop',     icon: '🖼️', x: -115, y: 90  },
  { label: 'PixelLab',      icon: '✏️', x: -128, y: 170 },
  { label: 'Alight Motion', icon: '🎬', x: -108, y: 250 },

  // Right shoulder
  { label: 'JavaScript',    icon: '⚡', x: 302,  y: 90  },
  { label: 'Java',          icon: '☕', x: 308,  y: 170 },
]

export default function Hero() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative z-10 pt-[120px] pb-[80px] px-0">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* ── LEFT: Text ── */}
          <div className="flex-1 flex flex-col items-start text-left">

            <motion.h1
              {...fadeUp(0)}
              className="font-serif font-normal text-[clamp(2.4rem,5vw,3.6rem)]
                tracking-[-0.02em] leading-[1.1] mb-3
                text-[#1c1c1e] dark:text-[#f5f5f7]"
            >
              Adrian Kyle<br />Condeza
            </motion.h1>

            {/* Role */}
            <motion.p
              {...fadeUp(0.08)}
              className="text-base font-medium mb-4 text-[rgb(var(--accent-rgb))]"
            >
              1st Year IT Student · Aspiring Computer Engineer
            </motion.p>

            {/* "Open to opportunities" badge — now below the name */}
            <motion.div {...fadeUp(0.13)} className="mb-5">
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

            {/* Tagline */}
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

          {/* ── RIGHT: Photo + Skill chips ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 relative"
            style={{ width: '300px', height: '460px', flexShrink: 0 }}
          >
            {/* Skill chips */}
            {skills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.35, delay: 0.5 + i * 0.07 },
                  scale:   { duration: 0.35, delay: 0.5 + i * 0.07 },
                  y: {
                    duration: 2.6 + i * 0.22,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                    repeatType: 'loop',
                  },
                }}
                style={{
                  position: 'absolute',
                  left: s.x,
                  top: s.y,
                  zIndex: 3,
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
            ))}

            {/* Glow blob */}
            <div className="hero-glow-blob" />

            {/* Glow ring */}
            <div className="hero-glow-ring" />

            {/* Photo */}
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
                  filter: 'drop-shadow(0 0 18px rgba(0,113,227,0.5)) drop-shadow(0 0 50px rgba(0,113,227,0.25))',
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .hero-glow-blob {
          position: absolute;
          width: 260px;
          height: 260px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,113,227,0.30) 0%, rgba(100,30,200,0.16) 55%, transparent 78%);
          filter: blur(24px);
          z-index: 1;
          animation: glowBreath 3s ease-in-out infinite;
        }
        .hero-glow-ring {
          position: absolute;
          width: 260px;
          height: 260px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          border-radius: 50%;
          z-index: 1;
          box-shadow:
            0 0 0 1.5px rgba(0,113,227,0.45),
            0 0 25px 8px rgba(0,113,227,0.35),
            0 0 55px 18px rgba(0,113,227,0.18),
            0 0 90px 28px rgba(120,40,200,0.12);
          animation: glowRingPulse 3s ease-in-out infinite;
        }
        @keyframes glowBreath {
          0%, 100% { opacity: 0.65; transform: translate(-50%, -55%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -55%) scale(1.12); }
        }
        @keyframes glowRingPulse {
          0%, 100% {
            box-shadow: 0 0 0 1.5px rgba(0,113,227,0.45), 0 0 25px 8px rgba(0,113,227,0.35), 0 0 55px 18px rgba(0,113,227,0.18), 0 0 90px 28px rgba(120,40,200,0.12);
          }
          50% {
            box-shadow: 0 0 0 2px rgba(0,113,227,0.8), 0 0 40px 14px rgba(0,113,227,0.55), 0 0 80px 28px rgba(0,113,227,0.28), 0 0 130px 45px rgba(120,40,200,0.2);
          }
        }
      `}</style>
    </section>
  )
}
