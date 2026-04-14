import { useDarkMode }   from './hooks/useDarkMode'
import LoadingScreen     from './components/LoadingScreen'
import CustomCursor      from './components/CustomCursor'
import CursorBackground  from './components/CursorBackground'
import Navbar            from './components/Navbar'
import Hero              from './components/Hero'
import About             from './components/About'
import Skills            from './components/Skills'
import Projects          from './components/Projects'
import Certificates      from './components/Certificates'
import Contact           from './components/Contact'
import Footer            from './components/Footer'

export default function App() {
  const [isDark, toggleDark] = useDarkMode()

  return (
    <div
      className="min-h-screen bg-[#f2f2f7] dark:bg-[#1a1a1a]
        text-[#1c1c1e] dark:text-[#f5f5f7] font-sans
        transition-colors duration-500"
    >
      <LoadingScreen />
      <CustomCursor />
      <CursorBackground />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <Navbar isDark={isDark} toggleDark={toggleDark} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
