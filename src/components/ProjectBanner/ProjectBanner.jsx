// @ts-nocheck
import React from 'react';
import Tag     from '../Tag/Tag';
import NavLink from '../NavLink/NavLink';

const s = {
  banner: {
    display:    'flex',
    width:      '100%',
    minHeight:  'clamp(95px, 13vh, 145px)',
    position:   'relative',
    overflow:   'visible',
    clipPath:   'inset(-220px 0 0 0)',
    marginBottom: '50px',
  },

  /* ── Left: media panel ── */
  leftPanel: {
    flex:            '0 0 42%',
    position:        'relative',
    overflow:        'visible',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          2,
  },

  /* phone mockup wrapper — protrudes above and below the banner */
  phoneWrap: {
    position:     'relative',
    width:        '55%',
    marginTop:    '-20%',
    marginBottom: '20%',
  },
  phoneScreen: {
    position:     'absolute',
    top:          '2%',
    left:         '3.5%',
    width:        '93%',
    height:       '94%',
    zIndex:       3,
    overflow:     'hidden',
    borderRadius: '10% / 4%',
    background:   '#0C0C0B',
  },
  phoneVideo: {
    position:   'absolute',
    top:        0,
    left:       0,
    width:      '100%',
    height:     '100%',
    objectFit:  'cover',
    display:    'block',
    zIndex:     1,
  },
  phoneFrame: {
    position:      'relative',
    width:         '100%',
    display:       'block',
    zIndex:        2,
    pointerEvents: 'none',
    userSelect:    'none',
  },

  /* static image — protrudes above, clipped at banner bottom by clip-path */
  bannerImg: {
    position:  'absolute',
    top:       '-12px',
    left:      '50%',
    transform: 'translateX(-50%)',
    width:     '80%',
    height:    'auto',
    display:   'block',
  },

  /* ── Right: text panel ── */
  rightPanel: {
    flex:           1,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'center',
    padding:        'var(--space-6) var(--space-8)',
  },
  title: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'clamp(1.4rem, 3vw, 1.9rem)',
    fontWeight:    500,
    letterSpacing: '-0.02em',
    lineHeight:    1.2,
    color:         'var(--color-ink)',
    margin:        0,
    marginBottom:  'var(--space-3)',
  },
  meta: {
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-sm)',
    fontWeight:    300,
    color:         'var(--color-muted)',
    letterSpacing: '0.02em',
    marginBottom:  'var(--space-5)',
  },
  tldr: {
    fontFamily:   'var(--font-serif)',
    fontSize:     'var(--text-base)',
    fontWeight:   300,
    fontStyle:    'italic',
    lineHeight:   1.65,
    color:        'var(--color-ink)',
    opacity:      0.85,
    marginBottom: 'var(--space-6)',
  },
  tags: {
    display:  'flex',
    flexWrap: 'wrap',
    gap:      'var(--space-2)',
  },

  /* ── Back nav overlay ── */
  backNav: {
    position:     'fixed',
    top:          'var(--space-6)',
    left:         'var(--space-6)',
    zIndex:       100,
    background:   'color-mix(in srgb, var(--color-bg) 80%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: 'var(--radius-full)',
    padding:      'var(--space-2) var(--space-4)',
    border:       '1px solid var(--color-border)',
  },
};

export default function ProjectBanner({ project, onBack }) {
  const banner = project.banner ?? {};

  return (
    <div style={{ ...s.banner, background: project.bg, borderTop: `15px solid ${project.accent}` }}>

      {/* ── Back navigation ── */}
      <nav style={s.backNav} aria-label="Breadcrumb">
        <NavLink
          href="/"
          onClick={onBack ? (e) => { e.preventDefault(); onBack(); } : undefined}
        >
          ← Work
        </NavLink>
      </nav>

      {/* ── Left: media ── */}
      <div style={s.leftPanel}>
        {banner.phone ? (
          <div style={s.phoneWrap}>
            <div style={s.phoneScreen}>
              <video
                src={banner.phone.video}
                style={s.phoneVideo}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <img
              src={banner.phone.frame}
              alt=""
              aria-hidden="true"
              style={s.phoneFrame}
            />
          </div>
        ) : banner.image ? (
          <img
            src={banner.image}
            alt={project.title}
            style={s.bannerImg}
          />
        ) : (
          <div style={{ ...s.bannerImg, background: 'var(--color-surface)' }} />
        )}
      </div>

      {/* ── Right: text ── */}
      <div style={s.rightPanel}>
        <h1 style={s.title}>{project.title}</h1>
        <p style={s.meta}>{project.year} · {project.category}</p>
        {project.tldr && <p style={s.tldr}>{project.tldr}</p>}
        {project.tags?.length > 0 && (
          <div style={s.tags}>
            {project.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
