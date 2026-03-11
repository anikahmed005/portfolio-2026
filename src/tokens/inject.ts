import { color, font, fontSize, space, radii, transition } from './tokens'

const r = document.documentElement

// Color
r.style.setProperty('--color-bg',          color.bg)
r.style.setProperty('--color-surface',     color.surface)
r.style.setProperty('--color-surface-alt', color.surfaceAlt)
r.style.setProperty('--color-border',      color.border)
r.style.setProperty('--color-border-sub',  color.borderSub)
r.style.setProperty('--color-ink',         color.ink)
r.style.setProperty('--color-muted',       color.muted)
r.style.setProperty('--color-brand',       color.brand)

// Accents
Object.entries(color.accents).forEach(([name, value]) => {
  r.style.setProperty(`--accent-${name}`, value)
})

// Typography
r.style.setProperty('--font-serif', font.serif)
r.style.setProperty('--font-mono',  font.mono)

Object.entries(fontSize).forEach(([name, value]) => {
  r.style.setProperty(`--text-${name}`, value)
})

// Spacing
Object.entries(space).forEach(([name, value]) => {
  if (name !== '0') r.style.setProperty(`--space-${name}`, value)
})

// Radii
Object.entries(radii).forEach(([name, value]) => {
  r.style.setProperty(`--radius-${name}`, value)
})

// Transitions
r.style.setProperty('--transition-fast',   transition.fast)
r.style.setProperty('--transition-normal', transition.normal)
r.style.setProperty('--transition-spring', transition.spring)
