// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback } from 'react';

const W = 680; // preview width px

const s = {
  card: {
    position:             'fixed',
    zIndex:               1000,
    pointerEvents:        'none',
    width:                `${W}px`,
    borderRadius:         'var(--radius-lg)',
    overflow:             'hidden',
    boxShadow:            '0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
    willChange:           'opacity, transform, left, top',
    background:           'color-mix(in srgb, var(--color-bg) 55%, transparent)',
    backdropFilter:       'blur(18px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
  },
  hidden: {
    opacity:    0,
    transform:  'scale(0.84)',
    transition: 'opacity 0.24s cubic-bezier(0.22,1,0.36,1), transform 0.24s cubic-bezier(0.22,1,0.36,1)',
  },
  visible: {
    opacity:    1,
    transform:  'scale(1)',
    transition: 'opacity 0.24s cubic-bezier(0.22,1,0.36,1), transform 0.24s cubic-bezier(0.22,1,0.36,1)',
  },
  // Mobile: centred overlay — pointer events on so user can dismiss
  mobileCard: {
    position:             'fixed',
    zIndex:               1000,
    width:                'min(90vw, 420px)',
    borderRadius:         'var(--radius-lg)',
    overflow:             'hidden',
    boxShadow:            '0 30px 70px rgba(0,0,0,0.6)',
    background:           'color-mix(in srgb, var(--color-bg) 55%, transparent)',
    backdropFilter:       'blur(18px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
    top:                  '50%',
    left:                 '50%',
    transform:            'translate(-50%, -50%)',
  },
  backdrop: {
    position:   'fixed',
    inset:      0,
    zIndex:     999,
    background: 'rgba(0,0,0,0.5)',
  },
};

export default function MediaPreview({ visible, src, type, onDismiss }) {
  const cardRef    = useRef(null);
  const rafRef     = useRef(null);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none)').matches);
  }, []);

  // Track mouse globally (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  // RAF positioning loop (desktop)
  const tick = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const { x, y } = mouseRef.current;
    const pw = card.offsetWidth, ph = card.offsetHeight;
    const vw = window.innerWidth,  vh = window.innerHeight;
    const gap = 24;
    let cx = x + gap, cy = y - ph / 2;
    if (cx + pw > vw - 12) cx = x - pw - gap;
    if (cy < 8)            cy = 8;
    if (cy + ph > vh - 8)  cy = vh - ph - 8;
    card.style.left = cx + 'px';
    card.style.top  = cy + 'px';
    rafRef.current  = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (visible) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, tick, isMobile]);

  if (!src) return null;

  const mediaStyle = {
    display:   'block',
    width:     '100%',
    maxHeight: '480px',
    objectFit: 'contain',
  };

  const media = type === 'video'
    ? <video src={src} autoPlay loop muted playsInline style={mediaStyle} />
    : <img   src={src} alt="" style={mediaStyle} />;

  // ── Mobile: backdrop + centred card ──────────────────────────────────────
  if (isMobile) {
    if (!visible) return null;
    return (
      <>
        <div style={s.backdrop} onClick={onDismiss} />
        <div style={s.mobileCard}>{media}</div>
      </>
    );
  }

  // ── Desktop: cursor-following card ───────────────────────────────────────
  return (
    <>
      {visible && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 999 }}
          onClick={onDismiss}
        />
      )}
      <div
        ref={cardRef}
        style={{ ...s.card, ...(visible ? s.visible : s.hidden) }}
        aria-hidden="true"
      >
        {media}
      </div>
    </>
  );
}
