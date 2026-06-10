import { useEffect, useRef, useState } from 'react'

// Pluie de caractères facon "matrix", composée de jetons PowerShell/IT.
// Déclenchée par l'évènement window 'triggermatrix' (5 clics sur le logo ou
// commande `matrix` du terminal). S'arrête seule après ~6 s.
const GLYPHS = '01{}();=>$_|/\\GetSetForEachWriteHostnvqPSロランワン日本語ｱｲｳｴｵ'.split('')

export default function MatrixRain() {
  const [active, setActive] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const trigger = () => setActive(true)
    window.addEventListener('triggermatrix', trigger)
    return () => window.removeEventListener('triggermatrix', trigger)
  }, [])

  useEffect(() => {
    if (!active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let stopped = false

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const color = (getComputedStyle(document.documentElement).getPropertyValue('--copper') || '139 124 246').trim()
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array.from({ length: columns }, () => Math.random() * -50)

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      for (let i = 0; i < drops.length; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = `rgb(${color})`
        ctx.fillText(ch, x, y)
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      if (!stopped) raf = requestAnimationFrame(draw)
    }

    if (reduce) {
      // Sans animation : un simple flash bref
      ctx.fillStyle = `rgba(${color} / 0.15)`
    } else {
      draw()
    }

    const fadeTimer = setTimeout(() => {
      canvas.style.transition = 'opacity 0.8s ease'
      canvas.style.opacity = '0'
    }, 5200)
    const endTimer = setTimeout(() => {
      stopped = true
      setActive(false)
    }, 6000)

    return () => {
      stopped = true
      cancelAnimationFrame(raf)
      clearTimeout(fadeTimer)
      clearTimeout(endTimer)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[85]"
      style={{ opacity: 1 }}
    />
  )
}
