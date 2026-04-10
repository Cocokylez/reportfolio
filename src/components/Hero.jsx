import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function Hero() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative z-10 pt-[120px] pb-[80px] px-0"
    >
      <div className="max-w-[680px] mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <motion.div {...fadeUp(0)} className="mb-6 flex flex-col items-center gap-4">
            <div className="avatar-glass overflow-hidden p-0">
              <img
                src="/pfp.jpg"
                alt="Adrian Kyle Condeza"
                className="w-full h-full object-cover object-top rounded-[35px]"
              />
            </div>

            {/* Status badge */}
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
            className="font-serif font-normal text-[clamp(2.2rem,6vw,3.4rem)]
              tracking-[-0.02em] leading-[1.15] mb-2.5
              text-[#1c1c1e] dark:text-[#f5f5f7]"
          >
            Adrian Kyle Condeza
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
              leading-[1.7] max-w-[440px] mb-8 italic"
          >
            Building skills in web development and programming, one project at a time.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.26)} className="flex gap-3 flex-wrap justify-center">
            <button className="btn-primary" onClick={() => scrollTo('#contact')}>
              Get in Touch
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('#about')}>
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
