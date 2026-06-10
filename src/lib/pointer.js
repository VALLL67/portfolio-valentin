// ─────────────────────────────────────────────────────────────────────────────
//  Suivi GLOBAL de la position du curseur.
//  Tous les halos (hero + cartes) lisent la même position courante, ce qui
//  garantit un placement correct au scroll même sur un élément qui n'a jamais
//  été survolé (fini le placement "aléatoire" issu de positions périmées).
// ─────────────────────────────────────────────────────────────────────────────

let _x = null
let _y = null
let started = false

function onMove(e) {
  _x = e.clientX
  _y = e.clientY
}

export function startPointerTracking() {
  if (started || typeof window === 'undefined') return
  started = true
  window.addEventListener('mousemove', onMove, { passive: true })
}

// Mise à jour immédiate depuis un évènement local (évite tout décalage d'un
// cran lié à l'ordre de propagation des écouteurs).
export function setPointer(x, y) {
  _x = x
  _y = y
}

export function getPointer() {
  return { x: _x, y: _y }
}
