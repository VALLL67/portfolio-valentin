import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import { experiences, company } from '../data/content.js'

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHeading index="02" eyebrow="// Parcours professionnel" title="Expériences" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface/50 px-5 py-4"
      >
        <span className="font-display text-lg font-semibold tracking-tight text-fg">{company.name}</span>
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-copper" strokeWidth={1.6} />
          {company.location}
        </span>
      </motion.div>

      <div className="relative pl-8 sm:pl-12">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-copper-dim via-line to-transparent sm:left-[11px]" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <span
                className={`absolute -left-8 top-1.5 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 transition-all sm:-left-12 ${
                  exp.current ? 'border-copper bg-copper' : 'border-line bg-ink group-hover:border-copper-dim'
                }`}
              >
                {exp.current && <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-copper opacity-50" />}
              </span>

              <SpotlightCard className="rounded-xl border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-copper-dim">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs tracking-wide text-copper">{exp.period}</span>
                  {exp.current && (
                    <span className="rounded-full border border-copper-dim px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-copper-soft">
                      En poste
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight text-fg">{exp.role}</h3>
                <p className="mt-2 text-sm text-muted">{exp.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {exp.missions.map((m, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper-dim" />
                      {m}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
