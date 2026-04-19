import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, rotateX: 40, y: 20 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '800px', transformOrigin: 'top center', color: '#333', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      className="relative z-10 text-center py-7 text-[0.8rem]"
    >
      © {new Date().getFullYear()} Adrian Kyle Condeza · Built with care
    </motion.footer>
  )
}
