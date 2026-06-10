import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

// Carte interactive : un halo cuivre suit le curseur et la carte s'incline
// légèrement en 3D (effet "tilt"). Le `className` reçoit tout le style de la
// carte (bordure, fond, rayon, padding…) — ce composant EST la carte.
export default function SpotlightCard({ children, className = '', tilt = 7 }) {
  const ref = useRef(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })

  const handleMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set(px * 100)
    my.set(py * 100)
    ry.set((px - 0.5) * tilt)
    rx.set(-(py - 0.5) * tilt)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
    mx.set(50)
    my.set(50)
  }

  const spotlight = useMotionTemplate`radial-gradient(540px circle at ${mx}% ${my}%, rgb(var(--copper) / var(--glow-strong)), rgb(var(--copper) / var(--glow-soft)) 35%, transparent 70%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`group/spot relative ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      />
      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
