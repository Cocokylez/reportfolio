import { motion } from 'framer-motion'

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'Java (Basics)', 'VS Code', 'Photoshop', 'PixelLab', 'Alight Motion']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">
          Skills
        </motion.span>
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2.5 mt-0">
          {SKILLS.map((name) => (
            <motion.div
              key={name}
              className="skill-pill"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="text-[0.9rem] font-medium text-[#1c1c1e] dark:text-[#f5f5f7]">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
