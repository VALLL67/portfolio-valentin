// ─────────────────────────────────────────────────────────────────────────────
//  Registre des easter eggs + suivi de progression (persisté localStorage).
//
//  ➜ POUR EN AJOUTER UN PLUS TARD, 2 étapes seulement :
//     1) ajoute son identifiant dans le tableau EGGS ci-dessous ;
//     2) appelle markFound('mon-id') à l'endroit du code qui le déclenche.
//  Le total « X / N » affiché dans le footer se met à jour automatiquement.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'eggs-found'

// La SEULE liste à modifier pour changer le nombre d'easter eggs.
export const EGGS = ['terminal', 'crt', 'matrix', 'clock']

function read() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function markFound(id) {
  if (!EGGS.includes(id)) return
  const found = read()
  if (found.includes(id)) return
  found.push(id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  } catch {
    /* stockage indisponible : on ignore */
  }
  window.dispatchEvent(new Event('eggschange'))
}

export function getProgress() {
  const found = read().filter((id) => EGGS.includes(id))
  return { found: found.length, total: EGGS.length }
}

export function resetEggs() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event('eggschange'))
}
