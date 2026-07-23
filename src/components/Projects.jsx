import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const fadeUp = (delay=0) => ({ initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:false,margin:'-30px'}, transition:{duration:0.65,delay,ease:[0.4,0,0.2,1]} })

const projects = [
  {
    name: 'FitSched',
    status: 'Ready to Publish',
    progress: 99,
    description: 'An AI-powered workout scheduler that syncs with Google Calendar to fit training into available time.',
    note: 'Remaining steps: fund the custom domain and FitToken rollout, complete Google Play registration, and finish the final security audit.',
    href: 'https://fitsched.vercel.app/',
  },
  {
    name: 'Huely',
    status: 'In Progress',
    progress: 50,
    description: 'Turns a photo into a practical painting reference with an oil-paint preview, extracted palette, paint-by-numbers guide, and realistic color mixer.',
    note: 'The core studio is working while accounts, saved history, and the finishing experience continue to take shape.',
    href: 'https://huely.vercel.app/',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-[100px]">
      <div className="max-w-[1040px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">Projects</motion.span>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div key={project.name} {...fadeUp(0.1 + index * 0.08)}>
              <TiltCard className="glass-card flex min-h-[440px] flex-col items-start text-left py-12 px-9">
                <span className="section-label mb-4">{project.status}</span>
                <h3 className="font-serif font-normal text-3xl mb-3" style={{color:'#ccc'}}>{project.name}</h3>
                <p className="text-[0.95rem] leading-[1.7] font-light max-w-[440px]" style={{color:'#777'}}>
                  {project.description}
                </p>
                <p className="mt-4 text-[0.78rem] leading-[1.65] font-light max-w-[440px]" style={{color:'#555'}}>
                  {project.note}
                </p>

                <div className="w-full mt-auto mb-7 pt-8">
                  <div className="flex items-center justify-between mb-2 text-[0.78rem] uppercase tracking-[0.18em]" style={{color:'#777'}}>
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{background:'rgba(255,255,255,0.08)'}}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${project.progress}%`,
                        background:'linear-gradient(90deg, #d6d6d6, #8a8a8a)'
                      }}
                    />
                  </div>
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.86rem] uppercase tracking-[0.18em] transition-colors hover:text-white"
                  style={{color:'#aaa'}}
                >
                  View Live App
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
