import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function Certificates() {
  return (
    <section id="certificates" className="relative z-10 py-[100px]" style={{borderTop: "3px solid transparent", borderImage: "linear-gradient(90deg, transparent, #8b5cf6, #a78bfa, #8b5cf6, transparent) 1"}}> 
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">
          Certificates
        </motion.span>
        <motion.div
          {...fadeUp(0.1)}
          className="glass-card flex flex-col items-center text-center py-12 px-9"
        >
          <span className="text-[2.5rem] mb-3.5">🎓</span>
          <h3 className="font-serif font-normal text-2xl text-[#1c1c1e] dark:text-[#f5f5f7] mb-2.5">
            Coming Soon
          </h3>
          <p className="text-[0.95rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.7] font-light max-w-[340px]">
            Actively learning and planning to earn certifications in programming and IT.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
