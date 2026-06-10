import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Magnetic from './Magnetic.jsx'
import { profile } from '../data/content.js'

// Compteur "uptime" depuis l'arrivée chez SEW (sept. 2022) — clin d'œil au monitoring.
function useUptime() {
  const [str, setStr] = useState('')
  useEffect(() => {
    const start = new Date('2022-09-01T00:00:00')
    const tick = () => {
      const diff = Date.now() - start.getTime()
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setStr(`${d}d ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return str
}

const reveal = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.12 },
  }),
}

export default function Hero() {
  const uptime = useUptime()
  const sectionRef = useRef(null)

  // Lueur violette qui suit le curseur dans le hero
  const gx = useMotionValue(0.5)
  const gy = useMotionValue(0.4)
  const lastPointer = useRef({ x: null, y: null })
  const glow = useMotionTemplate`radial-gradient(540px circle at ${useTransform(gx, (v) => v * 100)}% ${useTransform(gy, (v) => v * 100)}%, rgb(var(--copper) / var(--glow-strong)), rgb(var(--copper) / var(--glow-soft)) 35%, transparent 70%)`

  // Recalcule la position du halo à partir de la dernière position connue du
  // curseur — utilisé au mousemove ET au scroll, pour que le halo reste collé
  // au curseur même quand on défile sans bouger la souris.
  const updateGlow = () => {
    const { x, y } = lastPointer.current
    if (x == null || !sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    gx.set((x - r.left) / r.width)
    gy.set((y - r.top) / r.height)
  }

  const handleMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    lastPointer.current = { x: e.clientX, y: e.clientY }
    updateGlow()
  }

  useEffect(() => {
    const onScroll = () => updateGlow()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Parallaxe du bezel + fondu du contenu au scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bezelY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const bezelScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Easter egg #8 : double-clic sur le cadran → fige et affiche l'heure réelle
  const [clockMode, setClockMode] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    if (!clockMode) return
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    const t = setTimeout(() => setClockMode(false), 6500)
    return () => {
      clearInterval(id)
      clearTimeout(t)
    }
  }, [clockMode])
  const sec = now.getSeconds()
  const minu = now.getMinutes()
  const hr = now.getHours()
  const secDeg = sec * 6
  const minDeg = minu * 6 + sec * 0.1
  const hrDeg = (hr % 12) * 30 + minu * 0.5

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Grille technique */}
      <div className="absolute inset-0 bg-grid mask-radial animate-grid-drift" aria-hidden />

      {/* Lueur interactive */}
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 animate-glow-pulse" aria-hidden />

      {/* Bezel rotatif + parallaxe (double-clic = mode horloge) */}
      <motion.div
        style={{ y: bezelY, scale: bezelScale }}
        onDoubleClick={() => setClockMode(true)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto select-none"
        aria-hidden
      >
        <svg className="h-[min(86vmin,680px)] w-[min(86vmin,680px)] opacity-60" viewBox="0 0 800 800" fill="none">
          <g className={clockMode ? 'origin-center' : 'origin-center animate-spin-slower'}>
            <circle cx="400" cy="400" r="360" className="stroke-line" strokeWidth="1" />
            {Array.from({ length: 120 }).map((_, i) => {
              const major = i % 10 === 0
              return (
                <line
                  key={i}
                  x1="400"
                  y1={major ? 28 : 36}
                  x2="400"
                  y2="44"
                  className={major ? 'stroke-copper' : 'stroke-faint'}
                  strokeWidth={major ? 1.5 : 1}
                  transform={`rotate(${i * 3} 400 400)`}
                  opacity={major ? 0.7 : 0.4}
                />
              )
            })}
          </g>
          <g className={clockMode ? 'origin-center' : 'origin-center animate-spin-reverse'}>
            <circle cx="400" cy="400" r="300" className="stroke-line" strokeWidth="1" strokeDasharray="2 8" />
          </g>
          <circle cx="400" cy="400" r="230" className="stroke-surface-2" strokeWidth="1" />

          {/* Aiguilles (mode horloge) */}
          {clockMode && (
            <g style={{ opacity: 1 }}>
              <line x1="400" y1="400" x2="400" y2="290" className="stroke-fg" strokeWidth="6" strokeLinecap="round" transform={`rotate(${hrDeg} 400 400)`} />
              <line x1="400" y1="400" x2="400" y2="230" className="stroke-fg" strokeWidth="4" strokeLinecap="round" transform={`rotate(${minDeg} 400 400)`} />
              <line x1="400" y1="415" x2="400" y2="210" className="stroke-copper" strokeWidth="2" strokeLinecap="round" transform={`rotate(${secDeg} 400 400)`} />
              <circle cx="400" cy="400" r="9" className="fill-copper" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Contenu */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="eyebrow">// Systems &amp; Infrastructure Engineering</span>
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            EN APPRENTISSAGE · UPTIME {uptime}
          </span>
        </motion.div>

        <h1 className="font-display font-bold leading-[0.86] tracking-tightest">
          <span className="block overflow-hidden">
            <motion.span variants={reveal} initial="hidden" animate="show" custom={0} className="block text-[clamp(3rem,13vw,11rem)] text-fg">
              {profile.firstName}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={reveal} initial="hidden" animate="show" custom={1} className="block text-[clamp(3rem,13vw,11rem)] text-gradient-copper">
              {profile.lastName}
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-8 flex max-w-xl items-start gap-4"
        >
          <span className="mt-2.5 hidden h-px w-12 shrink-0 bg-copper-dim sm:block" />
          <p className="text-lg text-muted sm:text-xl">{profile.title}</p>
        </motion.div>
      </motion.div>

      {/* Indice de scroll (magnétique) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <Magnetic strength={0.5}>
          <button
            onClick={scrollToAbout}
            className="group flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-faint transition-colors hover:text-copper"
            aria-label="Défiler vers la section À propos"
          >
            Défiler
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </button>
        </Magnetic>
      </motion.div>
    </section>
  )
}
