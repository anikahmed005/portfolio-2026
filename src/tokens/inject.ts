import { color, colorLight, font, fontSize, space, radii, transition } from './tokens'

export function applyTheme(theme: 'dark' | 'light') {
  const c = theme === 'light' ? colorLight : color
  const r = document.documentElement

  // Color
  r.style.setProperty('--color-bg',          c.bg)
  r.style.setProperty('--color-surface',     c.surface)
  r.style.setProperty('--color-surface-alt', c.surfaceAlt)
  r.style.setProperty('--color-border',      c.border)
  r.style.setProperty('--color-border-sub',  c.borderSub)
  r.style.setProperty('--color-ink',         c.ink)
  r.style.setProperty('--color-muted',       c.muted)
  r.style.setProperty('--color-brand',       c.brand)

  // Accents
  Object.entries(c.accents).forEach(([name, value]) => {
    r.style.setProperty(`--accent-${name}`, value as string)
  })

  // Typography
  r.style.setProperty('--font-serif', font.serif)
  r.style.setProperty('--font-mono',  font.mono)
  Object.entries(fontSize).forEach(([n, v]) => r.style.setProperty(`--text-${n}`, v))

  // Spacing
  Object.entries(space).forEach(([n, v]) => {
    if (n !== '0') r.style.setProperty(`--space-${n}`, v)
  })

  // Radii
  Object.entries(radii).forEach(([n, v]) => r.style.setProperty(`--radius-${n}`, v))

  // Transitions
  r.style.setProperty('--transition-fast',   transition.fast)
  r.style.setProperty('--transition-normal', transition.normal)
  r.style.setProperty('--transition-spring', transition.spring)
}

// Initial load — check localStorage for persisted preference
const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
applyTheme(saved ?? 'dark')
