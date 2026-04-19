import { motion } from 'framer-motion'

const flip = (delay = 0) => ({
  initial: { opacity: 0, rotateX: 60, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-[100px]" style={{ perspective: '1200px' }}>
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...flip(0)} style={{ transformOrigin: 'top center', display: 'block' }} className="section-label block">
          Projects
        </motion.span>
        <motion.div {...flip(0.1)} style={{ transformOrigin: 'top center' }} className="glass-card flex flex-col items-center text-center py-12 px-9">
          <span className="text-[2.5rem] mb-3.5">🚧</span>
          <h3 className="font-serif font-normal text-2xl mb-2.5" style={{ color: '#ccc' }}>Coming Soon</h3>
          <p className="text-[0.95rem] leading-[1.7] font-light max-w-[340px]" style={{ color: '#555' }}>
            Currently working on personal projects to apply and improve my skills. Check back soon!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
