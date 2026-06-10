import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIG GITHUB PAGES
//
//  base: './'  → chemins RELATIFS. C'est le réglage le plus robuste : il fonctionne
//  quel que soit le nom de ton dépôt, sans rien modifier, et il est parfaitement
//  compatible avec le HashRouter utilisé dans App.jsx (zéro erreur 404).
//
//  ➜ Tu n'as donc NORMALEMENT RIEN À CHANGER ICI.
//
//  Si un jour tu préfères un chemin absolu (ex. tu sers le site ailleurs qu'à la
//  racine et que le relatif te gêne), remplace './' par '/NOM-DE-TON-REPO/' :
//      base: '/mon-portfolio/'
//  (avec le slash au début ET à la fin). Pour un site "user page" du type
//  pseudo.github.io, mets base: '/'.
// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  plugins: [react()],
  base: './',
})
