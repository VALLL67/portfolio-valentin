/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Couleurs pilotées par variables CSS → un seul jeu de classes pour les
      // deux thèmes. Les valeurs (canaux R G B) sont définies dans index.css.
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        copper: 'rgb(var(--copper) / <alpha-value>)',
        'copper-soft': 'rgb(var(--copper-soft) / <alpha-value>)',
        'copper-dim': 'rgb(var(--copper-dim) / <alpha-value>)',
        live: 'rgb(var(--live) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.045em' },
      keyframes: {
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
        'grid-drift': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '40px 40px' } },
        'glow-pulse': { '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '0.85' } },
      },
      animation: {
        'spin-slow': 'spin-slow 60s linear infinite',
        'spin-slower': 'spin-slow 120s linear infinite',
        'spin-reverse': 'spin-reverse 90s linear infinite',
        blink: 'blink 1.6s steps(1, end) infinite',
        'grid-drift': 'grid-drift 8s linear infinite',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
