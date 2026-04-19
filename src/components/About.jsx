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
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
  },
}

export default function About() {
  return (
    <section id="about" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.div {...blurIn(0)} {...breathe} className="glass-card">
          <span className="section-label">About Me</span>
          <p className="text-[1.02rem] leading-[1.78] font-light" style={{ color: '#666' }}>
            I am a first-year Information Technology student currently building my foundation in
            programming and web development. I have learned the basics of Java, HTML, CSS, and
            JavaScript, and I am continuously improving my skills through practice and projects.
          </p>
          <p className="mt-3.5 text-[1.02rem] leading-[1.78] font-light" style={{ color: '#666' }}>
            I am passionate about technology and aim to become a computer engineer and future
            entrepreneur. I focus on learning, consistency, and developing real-world skills.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
