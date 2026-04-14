import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home',     href: '#hero'     },
  { label: 'About',   href: '#about'    },
  { label: 'Skills',  href: '#skills'   },
  { label: 'Projects',href: '#projects' },
  { label: 'Contact', href: '#contact'  },
]

export default function Navbar({ isDark, toggleDark }) {
  const [visible,  setVisible]  = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // Nav appears after 60px scroll
      setVisible(y > 60)
      setScrolled(y > 120)
      // Active section tracking
      const sections = document.querySelectorAll('section[id]')
      let current = 'hero'
      sections.forEach((s) => {
        if (y >= s.offsetTop - 90) current = s.id
      })
      setActiveId(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (!target) return
    window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          id="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: -80, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          className={`fixed top-0 left-0 right-0 z-[1000] nav-glass
            ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.18)]' : ''}`}
        >
          <div className="max-w-[1100px] mx-auto px-8 h-[60px] flex items-center justify-between">
            {/* Brand */}
            <span className="nav-brand" onClick={() => scrollTo('#hero')}>AKC</span>

            {/* Desktop links */}
            <ul className="hidden md:flex gap-0.5">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`nav-link ${activeId === href.slice(1) ? 'active' : ''}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleDark}
                aria-label="Toggle theme"
                whileHover={{ scale: 1.15, rotate: 12 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[0.95rem]
                  bg-white/65 dark:bg-[rgba(28,28,30,0.75)]
                  border border-black/7 dark:border-white/8
                  backdrop-blur-md transition-colors"
              >
                {isDark ? '☀️' : '🌕'}
              </motion.button>

              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Menu"
                className={`hamburger md:hidden flex flex-col gap-[5px] bg-transparent border-none p-1 ${menuOpen ? 'open' : ''}`}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden flex flex-col px-6 pb-4 pt-2 gap-0.5
                  border-t border-black/7 dark:border-white/8"
              >
                {NAV_ITEMS.map(({ label, href }) => (
                  <button key={href} onClick={() => scrollTo(href)} className="mobile-link text-left">
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
