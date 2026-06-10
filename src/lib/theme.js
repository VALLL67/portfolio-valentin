// ─────────────────────────────────────────────────────────────────────────────
//  Gestion centralisée des thèmes.
//  - thème de base : 'dark' | 'light'  (stocké dans localStorage 'theme')
//  - mode CRT       : surcouche on/off  (stocké dans localStorage 'crt')
//  Toute modif applique les classes sur <html> et émet l'évènement 'themechange'
//  pour que les composants (ex. le bouton de thème) se resynchronisent.
// ─────────────────────────────────────────────────────────────────────────────

export function getBaseTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function isCrt() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('crt') === '1'
}

export function applyTheme() {
  const root = document.documentElement
  const base = getBaseTheme()
  root.classList.remove('light', 'dark', 'crt')
  root.classList.add(base)
  if (isCrt()) root.classList.add('crt')

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    const color = isCrt() ? '#040a06' : base === 'light' ? '#F4F2EC' : '#0A0B0D'
    meta.setAttribute('content', color)
  }

  window.dispatchEvent(new Event('themechange'))
}

export function setBaseTheme(theme) {
  localStorage.setItem('theme', theme)
  applyTheme()
}

export function toggleBaseTheme() {
  setBaseTheme(getBaseTheme() === 'dark' ? 'light' : 'dark')
}

export function setCrt(on) {
  if (on) localStorage.setItem('crt', '1')
  else localStorage.removeItem('crt')
  applyTheme()
}

export function toggleCrt() {
  setCrt(!isCrt())
  return isCrt()
}
