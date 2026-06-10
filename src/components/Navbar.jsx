import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { sections, profile } from '../data/content.js'
import ThemeToggle from './ThemeToggle.jsx'
import Magnetic from './Magnetic.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const clickTimes = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const goTop = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Easter egg : 5 clics rapprochés sur le logo → pluie "matrix"
    const now = Date.now()
    clickTimes.current = [...clickTimes.current, now].filter((t) => now - t < 1500)
    if (clickTimes.current.length >= 5) {
      clickTimes.current = []
      window.dispatchEvent(new Event('triggermatrix'))
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Magnetic strength={0.4}>
          <button onClick={goTop} className="group flex items-center gap-2.5" aria-label="Retour en haut">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line font-mono text-sm font-bold text-copper transition-colors group-hover:border-copper-dim">
              VS
            </span>
            <span className="hidden font-mono text-xs tracking-widest text-muted sm:block">STOLL.V</span>
          </button>
        </Magnetic>

        <div className="hidden items-center gap-1 md:flex">
          {sections.slice(0, 3).map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className="px-3 py-2 font-mono text-xs tracking-wide text-muted transition-colors hover:text-fg"
            >
              <span className="text-faint">0{i + 1} /</span> {s.label}
            </button>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
          <Magnetic strength={0.3} className="ml-1">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-line px-3.5 py-2 font-mono text-xs tracking-wide text-fg transition-colors hover:border-copper-dim hover:text-copper"
            >
              Contact <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-fg"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(s.id)}
                  className="flex items-center gap-3 py-3 text-left font-mono text-sm text-muted transition-colors hover:text-fg"
                >
                  <span className="text-faint">0{i + 1}</span> {s.label}
                </button>
              ))}
              <a href={`mailto:${profile.email}`} className="mt-2 inline-flex items-center gap-1.5 font-mono text-sm text-copper">
                {profile.email} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
