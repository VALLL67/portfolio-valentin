import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Power } from 'lucide-react'
import { getBaseTheme, isCrt, toggleBaseTheme, setCrt, applyTheme } from '../lib/theme.js'

export default function ThemeToggle({ className = '' }) {
  const [base, setBase] = useState(getBaseTheme)
  const [crt, setCrtState] = useState(isCrt)

  useEffect(() => {
    applyTheme() // garantit la cohérence des classes au montage
    const sync = () => {
      setBase(getBaseTheme())
      setCrtState(isCrt())
    }
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  const handleClick = () => {
    if (crt) setCrt(false) // en mode CRT, le bouton ramène au thème normal
    else toggleBaseTheme()
  }

  const label = crt
    ? 'Quitter le mode CRT'
    : base === 'dark'
      ? 'Activer le mode clair'
      : 'Activer le mode sombre'
  const iconKey = crt ? 'crt' : base
  const Icon = crt ? Power : base === 'dark' ? Moon : Sun

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-line text-fg transition-colors hover:border-copper-dim hover:text-copper ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={iconKey}
          initial={{ y: -18, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 18, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
        >
          <Icon className="h-4 w-4" strokeWidth={1.7} />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
