import { motion } from 'framer-motion'

const SKILLS = [
  { icon: '🌐', name: 'HTML' }, { icon: '🎨', name: 'CSS' },
  { icon: '⚡', name: 'JavaScript' }, { icon: '☕', name: 'Java (Basics)' },
]

const flip = (delay = 0) => ({
  initial: { opacity: 0, rotateX: 60, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-[100px]" style={{ perspective: '1200px' }}>
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...flip(0)} style={{ transformOrigin: 'top center', display: 'block' }} className="section-label block">
          Skills
        </motion.span>
        <div className="flex flex-wrap gap-2.5" style={{ perspective: '800px' }}>
          {SKILLS.map(({ icon, name }, i) => (
            <motion.div
              key={name}
              {...flip(0.08 * i + 0.1)}
              style={{ transformOrigin: 'top center' }}
              className="skill-pill"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="text-[1.1rem]">{icon}</span>
              <span className="text-[0.9rem] font-medium" style={{ color: '#aaa' }}>{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
