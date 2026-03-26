// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function Aurora() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let raf

    const state = {
      cursorY: window.innerHeight / 2,
      targetY: window.innerHeight / 2,
    }

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => { state.targetY = e.clientY }
    window.addEventListener('mousemove', onMove)

    // ── Colour palettes [r, g, b] ──────────────────────────────────────────
    const palette = theme === 'dark'
      ? [
          [139,  92, 246],   // violet
          [ 16, 185, 129],   // emerald
          [  6, 182, 212],   // cyan
          [ 99, 102, 241],   // indigo
          [ 45, 212, 191],   // teal
        ]
      : [
          [124,  58, 237],   // violet
          [ 16, 185, 129],   // emerald
          [ 14, 165, 233],   // sky
          [217,  70, 239],   // fuchsia
          [ 20, 184, 166],   // teal
        ]

    const aScale = theme === 'dark' ? 1.0 : 1.0

    // ── Draw an elliptical soft blob ──────────────────────────────────────
    const blob = (x, y, rx, ry, [r, g, b], a) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(1, ry / rx)
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
      grad.addColorStop(0, `rgba(${r},${g},${b},${(a * aScale).toFixed(3)})`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(0, 0, rx, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // ── Render loop ──────────────────────────────────────────────────────
    const draw = (now) => {
      const t  = now / 1000
      const W  = canvas.width
      const H  = canvas.height

      // Smooth cursor follow
      state.cursorY += (state.targetY - state.cursorY) * 0.055
      const cy = state.cursorY

      ctx.clearRect(0, 0, W, H)

      // ── Bottom-left corner ──────────────────────────────────────────────
      blob(-80, H + 80,                              160, 380, palette[0], 0.26)
      blob(-80, H + 80 + Math.sin(t * 0.50) * 40,   120, 290, palette[1], 0.18)
      blob(-80, H + 80 - Math.cos(t * 0.38) * 30,    95, 235, palette[2], 0.14)
      blob(-80, H + 80 + Math.sin(t * 0.28) * 50,    75, 185, palette[3], 0.10)

      // ── Bottom-right corner ─────────────────────────────────────────────
      blob(W + 80, H + 80,                              160, 380, palette[1], 0.24)
      blob(W + 80, H + 80 + Math.cos(t * 0.44) * 40,   125, 310, palette[3], 0.18)
      blob(W + 80, H + 80 - Math.sin(t * 0.33) * 30,   100, 245, palette[0], 0.14)
      blob(W + 80, H + 80 + Math.sin(t * 0.58) * 50,    80, 195, palette[4], 0.10)

      // ── Bottom ──────────────────────────────────────────────────────────
      blob(W * 0.50, H + 80, W * 0.32, 230, palette[0], 0.22)
      blob(W * 0.25, H + 80, W * 0.22, 205, palette[2], 0.15)
      blob(W * 0.75, H + 80, W * 0.22, 205, palette[1], 0.15)
      blob(W * 0.50, H + 80, W * 0.16, 165, palette[4], 0.11)

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
