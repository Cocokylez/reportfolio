import { useDarkMode }   from './hooks/useDarkMode'
import LoadingScreen     from './components/LoadingScreen'
import CustomCursor      from './components/CustomCursor'
import Navbar            from './components/Navbar'
import Hero              from './components/Hero'
import About             from './components/About'
import Skills            from './components/Skills'
import Projects          from './components/Projects'
import Certificates      from './components/Certificates'
import Contact           from './components/Contact'
import Footer            from './components/Footer'
import SectionDivider    from './components/SectionDivider'

export default function App() {
  const [isDark, toggleDark] = useDarkMode()

  return (
    <div
      className="min-h-screen bg-[#f2f2f7] dark:bg-[#0d0d0f]
        text-[#1c1c1e] dark:text-[#f5f5f7] font-sans
        transition-colors duration-500"
    >
      <LoadingScreen />
      <CustomCursor />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar isDark={isDark} toggleDark={toggleDark} />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Certificates />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
