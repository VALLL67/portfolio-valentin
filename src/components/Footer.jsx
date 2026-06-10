import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowUp, Mail } from 'lucide-react'
import { profile } from '../data/content.js'
import Magnetic from './Magnetic.jsx'

export default function Footer() {
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative scroll-mt-20 border-t border-line">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">// Contact</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-fg sm:text-6xl">
            Construisons quelque chose de <span className="text-gradient-copper">solide</span>.
          </h2>

          <Magnetic strength={0.25} className="mt-8">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 font-mono text-lg text-muted transition-colors hover:text-copper sm:text-2xl"
            >
              <Mail className="h-5 w-5 text-copper" strokeWidth={1.6} />
              {profile.email}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Magnetic>
        </motion.div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-faint">
            <span>© {year} Valentin Stoll</span>
            <Link to="/mentions-legales" className="text-muted transition-colors hover:text-copper">
              Mentions légales
            </Link>
          </div>

          <button
            onClick={goTop}
            className="group inline-flex w-fit items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-copper"
            aria-label="Retour en haut"
          >
            Haut de page
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-line transition-colors group-hover:border-copper-dim">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
