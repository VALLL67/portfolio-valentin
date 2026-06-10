# Portfolio — Valentin Stoll

Portfolio one-page (+ page Mentions légales) construit avec **React + Vite**, **Tailwind CSS**, **Framer Motion**, **React Router (HashRouter)** et **lucide-react**.

Polices auto-hébergées via @fontsource (conformité RGPD, aucune requête vers Google Fonts).

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:5173`.

## Build de production

```bash
npm run build      # génère le dossier dist/
npm run preview    # prévisualise le build
```

## Déploiement sur GitHub Pages

Le projet est prêt pour GitHub Pages : `vite.config.js` utilise `base: './'` (chemins
relatifs) et l'application utilise `HashRouter`, donc **aucune erreur 404** au rechargement
et **rien à modifier** quel que soit le nom de ton dépôt.

Deux options au choix :

**Option A — GitHub Actions (recommandé, automatique)**
1. Pousse le projet sur GitHub.
2. `Settings` → `Pages` → *Build and deployment* → Source : **GitHub Actions**.
3. Chaque `git push` sur `main` rebuild et publie le site (voir `.github/workflows/deploy.yml`).

**Option B — Manuel via le paquet `gh-pages`**
```bash
npm run deploy
```
Puis `Settings` → `Pages` → Source : branche `gh-pages`.

## Mettre à jour le contenu

Tout le contenu textuel (bio, expériences, formation, mentions légales) est centralisé
dans **`src/data/content.js`**. Modifie ce fichier, les composants se mettent à jour seuls.

## Structure

```
src/
├── main.jsx              # point d'entrée
├── App.jsx               # routage HashRouter
├── index.css            # styles globaux + variables
├── data/content.js       # ← toutes les données du site
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx          # section signature (bezel rotatif, révélation du nom)
│   ├── About.jsx
│   ├── Experience.jsx    # timeline verticale
│   ├── Education.jsx     # grille de cartes
│   ├── Footer.jsx
│   └── SectionHeading.jsx
└── pages/
    ├── Home.jsx
    └── MentionsLegales.jsx
```
