import { motion } from 'framer-motion'

const blurIn = (delay = 0) => ({
  initial: { opacity: 0, filter: 'blur(12px)', y: 16, scale: 0.97 },
  whileInView: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
})

const breathe = {
  animate: {
    scale: [1, 1.012, 1],
    transition: { duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
  },
}

export default function Certificates() {
  return (
    <section id="certificates" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...blurIn(0)} className="section-label block">Certificates</motion.span>
        <motion.div {...blurIn(0.1)} {...breathe} className="glass-card flex flex-col items-center text-center py-12 px-9">
          <span className="text-[2.5rem] mb-3.5">🎓</span>
          <h3 className="font-serif font-normal text-2xl mb-2.5" style={{ color: '#ccc' }}>Coming Soon</h3>
          <p className="text-[0.95rem] leading-[1.7] font-light max-w-[340px]" style={{ color: '#555' }}>
            Actively learning and planning to earn certifications in programming and IT.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
