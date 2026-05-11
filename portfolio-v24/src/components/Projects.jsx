import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const fadeUp = (delay=0) => ({ initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:false,margin:'-30px'}, transition:{duration:0.65,delay,ease:[0.4,0,0.2,1]} })

export default function Projects() {
  const progress = 35

  return (
    <section id="projects" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">Projects</motion.span>
        <motion.div {...fadeUp(0.1)}>
          <TiltCard className="glass-card flex flex-col items-start text-left py-12 px-9">
            <span className="section-label mb-4">Unfinished</span>
            <h3 className="font-serif font-normal text-3xl mb-3" style={{color:'#ccc'}}>FitSched</h3>
            <p className="text-[0.95rem] leading-[1.7] font-light mb-8 max-w-[440px]" style={{color:'#777'}}>
              A fitness scheduling project currently in progress, built to help organize workouts and training plans.
            </p>

            <div className="w-full mb-7">
              <div className="flex items-center justify-between mb-2 text-[0.78rem] uppercase tracking-[0.18em]" style={{color:'#777'}}>
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full" style={{background:'rgba(255,255,255,0.08)'}}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:'linear-gradient(90deg, #d6d6d6, #8a8a8a)'
                  }}
                />
              </div>
            </div>

            <a
              href="https://fitsched.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.86rem] uppercase tracking-[0.18em] transition-colors hover:text-white"
              style={{color:'#aaa'}}
            >
              View Live App
            </a>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
