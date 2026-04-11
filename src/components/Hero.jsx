import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

// Skills arranged in a curved arc — angles sweep from bottom-left to bottom-right
// behind the photo (like a rainbow/halo arc)
const skills = [
  { label: 'Photoshop',     icon: '🖼️', angle: -150 },
  { label: 'PixelLab',      icon: '✏️', angle: -120 },
  { label: 'Alight Motion', icon: '🎬', angle: -90  },
  { label: 'VS Code',       icon: '💻', angle: -60  },
  { label: 'Java',          icon: '☕', angle: -30  },
  { label: 'HTML',          icon: '🌐', angle: 0    },
  { label: 'CSS',           icon: '🎨', angle: 30   },
  { label: 'JavaScript',    icon: '⚡', angle: 60   },
]

// Convert polar angle to x/y position on an ellipse arc
const getPos = (angleDeg, rx = 155, ry = 130, cx = 50, cy = 55) => {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    left: `${cx + rx * Math.cos(rad)}%`,
    top:  `${cy + ry * Math.sin(rad)}%`,
  }
}

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
            style={{ width: '360px', height: '460px' }}
          >
            {/* Curved arc skill chips — rendered BEHIND the photo (z-0) */}
            {skills.map((s, i) => {
              const pos = getPos(s.angle)
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -7, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.6 + i * 0.08 },
                    scale:   { duration: 0.4, delay: 0.6 + i * 0.08 },
                    y: {
                      duration: 2.8 + i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                      repeatType: 'loop',
                    },
                  }}
                  className="absolute z-0 flex items-center gap-1.5
                    bg-white/80 dark:bg-[rgba(22,22,28,0.88)]
                    border border-white/60 dark:border-white/10
                    backdrop-blur-md rounded-full
                    px-2.5 py-1.5
                    shadow-[0_4px_20px_rgba(0,0,0,0.22)]
                    text-[0.68rem] font-semibold
                    text-[#1c1c1e] dark:text-[#f0f0f5]
                    whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <span className="text-sm leading-none">{s.icon}</span>
                  {s.label}
                </motion.div>
              )
            })}

            {/* Soft glow underneath — behind photo */}
            <div
              className="absolute z-[1] rounded-full"
              style={{
                width: '70%',
                height: '70%',
                top: '15%',
                left: '15%',
                background: 'radial-gradient(ellipse, rgba(0,113,227,0.28) 0%, rgba(120,40,200,0.16) 50%, transparent 75%)',
                filter: 'blur(18px)',
                animation: 'glowBreath 3s ease-in-out infinite',
              }}
            />

            {/* Profile photo — transparent PNG, no border */}
            <div className="absolute inset-0 z-[2]">
              <img
                src="/pfp.png"
                alt="Adrian Kyle Condeza"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 18px rgba(0,113,227,0.45)) drop-shadow(0 0 40px rgba(0,113,227,0.22))',
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes glowBreath {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
      `}</style>
    </section>
  )
}
