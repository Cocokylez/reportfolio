import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] },
})

// All chips positioned relative to the photo container (240×420px)
// Left edge = 0, right edge = 240, top = 0, bottom = 420
const skills = [
  // Above head
  { label: 'HTML',          x: -10,  y: -34 },
  { label: 'VS Code',       x: 82,   y: -50 },
  { label: 'CSS',           x: 178,  y: -34 },
  // Left shoulder
  { label: 'Photoshop',     x: -118, y: 60  },
  { label: 'PixelLab',      x: -108, y: 150 },
  { label: 'Alight Motion', x: -126, y: 240 },
  // Right shoulder
  { label: 'JavaScript',    x: 252,  y: 80  },
  { label: 'Java',          x: 258,  y: 170 },
]

export default function Hero() {
  const [hovered, setHovered]       = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative z-10 pt-[120px] pb-[80px]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">

          {/* ── LEFT ── */}
          <div className="flex-1 flex flex-col items-start text-left max-w-[480px]">
            <motion.h1 {...fadeUp(0)}
              className="font-serif font-normal text-[clamp(2.4rem,5vw,3.6rem)]
                tracking-[-0.02em] leading-[1.1] mb-3 text-[#1c1c1e] dark:text-[#f5f5f7]">
              Adrian Kyle<br />Condeza
            </motion.h1>

            <motion.p {...fadeUp(0.08)} className="text-base font-medium mb-4 text-[rgb(var(--accent-rgb))]">
              1st Year IT Student · Aspiring Computer Engineer
            </motion.p>

            <motion.div {...fadeUp(0.13)} className="mb-5">
              <div className="inline-flex items-center gap-[7px]
                bg-white/65 dark:bg-[rgba(28,28,30,0.75)]
                border border-black/7 dark:border-white/8
                px-3 py-[5px] rounded-full
                text-[0.78rem] font-medium text-[#48484a] dark:text-[#aeaeb2]">
                <span className="status-dot" />
                Open to opportunities
              </div>
            </motion.div>

            <motion.p {...fadeUp(0.18)}
              className="text-[1.05rem] text-[#48484a] dark:text-[#aeaeb2] font-light
                leading-[1.7] max-w-[420px] mb-8 italic">
              Building skills in web development and programming, one project at a time.
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="flex gap-3 flex-wrap">
              <button className="btn-primary" onClick={() => scrollTo('#contact')}>Get in Touch</button>
              <button className="btn-ghost"   onClick={() => scrollTo('#about')}>Learn More</button>
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ position: 'relative', width: '440px', height: '480px', flexShrink: 0 }}
          >
            {/* Skill chips — CSS animation only, no framer loops */}
            {skills.map((s, i) => (
              <div
                key={s.label}
                className="skill-chip"
                style={{
                  position: 'absolute',
                  left: 100 + s.x,   /* offset by 100 so photo center = 220 in 440px container */
                  top: 30 + s.y,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {s.label}
              </div>
            ))}

            {/* Glow — pure CSS, no JS animation */}
            <div className="hero-glow-blob" />
            <div className="hero-glow-ring" />

            {/* Photo — fixed size so hitbox matches visible image exactly */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                transform: 'translateX(-50%)',
                width: '240px',
                height: '420px',
                zIndex: 2,
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setBubbleOpen(v => !v)}
            >
              <img
                src="/pfp.png"
                alt="Adrian Kyle Condeza"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  background: 'transparent',
                  filter: 'drop-shadow(0 0 16px rgba(0,113,227,0.5))',
                  transition: 'transform 0.25s ease',
                  transform: hovered ? 'scale(1.02)' : 'scale(1)',
                  display: 'block',
                }}
              />

              {/* Tooltip — small, tight */}
              <AnimatePresence>
                {hovered && !bubbleOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 10,
                      pointerEvents: 'none',
                    }}
                    className="px-2.5 py-1 rounded-full text-[0.7rem] font-semibold
                      bg-[rgba(0,113,227,0.92)] text-white whitespace-nowrap
                      shadow-[0_2px_12px_rgba(0,113,227,0.4)]"
                  >
                    About Me
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Speech bubble */}
            <AnimatePresence>
              {bubbleOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setBubbleOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.2)' }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', right: '102%', top: '5%', width: '250px', zIndex: 50 }}
                  >
                    <div className="relative rounded-2xl px-5 py-4
                      bg-white/95 dark:bg-[rgba(18,18,24,0.97)]
                      border border-black/8 dark:border-white/10
                      shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                      <button
                        onClick={(e) => { e.stopPropagation(); setBubbleOpen(false) }}
                        className="absolute top-2.5 right-3 text-[#aeaeb2]
                          hover:text-[#1c1c1e] dark:hover:text-white text-lg leading-none"
                      >×</button>

                      <p className="font-serif font-semibold text-[0.95rem]
                        text-[#1c1c1e] dark:text-[#f5f5f7] mb-3">About Me</p>

                      <div className="h-px mb-3 bg-gradient-to-r from-transparent via-[rgba(0,113,227,0.3)] to-transparent" />

                      <p className="text-[0.82rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.7] font-light mb-2">
                        I'm a first-year IT student building my foundation in programming
                        and web development — learning Java, HTML, CSS, and JavaScript
                        through real projects.
                      </p>
                      <p className="text-[0.82rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.7] font-light">
                        Passionate about tech, aiming to become a computer engineer and future entrepreneur.
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation(); setBubbleOpen(false)
                          setTimeout(() => {
                            const el = document.getElementById('about')
                            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
                          }, 250)
                        }}
                        className="mt-3 text-[0.75rem] font-semibold text-[rgb(var(--accent-rgb))] hover:underline"
                      >
                        Read full About Me →
                      </button>
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
        /* Chips — pure CSS float, no JS loops */
        .skill-chip {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 0.68rem;
          font-weight: 600;
          color: #1c1c1e;
          white-space: nowrap;
          cursor: default;
          user-select: none;
          box-shadow: 0 3px 16px rgba(0,0,0,0.18);
          animation: chipFloat 3s ease-in-out infinite;
          z-index: 3;
        }
        .dark .skill-chip {
          background: rgba(20,20,28,0.90);
          border-color: rgba(255,255,255,0.1);
          color: #f0f0f5;
        }
        @keyframes chipFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-7px); }
        }

        /* Glow */
        .hero-glow-blob {
          position: absolute;
          width: 220px; height: 220px;
          top: 70px; left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,113,227,0.28) 0%, rgba(100,30,200,0.14) 55%, transparent 78%);
          filter: blur(22px);
          z-index: 1;
          animation: glowBreath 3s ease-in-out infinite;
        }
        .hero-glow-ring {
          position: absolute;
          width: 220px; height: 220px;
          top: 70px; left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          z-index: 1;
          box-shadow:
            0 0 0 1.5px rgba(0,113,227,0.4),
            0 0 22px 6px rgba(0,113,227,0.3),
            0 0 50px 16px rgba(0,113,227,0.15),
            0 0 80px 24px rgba(120,40,200,0.10);
          animation: glowRingPulse 3s ease-in-out infinite;
        }
        @keyframes glowBreath {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;  transform: translateX(-50%) scale(1.1); }
        }
        @keyframes glowRingPulse {
          0%, 100% { box-shadow: 0 0 0 1.5px rgba(0,113,227,0.4), 0 0 22px 6px rgba(0,113,227,0.3), 0 0 50px 16px rgba(0,113,227,0.15), 0 0 80px 24px rgba(120,40,200,0.10); }
          50%       { box-shadow: 0 0 0 2px rgba(0,113,227,0.75), 0 0 35px 12px rgba(0,113,227,0.45), 0 0 70px 24px rgba(0,113,227,0.22), 0 0 120px 40px rgba(120,40,200,0.16); }
        }

        /* Bubble tail */
        .bubble-tail-right {
          position: absolute;
          top: 26px; right: -10px;
          width: 0; height: 0;
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          border-left: 10px solid rgba(255,255,255,0.95);
        }
        .dark .bubble-tail-right { border-left-color: rgba(18,18,24,0.97); }
      `}</style>
    </section>
  )
}
