import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ScrollText } from 'lucide-react'
import { legal, profile } from '../data/content.js'

const blocks = [
  { n: '01', title: 'Éditeur du site', body: legal.editor },
  { n: '02', title: 'Hébergeur', body: legal.host },
  { n: '03', title: 'Propriété intellectuelle', body: legal.ip },
  { n: '04', title: 'Données personnelles et cookies', body: legal.data },
]

export default function MentionsLegales() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-grid mask-radial pointer-events-none fixed inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-copper"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour à l’accueil
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 border-b border-line pb-8"
        >
          <span className="eyebrow flex items-center gap-2">
            <ScrollText className="h-4 w-4" strokeWidth={1.6} />
            // Informations légales
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            Mentions légales
          </h1>
        </motion.header>

        <div className="mt-12 space-y-10">
          {blocks.map((b, i) => (
            <motion.section
              key={b.n}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-copper">{b.n}</span>
                <h2 className="font-display text-xl font-semibold tracking-tight text-fg">
                  {b.title}
                </h2>
              </div>
              <p className="mt-3 pl-9 leading-relaxed text-muted">{b.body}</p>
            </motion.section>
          ))}
        </div>

        <footer className="mt-16 border-t border-line pt-8 font-mono text-xs text-faint">
          © {new Date().getFullYear()} Valentin Stoll · {profile.email}
        </footer>
      </div>
    </div>
  )
}
