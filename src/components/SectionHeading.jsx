import { motion } from 'framer-motion'

export default function SectionHeading({ index, eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-5"
    >
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {title}
        </h2>
      </div>
      <span className="shrink-0 font-mono text-sm text-faint">{index}</span>
    </motion.div>
  )
}
