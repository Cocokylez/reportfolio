import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

// Photo is 220px wide, centered inside a 480px wide right column
// Photo left edge starts at (480-220)/2 = 130px from container left
// Chips are positioned relative to this 480px container
const PHOTO_L = 130  // photo left edge inside container
const PHOTO_W = 220  // photo width
const PHOTO_MID = PHOTO_L + PHOTO_W / 2  // 240 — horizontal center

const skills = [
  // Above head — 3 chips centered on top
  { label: 'HTML',          x: PHOTO_MID - 120, y: -40 },
  { label: 'VS Code',       x: PHOTO_MID - 38,  y: -56 },
  { label: 'CSS',           x: PHOTO_MID + 46,  y: -40 },

  // Left side — 3 chips
  { label: 'Photoshop',     x: PHOTO_L - 115,   y: 80  },
  { label: 'PixelLab',      x: PHOTO_L - 105,   y: 185 },
  { label: 'Alight Motion', x: PHOTO_L - 122,   y: 290 },

  // Right side — 2 chips
  { label: 'JavaScript',    x: PHOTO_L + PHOTO_W + 10, y: 120 },
  { label: 'Java',          x: PHOTO_L + PHOTO_W + 18, y: 230 },
]

export default function Hero() {
  const [hovered, setHovered] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)

  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative z-10 pt-[120px] pb-[80px]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">

          {/* ── LEFT: Text ── */}
          <div className="flex-1 flex flex-col items-start text-left max-w-[480px]">
            <motion.h1
              {...fadeUp(0)}
              className="font-serif font-normal text-[clamp(2.4rem,5vw,3.6rem)]
                tracking-[-0.02em] leading-[1.1] mb-3
                text-[#1c1c1e] dark:text-[#f5f5f7]"
            >
              Adrian Kyle<br />Condeza
            </motion.h1>

            <motion.p {...fadeUp(0.08)} className="text-base font-medium mb-4 text-[rgb(var(--accent-rgb))]">
              1st Year IT Student · Aspiring Computer Engineer
            </motion.p>

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

            <motion.p
              {...fadeUp(0.2)}
              className="text-[1.05rem] text-[#48484a] dark:text-[#aeaeb2] font-light
                leading-[1.7] max-w-[420px] mb-8 italic"
            >
              Building skills in web development and programming, one project at a time.
            </motion.p>

            <motion.div {...fadeUp(0.26)} className="flex gap-3 flex-wrap">
              <button className="btn-primary" onClick={() => scrollTo('#contact')}>Get in Touch</button>
              <button className="btn-ghost"   onClick={() => scrollTo('#about')}>Learn More</button>
            </motion.div>
          </div>

          {/* ── RIGHT: Wide column to give chips room ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              position: 'relative',
              width: '480px',
              height: '500px',
              flexShrink: 0,
            }}
          >
            {/* Skill chips — all positioned within the 480px wide container */}
            {skills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                transition={{
                  opacity: { duration: 0.35, delay: 0.5 + i * 0.07 },
                  scale:   { duration: 0.35, delay: 0.5 + i * 0.07 },
                  y: { duration: 2.6 + i * 0.22, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15, repeatType: 'loop' },
                }}
                style={{ position: 'absolute', left: s.x, top: s.y, zIndex: 3 }}
                className="flex items-center
                  bg-white/85 dark:bg-[rgba(20,20,28,0.90)]
                  border border-white/60 dark:border-white/12
                  backdrop-blur-md rounded-full px-3 py-[5px]
                  shadow-[0_4px_24px_rgba(0,0,0,0.25)]
                  text-[0.68rem] font-semibold
                  text-[#1c1c1e] dark:text-[#f0f0f5]
                  whitespace-nowrap cursor-default select-none"
              >
                {s.label}
              </motion.div>
            ))}

            {/* Glow blob */}
            <div className="hero-glow-blob" />
            {/* Glow ring */}
            <div className="hero-glow-ring" />

            {/* Photo — interaction directly on the image, no big wrapper div */}
            <img
              src="/pfp.png"
              alt="Adrian Kyle Condeza"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setBubbleOpen(v => !v)}
              style={{
                position: 'absolute',
                left: PHOTO_L,
                top: -20,
                width: PHOTO_W,
                height: 440,
                objectFit: 'contain',
                objectPosition: 'bottom center',
                background: 'transparent',
                filter: 'drop-shadow(0 0 18px rgba(0,113,227,0.5)) drop-shadow(0 0 50px rgba(0,113,227,0.25))',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                zIndex: 2,
                cursor: 'pointer',
              }}
            />

            {/* Hover tooltip */}
            <AnimatePresence>
              {hovered && !bubbleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: PHOTO_MID - 40,
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                  className="px-3 py-1.5 rounded-full text-[0.72rem] font-semibold
                    bg-[rgba(0,113,227,0.9)] text-white
                    shadow-[0_4px_20px_rgba(0,113,227,0.5)]
                    backdrop-blur-md whitespace-nowrap"
                >
                  About Me
                </motion.div>
              )}
            </AnimatePresence>

            {/* Speech bubble — anchored LEFT of photo so it doesn't go off screen */}
            <AnimatePresence>
              {bubbleOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setBubbleOpen(false)}
                    style={{
                      position: 'fixed', inset: 0,
                      zIndex: 40,
                      background: 'rgba(0,0,0,0.25)',
                      backdropFilter: 'blur(2px)',
                    }}
                  />

                  {/* Bubble — positioned to the LEFT of the photo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: 20 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                    style={{
                      position: 'absolute',
                      right: PHOTO_W + 30,
                      top: '8%',
                      width: '260px',
                      zIndex: 50,
                    }}
                  >
                    <div className="relative rounded-2xl px-5 py-4
                      bg-white/90 dark:bg-[rgba(18,18,24,0.95)]
                      border border-black/8 dark:border-white/10
                      shadow-[0_8px_40px_rgba(0,113,227,0.25),0_2px_12px_rgba(0,0,0,0.15)]
                      backdrop-blur-xl"
                    >
                      {/* Close button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setBubbleOpen(false) }}
                        className="absolute top-2.5 right-3 text-[#aeaeb2]
                          hover:text-[#1c1c1e] dark:hover:text-white
                          text-lg leading-none transition-colors"
                      >×</button>

                      {/* Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-serif font-semibold text-[1rem]
                          text-[#1c1c1e] dark:text-[#f5f5f7]">
                          About Me
                        </span>
                        <span className="ml-auto text-[0.65rem] font-medium px-2 py-0.5 rounded-full
                          bg-[rgba(0,113,227,0.12)] text-[rgb(var(--accent-rgb))]">
                          AKC
                        </span>
                      </div>

                      <div className="h-px mb-3 bg-gradient-to-r from-transparent via-[rgba(0,113,227,0.3)] to-transparent" />

                      <p className="text-[0.82rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.7] font-light mb-2">
                        I'm a first-year IT student building my foundation in programming
                        and web development — learning Java, HTML, CSS, and JavaScript
                        through real projects.
                      </p>
                      <p className="text-[0.82rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.7] font-light">
                        Passionate about tech, aiming to become a computer engineer
                        and future entrepreneur.
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setBubbleOpen(false)
                          setTimeout(() => {
                            const el = document.getElementById('about')
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 80
                              window.scrollTo({ top: y, behavior: 'smooth' })
                            }
                          }, 300)
                        }}
                        className="mt-3 text-[0.75rem] font-semibold text-[rgb(var(--accent-rgb))]
                          hover:underline underline-offset-2 transition-all"
                      >
                        Read full About Me →
                      </button>

                      {/* Bubble tail pointing RIGHT toward the photo */}
                      <div className="bubble-tail-right" />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-glow-blob {
          position: absolute;
          width: 240px; height: 240px;
          top: 50px;
          left: ${PHOTO_L + PHOTO_W / 2 - 120}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,113,227,0.30) 0%, rgba(100,30,200,0.16) 55%, transparent 78%);
          filter: blur(24px);
          z-index: 1;
          animation: glowBreath 3s ease-in-out infinite;
        }
        .hero-glow-ring {
          position: absolute;
          width: 240px; height: 240px;
          top: 50px;
          left: ${PHOTO_L + PHOTO_W / 2 - 120}px;
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
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes glowRingPulse {
          0%, 100% { box-shadow: 0 0 0 1.5px rgba(0,113,227,0.45), 0 0 25px 8px rgba(0,113,227,0.35), 0 0 55px 18px rgba(0,113,227,0.18), 0 0 90px 28px rgba(120,40,200,0.12); }
          50%       { box-shadow: 0 0 0 2px rgba(0,113,227,0.8), 0 0 40px 14px rgba(0,113,227,0.55), 0 0 80px 28px rgba(0,113,227,0.28), 0 0 130px 45px rgba(120,40,200,0.2); }
        }
        /* Tail pointing RIGHT */
        .bubble-tail-right {
          position: absolute;
          top: 28px;
          right: -10px;
          width: 0; height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 11px solid rgba(255,255,255,0.9);
        }
        .dark .bubble-tail-right {
          border-left-color: rgba(18,18,24,0.95);
        }
      `}</style>
    </section>
  )
}
