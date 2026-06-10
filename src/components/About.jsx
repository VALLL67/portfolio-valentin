import { motion } from 'framer-motion'
import { Car, Watch, Dumbbell } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { profile, interests } from '../data/content.js'

const iconMap = { Car, Watch, Dumbbell }

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHeading index="01" eyebrow="// À propos" title="Qui suis-je ?" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-balance text-xl leading-relaxed text-fg sm:text-2xl">
            {profile.bio}
          </p>
          <p className="text-balance text-lg leading-relaxed text-muted">
            {profile.bioPersonal}
          </p>
        </motion.div>

        {/* Panneau "intérêts" façon fiche technique */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="panel p-6"
        >
          <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              // Centres d’intérêt
            </span>
            <span className="font-mono text-[11px] text-copper">03</span>
          </div>

          <ul className="space-y-1">
            {interests.map((it, i) => {
              const Icon = iconMap[it.icon]
              return (
                <motion.li
                  key={it.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="group flex items-start gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-line hover:bg-surface-2/50"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-copper transition-colors group-hover:border-copper-dim">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold text-fg">
                      {it.label}
                    </span>
                    <span className="block text-sm text-muted">{it.note}</span>
                  </span>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
