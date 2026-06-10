import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import { education } from '../data/content.js'

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24 sm:py-32">
      <SectionHeading index="03" eyebrow="// Diplômes & compétences" title="Formation" />

      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((ed, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpotlightCard className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-copper-dim">
              <span className="absolute inset-x-0 top-0 z-10 h-px scale-x-0 bg-gradient-to-r from-transparent via-copper to-transparent transition-transform duration-500 group-hover/spot:scale-x-100" />

              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs tracking-wide text-copper">{ed.period}</span>
                <span className="rounded border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                  {ed.level}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-copper" strokeWidth={1.6} />
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-fg">{ed.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{ed.school}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 pt-4">
                {ed.skills.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
