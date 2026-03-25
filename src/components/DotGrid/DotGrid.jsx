// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

const GRID       = 28    // px between dots
const DOT_R      = 1     // dot radius
const SHINE_R    = 200   // cursor spotlight radius
const WAVE_SPEED = 180   // px / second  — keep slow for a relaxed feel
const WAVELENGTH = 72    // px between wave crests
const AMPLITUDE  = 4     // max Y displacement in px
const RIPPLE_LIFE = 2.4  // seconds before a ripple fades out

export default function DotGrid() {
  const canvasRef = useRef(null)
  const { theme }  = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // Mutable state stored in a ref-like plain object (avoids closure staleness)
    const state = {
      mouse:   { x: -9999, y: -9999 },
      ripples: [],        // [{ x, y, t }]
    }

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMove = (e) => {
      const { x: px, y: py } = state.mouse
      // Only seed a new ripple when the cursor has travelled 30 px
      if (Math.hypot(e.clientX - px, e.clientY - py) > 30) {
        state.ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() })
        if (state.ripples.length > 6) state.ripples.shift()
      }
      state.mouse = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    // ── Theme colours ────────────────────────────────────────────────────────
    const isDark     = theme === 'dark'
    const dimR       = isDark ? 255 : 0
    const dimG       = isDark ? 255 : 0
    const dimB       = isDark ? 255 : 0
    const dimA       = isDark ? 0.07 : 0.06
    const shineR     = isDark ? 255 : 140
    const shineG     = isDark ? 220 : 90
    const shineB     = isDark ? 120 : 0
    const shineBoost = 0.48   // extra alpha at cursor centre

    // ── Draw loop ────────────────────────────────────────────────────────────
    let raf
    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Prune dead ripples
      state.ripples = state.ripples.filter(r => (now - r.t) / 1000 < RIPPLE_LIFE)

      const cols = Math.ceil(canvas.width  / GRID) + 1
      const rows = Math.ceil(canvas.height / GRID) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = col * GRID
          const by = row * GRID

          // ── Wave: sum displacement from all active ripples ──────────────
          let waveY = 0
          for (const rip of state.ripples) {
            const age      = (now - rip.t) / 1000
            const dist     = Math.hypot(bx - rip.x, by - rip.y)
            const front    = age * WAVE_SPEED
            // Gaussian envelope centred on the travelling wavefront
            const envelope = Math.exp(-age * 1.1) * Math.exp(-((dist - front) ** 2) / (2 * 40 ** 2))
            const phase    = ((dist - front) / WAVELENGTH) * Math.PI * 2
            waveY += Math.sin(phase) * envelope * AMPLITUDE
          }

          // ── Shine: proximity to cursor ──────────────────────────────────
          const distMouse = Math.hypot(bx - state.mouse.x, by - state.mouse.y)
          const shine     = Math.max(0, 1 - distMouse / SHINE_R)

          // ── Render dot ──────────────────────────────────────────────────
          const a = shine > 0
            ? dimA + shine * shineBoost
            : dimA

          const r = shine > 0 ? shineR : dimR
          const g = shine > 0 ? shineG : dimG
          const b = shine > 0 ? shineB : dimB

          ctx.beginPath()
          ctx.arc(bx, by + waveY, DOT_R, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
