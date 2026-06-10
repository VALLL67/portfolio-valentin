import { useEffect, useRef } from 'react'
import { motion, animate, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

// Carte interactive : halo cuivre/violet IDENTIQUE à celui du hero (suit le
// curseur, se recalcule au scroll, disparaît en fondu quand le curseur quitte
// la carte) + légère inclinaison 3D. Le `className` reçoit tout le style de la
// carte (bordure, fond, rayon, padding…) — ce composant EST la carte.
export default function SpotlightCard({ children, className = '', tilt = 7 }) {
  const ref = useRef(null)
  const lastPointer = useRef({ x: null, y: null })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const opacity = useMotionValue(0)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })

  const fade = (visible) =>
    animate(opacity, visible ? 1 : 0, { duration: 0.3, ease: 'easeOut' })

  // Recalcule position + visibilité depuis la dernière position du curseur.
  // Appelé au mousemove ET au scroll → comportement identique au hero.
  const apply = () => {
    const { x, y } = lastPointer.current
    if (x == null || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (x - r.left) / r.width
    const py = (y - r.top) / r.height
    const inside = px >= 0 && px <= 1 && py >= 0 && py <= 1
    if (inside) {
      mx.set(px * 100)
      my.set(py * 100)
      ry.set((px - 0.5) * tilt)
      rx.set(-(py - 0.5) * tilt)
      fade(true)
    } else {
      rx.set(0)
      ry.set(0)
      fade(false)
    }
  }

  const handleMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    lastPointer.current = { x: e.clientX, y: e.clientY }
    apply()
  }
  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
    fade(false)
  }

  useEffect(() => {
    const onScroll = () => apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const spotlight = useMotionTemplate`radial-gradient(540px circle at ${mx}% ${my}%, rgb(var(--copper) / var(--glow-strong)), rgb(var(--copper) / var(--glow-soft)) 35%, transparent 70%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`group/spot relative ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ background: spotlight, opacity }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
