import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalSquare, X } from 'lucide-react'
import { profile } from '../data/content.js'
import { setBaseTheme, toggleCrt } from '../lib/theme.js'
import { markFound, getProgress } from '../lib/easterEggs.js'

const PROMPT = 'visitor@valcloud:~$'

function uptimeStr() {
  const diff = Date.now() - new Date('2022-09-01T00:00:00').getTime()
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return `${d}d ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const BANNER = [
  '─────────────────────────────────────────────',
  '    valcloud.fr — console interactive       ',
  '  Tape "help" pour la liste des commandes ',
  '─────────────────────────────────────────────',
]

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState(() => BANNER.map((t) => ({ type: 'sys', text: t })))
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  // Ouverture/fermeture avec la touche "²" (ou Échap pour fermer)
  useEffect(() => {
    const onKey = (e) => {
      const typing =
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName)
      if ((e.key === '²' || e.code === 'Backquote') && !typing) {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      markFound('terminal')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, open])

  const print = (text, type = 'out') => setLines((l) => [...l, { type, text }])
  const printMany = (arr, type = 'out') =>
    setLines((l) => [...l, ...arr.map((text) => ({ type, text }))])

  const run = (raw) => {
    const cmd = raw.trim()
    print(`${PROMPT} ${cmd}`, 'cmd')
    if (!cmd) return
    const [name, ...args] = cmd.split(/\s+/)

    switch (name.toLowerCase()) {
      case 'help':
        printMany([
          'Commandes disponibles :',
          '  help              cette aide',
          '  whoami            qui est Valentin Stoll',
          '  uptime            temps depuis l’arrivée chez SEW',
          '  skills            compétences principales',
          '  contact           adresse e-mail',
          '  ls                lister les "sections"',
          '  theme dark|light  changer de thème',
          '  crt               (dés)activer le mode CRT secret',
          '  matrix            lancer la pluie de code',
          '  eggs              ta progression easter eggs',
          '  clear             nettoyer la console',
          '  exit              fermer le terminal',
        ])
        break
      case 'whoami':
        printMany([
          'valentin stoll',
          `  rôle    : ${profile.title}`,
          '  société : SEW Usocome (apprentissage)',
          '  école   : IRIS Mediaschool — BAC+5 (fin sept. 2027)',
        ])
        break
      case 'uptime':
        print(`up ${uptimeStr()}  ·  apprentissage chez SEW Usocome`)
        break
      case 'skills':
        printMany([
          'PowerShell · Automatisation · IoT / LoRaWAN',
          'Grafana · Zabbix · Docker & Swarm · Proxmox',
          'Veeam · n8n · Hardening AD · Windows/Linux Server',
        ])
        break
      case 'contact':
        print(`mailto: ${profile.email}`)
        window.location.href = `mailto:${profile.email}`
        break
      case 'ls':
        printMany([
          'about.md        experiences/    education/',
          'mentions.md     secrets/        cv.lock',
        ])
        break
      case 'cat':
        if (args[0] === 'secrets/' || args[0] === 'secrets')
          print('astuce : essaie "crt" et "matrix" 😉')
        else print(`cat: ${args[0] || ''}: fichier introuvable`)
        break
      case 'theme':
        if (args[0] === 'dark' || args[0] === 'light') {
          setBaseTheme(args[0])
          print(`thème → ${args[0]}`)
        } else {
          print('usage : theme dark | theme light')
        }
        break
      case 'crt': {
        const on = toggleCrt()
        if (on) markFound('crt')
        print(on ? 'mode CRT activé — phosphores chauds 🟢' : 'mode CRT désactivé')
        break
      }
      case 'eggs': {
        const { found, total } = getProgress()
        print(`easter eggs trouvés : ${found}/${total}`)
        break
      }
      case 'matrix':
        window.dispatchEvent(new Event('triggermatrix'))
        print('wake up... 🐇')
        break
      case 'sudo':
        print('nice try. tu n’as pas les droits ici 🙂')
        break
      case 'clear':
        setLines([])
        break
      case 'exit':
      case 'close':
        setOpen(false)
        break
      default:
        print(`commande introuvable : ${name} — tape "help"`)
    }
  }

  const onSubmit = (e) => {
    if (e.key !== 'Enter') return
    const value = input
    if (value.trim()) {
      setHistory((h) => [...h, value])
      setHistIdx(-1)
    }
    run(value)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(idx)
        setInput(history[idx])
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '100%', opacity: 0.6 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0.4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90] mx-auto max-w-3xl px-3 pb-3"
        >
          <div className="overflow-hidden rounded-xl border border-line bg-ink/95 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="flex items-center gap-2 font-mono text-xs text-muted">
                <TerminalSquare className="h-3.5 w-3.5 text-copper" strokeWidth={1.7} />
                {PROMPT}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-faint transition-colors hover:text-copper"
                aria-label="Fermer le terminal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.type === 'cmd'
                      ? 'text-fg'
                      : l.type === 'sys'
                        ? 'text-copper'
                        : 'text-muted'
                  }
                >
                  {l.text}
                </div>
              ))}

              <div className="flex items-center gap-2 text-fg">
                <span className="shrink-0 text-copper">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    onKeyDown(e)
                    onSubmit(e)
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent font-mono text-[13px] text-fg outline-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
