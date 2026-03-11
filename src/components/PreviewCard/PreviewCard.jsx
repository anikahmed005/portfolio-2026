import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ── Inline styles ── */
const styles = {
  card: {
    position: 'fixed',
    zIndex: 1000,
    pointerEvents: 'none',
    width: '310px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: '0 30px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(100, 78, 6, 0.24)',
    willChange: 'opacity, transform, left, top',
  },
  hidden: {
    opacity: 0,
    transform: 'scale(0.82)',
    transition: 'opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)',
  },
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)',
  },
  thumb: {
    display: 'block',
    width: '100%',
    height: '136px',
    overflow: 'hidden',
  },
  meta: {
    padding: '0.55rem 0.75rem 0.65rem',
    borderTop: '1px solid var(--color-border)',
  },
  name: {
    fontSize: '0.78rem',
    fontWeight: 400,
    color: 'var(--color-ink)',
    lineHeight: 1.3,
  },
  sub: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.61rem',
    color: 'var(--color-muted)',
    marginTop: '0.18rem',
    letterSpacing: '0.02em',
  },
};

/* ── SVG thumbnail generator ── */
function buildThumbSVG(bg = '#070d1a', accent = '#ffcc24') {
  return `
    <svg viewBox="0 0 230 136" xmlns="http://www.w3.org/2000/svg" width="230" height="136">
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stop-color="${accent}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="${bg}"     stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="230" height="136" fill="${bg}"/>
      <rect width="230" height="136" fill="url(#rg)"/>
      <line x1="0"   y1="45"  x2="230" y2="45"  stroke="${accent}" stroke-opacity="0.07" stroke-width="1"/>
      <line x1="0"   y1="90"  x2="230" y2="90"  stroke="${accent}" stroke-opacity="0.07" stroke-width="1"/>
      <line x1="76"  y1="0"   x2="76"  y2="136" stroke="${accent}" stroke-opacity="0.07" stroke-width="1"/>
      <line x1="153" y1="0"   x2="153" y2="136" stroke="${accent}" stroke-opacity="0.07" stroke-width="1"/>
      <circle cx="115" cy="68" r="40" fill="none" stroke="${accent}" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="4 6"/>
      <circle cx="115" cy="68" r="22" fill="none" stroke="${accent}" stroke-opacity="0.22" stroke-width="1"/>
      <circle cx="115" cy="68" r="12" fill="${accent}" fill-opacity="0.1"/>
      <circle cx="115" cy="68" r="4.5" fill="${accent}" fill-opacity="0.85"/>
      <rect x="14" y="14" width="28" height="3.5" rx="1.75" fill="${accent}" fill-opacity="0.4"/>
      <rect x="14" y="21" width="18" height="3"   rx="1.5"  fill="${accent}" fill-opacity="0.2"/>
      <line x1="196" y1="14" x2="214" y2="14" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
      <line x1="205" y1="8"  x2="205" y2="22" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
      <rect x="168" y="112" width="44" height="11" rx="5.5" fill="${accent}" fill-opacity="0.12"/>
      <rect x="173" y="115.5" width="34" height="4" rx="2" fill="${accent}" fill-opacity="0.45"/>
    </svg>`;
}

/**
 * PreviewCard
 *
 * Floating card that follows the cursor and shows a project thumbnail.
 * Attach it once at the root level; control it via `visible`, `title`,
 * `year`, `accent`, and `bg` props.
 *
 * @param {boolean} visible  - Whether the card is shown.
 * @param {string}  title    - Project title to display.
 * @param {string}  year     - Year / range to display.
 * @param {string}  accent   - Thumbnail accent color.
 * @param {string}  bg       - Thumbnail background color.
 */
export default function PreviewCard({
  visible = false,
  title = '',
  year = '',
  accent = '#ffcc24',
  bg = '#070d1a',
  image = null,
}) {
  const cardRef = useRef(null);
  const rafRef  = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse globally
  useEffect(() => {
    function onMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Continuous RAF loop to position card
  const tick = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const { x, y } = mouseRef.current;
    const pw = card.offsetWidth, ph = card.offsetHeight;
    const vw = window.innerWidth,  vh = window.innerHeight;
    const gap = 22;
    let cx = x + gap, cy = y - ph / 2;
    if (cx + pw > vw - 12) cx = x - pw - gap;
    if (cy < 8) cy = 8;
    if (cy + ph > vh - 8) cy = vh - ph - 8;
    card.style.left = cx + 'px';
    card.style.top  = cy + 'px';
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (visible) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, tick]);

  const cardStyle = {
    ...styles.card,
    ...(visible ? styles.visible : styles.hidden),
  };

  return (
    <div ref={cardRef} style={cardStyle} aria-hidden="true">
      {image ? (
        <img src={image} alt={title} style={{ ...styles.thumb, objectFit: 'cover' }} />
      ) : (
        <div
          style={styles.thumb}
          dangerouslySetInnerHTML={{ __html: buildThumbSVG(bg, accent) }}
        />
      )}
      <div style={styles.meta}>
        <div style={styles.name}>{title}</div>
        <div style={styles.sub}>{year}</div>
      </div>
    </div>
  );
}
