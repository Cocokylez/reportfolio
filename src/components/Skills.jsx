import { motion } from 'framer-motion'

const SKILLS = [
  { icon: '🌐', name: 'HTML' }, { icon: '🎨', name: 'CSS' },
  { icon: '⚡', name: 'JavaScript' }, { icon: '☕', name: 'Java (Basics)' },
]

const blurIn = (delay = 0) => ({
  initial: { opacity: 0, filter: 'blur(12px)', y: 16, scale: 0.97 },
  whileInView: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
})

const breathe = (duration = 4) => ({
  animate: {
    scale: [1, 1.015, 1],
    transition: { duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
  },
})

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...blurIn(0)} className="section-label block">Skills</motion.span>
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map(({ icon, name }, i) => (
            <motion.div
              key={name}
              {...blurIn(0.1 + i * 0.08)}
              {...breathe(3.5 + i * 0.4)}
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
