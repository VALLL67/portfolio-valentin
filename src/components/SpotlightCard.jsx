import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { startPointerTracking, getPointer, setPointer } from '../lib/pointer.js'

// Carte interactive : halo cuivre/violet IDENTIQUE à celui du hero (suit le
// curseur, se recalcule au scroll, disparaît en fondu quand le curseur quitte
// la carte) + légère inclinaison 3D. Le `className` reçoit tout le style de la
// carte (bordure, fond, rayon, padding…) — ce composant EST la carte.
export default function SpotlightCard({ children, className = '', tilt = 7 }) {
  const ref = useRef(null)
  // Vrai uniquement avec une vraie souris → pas de halo/inclinaison sur tactile
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
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
    const { x, y } = getPointer()
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
    setPointer(e.clientX, e.clientY)
    apply()
  }
  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
    fade(false)
  }

  useEffect(() => {
    if (!fine) return // pas de halo ni d'inclinaison sur tactile (mobile/tablette)
    startPointerTracking()
    let raf = null
    let idle = null
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }
    const loop = () => {
      apply()
      raf = requestAnimationFrame(loop)
    }
    const onScroll = () => {
      if (!raf) loop()
      clearTimeout(idle)
      idle = setTimeout(() => {
        apply()
        stop()
      }, 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', apply)
      clearTimeout(idle)
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const spotlight = useMotionTemplate`radial-gradient(540px circle at ${mx}% ${my}%, rgb(var(--copper) / var(--glow-strong)), rgb(var(--copper) / var(--glow-soft)) 35%, transparent 70%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={fine ? handleMove : undefined}
      onMouseLeave={fine ? handleLeave : undefined}
      style={fine ? { rotateX: srx, rotateY: sry, transformPerspective: 1000 } : undefined}
      className={`group/spot relative ${className}`}
    >
      {fine && (
        <motion.span
          aria-hidden
          style={{ background: spotlight, opacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
      <div className="relative" style={fine ? { transform: 'translateZ(40px)' } : undefined}>
        {children}
      </div>
    </motion.div>
  )
}
