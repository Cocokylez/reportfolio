import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

// Skill icons that float around the photo
const skills = [
  { label: 'VS Code',       icon: '💻', top: '4%',   left: '-22%',  delay: 0    },
  { label: 'HTML',          icon: '🌐', top: '20%',  left: '104%',  delay: 0.15 },
  { label: 'CSS',           icon: '🎨', top: '44%',  left: '-24%',  delay: 0.3  },
  { label: 'JavaScript',    icon: '⚡', top: '64%',  left: '106%',  delay: 0.45 },
  { label: 'Java',          icon: '☕', top: '82%',  left: '-18%',  delay: 0.6  },
  { label: 'Photoshop',     icon: '🖼️', top: '-7%',  left: '28%',   delay: 0.1  },
  { label: 'Alight Motion', icon: '🎬', top: '97%',  left: '20%',   delay: 0.5  },
  { label: 'PixelLab',      icon: '✏️', top: '97%',  left: '58%',   delay: 0.7  },
]

export default function Hero() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative z-10 pt-[120px] pb-[80px] px-0">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 flex flex-col items-start text-left">

            {/* Status badge */}
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

            {/* Name */}
            <motion.h1
              {...fadeUp(0.08)}
              className="font-serif font-normal text-[clamp(2.4rem,5vw,3.6rem)]
                tracking-[-0.02em] leading-[1.1] mb-3
                text-[#1c1c1e] dark:text-[#f5f5f7]"
            >
              Adrian Kyle<br />Condeza
            </motion.h1>

            {/* Role */}
            <motion.p
              {...fadeUp(0.14)}
              className="text-base font-medium mb-4 text-[rgb(var(--accent-rgb))]"
            >
              1st Year IT Student · Aspiring Computer Engineer
            </motion.p>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-[1.05rem] text-[#48484a] dark:text-[#aeaeb2] font-light
                leading-[1.7] max-w-[420px] mb-8 italic"
            >
              Building skills in web development and programming, one project at a time.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.26)} className="flex gap-3 flex-wrap">
              <button className="btn-primary" onClick={() => scrollTo('#contact')}>
                Get in Touch
              </button>
              <button className="btn-ghost" onClick={() => scrollTo('#about')}>
                Learn More
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: Photo + Floating Skills ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 relative"
            style={{ width: '300px', height: '400px' }}
          >
            {/* Floating skill chips */}
            {skills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.5 + s.delay },
                  scale:   { duration: 0.4, delay: 0.5 + s.delay },
                  y:       { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25, repeatType: 'loop' },
                  rotate:  { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25, repeatType: 'loop' },
                }}
                className="absolute z-20 flex items-center gap-1.5
                  bg-white/85 dark:bg-[rgba(28,28,35,0.88)]
                  border border-white/70 dark:border-white/12
                  backdrop-blur-md rounded-full
                  px-3 py-1.5
                  shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                  text-[0.7rem] font-semibold
                  text-[#1c1c1e] dark:text-[#f0f0f5]
                  whitespace-nowrap cursor-default"
                style={{ top: s.top, left: s.left }}
              >
                <span className="text-sm leading-none">{s.icon}</span>
                {s.label}
              </motion.div>
            ))}

            {/* Animated glow ring */}
            <div className="hero-glow-ring absolute inset-0 rounded-[28px] z-0" />

            {/* Profile photo */}
            <div className="relative z-10 w-full h-full rounded-[28px] overflow-hidden">
              <img
                src="/pfp.jpg"
                alt="Adrian Kyle Condeza"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .hero-glow-ring {
          box-shadow:
            0 0 0 2px rgba(0,113,227,0.65),
            0 0 28px 8px rgba(0,113,227,0.38),
            0 0 70px 20px rgba(0,113,227,0.2),
            0 0 130px 45px rgba(120,40,200,0.13);
          animation: heroGlowPulse 3s ease-in-out infinite;
        }
        @keyframes heroGlowPulse {
          0%, 100% {
            box-shadow:
              0 0 0 2px rgba(0,113,227,0.65),
              0 0 28px 8px rgba(0,113,227,0.38),
              0 0 70px 20px rgba(0,113,227,0.2),
              0 0 130px 45px rgba(120,40,200,0.13);
          }
          50% {
            box-shadow:
              0 0 0 2.5px rgba(0,113,227,0.95),
              0 0 45px 16px rgba(0,113,227,0.55),
              0 0 100px 35px rgba(0,113,227,0.3),
              0 0 180px 70px rgba(120,40,200,0.22);
          }
        }
      `}</style>
    </section>
  )
}
