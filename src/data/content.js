// ─────────────────────────────────────────────────────────────────────────────
//  Contenu du site — données réelles de Valentin Stoll.
//  Tout est centralisé ici : pour mettre à jour le site, modifie uniquement
//  ce fichier, les composants se mettent à jour automatiquement.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  firstName: 'Valentin',
  lastName: 'Stoll',
  title: 'Étudiant et apprenti en ingénierie informatique',
  email: 'contact@valcloud.fr',
  bio: `Passionné par les nouvelles technologies, je suis actuellement étudiant à l'école IRIS Mediaschool en apprentissage en ingénierie informatique dans la société SEW Usocome depuis septembre 2022. Mon cursus BAC+5 se terminera en septembre 2027.`,
  bioPersonal: `En dehors de l'informatique, je suis un grand passionné d'automobile et d'horlogerie, et je consacre mon temps libre à la musculation, une discipline qui m'apprend la persévérance et le dépassement de soi.`,
}

export const interests = [
  {
    icon: 'Car',
    label: 'Automobile',
    note: 'Mécanique, design et sport automobile.',
  },
  {
    icon: 'Watch',
    label: 'Horlogerie',
    note: 'Le goût du mouvement de précision et du détail.',
  },
  {
    icon: 'Dumbbell',
    label: 'Musculation',
    note: 'Persévérance et dépassement de soi, jour après jour.',
  },
]

export const company = {
  name: 'SEW USOCOME',
  location: 'Haguenau / Mommenheim · Grand Est, France',
}

export const experiences = [
  {
    period: 'Sept. 2025 — Aujourd’hui',
    current: true,
    role: 'Apprenti en Ingénierie des Systèmes d’Information',
    summary:
      'Conception de scripts PowerShell, industrialisation des processus et supervision IoT.',
    missions: [
      'Développement, déploiement et maintien de scripts d’automatisation',
      'Industrialisation des processus internes',
      'Monitoring IoT & dashboards (Grafana, LoRaWAN)',
      'Supervision de salles serveurs via capteurs IoT et tableaux de bord',
    ],
    tags: ['PowerShell', 'Grafana', 'LoRaWAN', 'IoT', 'Automatisation'],
  },
  {
    period: 'Sept. 2024 — Août 2025',
    current: false,
    role: 'Apprenti Administrateur d’Infrastructures Sécurisées',
    summary:
      'Gestion de projet IT et modernisation du parc et des scripts legacy.',
    missions: [
      'Gestion de projet IT',
      'Étude de modernisation de scripts legacy (Batch → PowerShell)',
      'Pilotage de la migration Windows 11 du parc PC en production',
    ],
    tags: ['Gestion de projet', 'Windows 11', 'Migration', 'PowerShell'],
  },
  {
    period: 'Sept. 2022 — Août 2024',
    current: false,
    role: 'Apprenti Technicien Informatique Industrielle',
    summary:
      'Support, gestion de parc multi-sites et déploiement mobile sécurisé.',
    missions: [
      'Support informatique Niveau 1 / Niveau 2',
      'Gestion du parc informatique sur plusieurs sites',
      'Étude et mise en place d’appareils mobiles Android (MDM Soti MobiControl)',
    ],
    tags: ['Support N1/N2', 'Parc IT', 'Android', 'MDM Soti'],
  },
]

export const education = [
  {
    period: 'Sept. 2025 — Sept. 2027',
    school: 'IRIS Mediaschool',
    degree: 'Mastère Expert en ingénierie des systèmes d’information',
    level: 'BAC+5 | RNCP niv. 7',
    skills: ['Docker avancé & Swarm', 'Protection des données (Veeam)', 'Automatisation (n8n)'],
  },
  {
    period: 'Sept. 2024 — Août 2025',
    school: 'IRIS Mediaschool',
    degree: 'Bachelor Administrateur d’Infrastructures Sécurisées',
    level: 'BAC+3 | RNCP niv. 6',
    skills: [
      'Gestion de projet',
      'Architecture d’infrastructure',
      'Zabbix / Grafana',
      'Hardening AD',
      'Virtualisation Proxmox',
    ],
  },
  {
    period: 'Sept. 2022 — Août 2024',
    school: 'IRIS Mediaschool',
    degree: 'BTS SIO — Option SISR',
    level: 'BAC+2 | RNCP niv. 5',
    skills: ['Virtualisation', 'Linux / Windows Server', 'PowerShell / Python'],
  },
  {
    period: 'Sept. 2019 — Juil. 2022',
    school: 'Lycée André Maurois',
    degree: 'Baccalauréat général (Maths, S.E.S)',
    level: 'BAC | RNCP niv. 4',
    skills: ['Mathématiques', 'Sciences économiques et sociales'],
  },
]

export const legal = {
  editor:
    'Ce site est édité par Stoll Valentin. Contact : contact@valcloud.fr',
  host:
    'Le site est hébergé par GitHub Pages. GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
  ip: 'Tous les contenus présents sur ce site (textes, images, code, etc.) sont la propriété exclusive de l’éditeur, sauf mention contraire. Toute reproduction totale ou partielle est interdite sans l’autorisation écrite de l’éditeur.',
  data: 'Ce site ne collecte aucune donnée personnelle sans votre consentement. Aucune information n’est stockée à des fins commerciales. Les cookies éventuellement utilisés servent uniquement à améliorer l’expérience utilisateur et peuvent être désactivés via les paramètres du navigateur.',
}

export const sections = [
  { id: 'about', label: 'À propos' },
  { id: 'experience', label: 'Expériences' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]
