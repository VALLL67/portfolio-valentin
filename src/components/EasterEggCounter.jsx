import { useEffect, useState } from 'react'
import { getProgress } from '../lib/easterEggs.js'

export default function EasterEggCounter() {
  const [{ found, total }, setProgress] = useState({ found: 0, total: 0 })

  useEffect(() => {
    const sync = () => setProgress(getProgress())
    sync()
    window.addEventListener('eggschange', sync)
    return () => window.removeEventListener('eggschange', sync)
  }, [])

  if (total === 0) return null
  const done = found === total

  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-xs text-faint"
      title="Des easter eggs sont cachés sur le site — à toi de les trouver"
    >
      <span className="flex gap-1" aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i < found ? 'bg-copper' : 'bg-line'
            }`}
          />
        ))}
      </span>
      {done ? 'easter eggs : tous trouvés !' : `${found}/${total} easter eggs trouvés`}
    </span>
  )
}
