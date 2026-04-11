import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function About() {
  return (
    <section id="about" className="relative z-10 py-[100px]" style={{borderTop: "3px solid transparent", borderImage: "linear-gradient(90deg, transparent, #f59e0b, #fbbf24, #f59e0b, transparent) 1"}}> 
      <div className="max-w-[680px] mx-auto px-6">
        <motion.div {...fadeUp(0)} className="glass-card">
          <span className="section-label">About Me</span>
          <p className="text-[1.02rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.78] font-light">
            I am a first-year Information Technology student currently building my foundation in
            programming and web development. I have learned the basics of Java, HTML, CSS, and
            JavaScript, and I am continuously improving my skills through practice and projects.
          </p>
          <p className="mt-3.5 text-[1.02rem] text-[#48484a] dark:text-[#aeaeb2] leading-[1.78] font-light">
            I am passionate about technology and aim to become a computer engineer and future
            entrepreneur. I focus on learning, consistency, and developing real-world skills.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
