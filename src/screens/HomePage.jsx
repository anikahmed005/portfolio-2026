import React, { useState } from 'react';
import Avatar          from '../components/Avatar/Avatar';
import NavLink         from '../components/NavLink/NavLink';
import WorkItem        from '../components/WorkItem/WorkItem';
import PreviewCard     from '../components/PreviewCard/PreviewCard';
import Footer          from '../components/Footer/Footer';
import PageTransition  from '../components/PageTransition/PageTransition';
import { color }       from '../tokens/tokens';
import { WORK }        from '../data/work';
import ThemeToggle     from '../components/ThemeToggle/ThemeToggle';
import { useTheme }    from '../context/ThemeContext';
import MdiIcon         from '@mdi/react';
import { mdiLinkedin, mdiEmailOutline } from '@mdi/js';

// ─── Layout styles ─────────────────────────────────────────────────────────
const styles = {
  page: {
    maxWidth:      '560px',
    margin:        '0 auto',
    padding:       'var(--space-20) var(--space-6) var(--space-32)',
  },
  header: {
    marginBottom: 'var(--space-14)',
  },
  h1: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'clamp(2rem, 6vw, 3rem)',
    fontWeight:    400,
    letterSpacing: '-0.02em',
    lineHeight:    1.15,
    color:         'var(--color-ink)',
    margin:        0,
  },
  role: {
    fontFamily:  'var(--font-serif)',
    fontSize:    'var(--text-lg)',
    fontWeight:  300,
    fontStyle:   'italic',
    color:       'var(--color-muted)',
    marginTop:   '0.15rem',
  },
  roleLink: {
    color:                  'var(--color-ink)',
    textDecoration:         'underline',
    textUnderlineOffset:    '3px',
    textDecorationColor:    'var(--color-border)',
    transition:             'color 0.2s, text-decoration-color 0.2s',
  },
  nav: {
    marginTop:   'var(--space-5)',
    display:     'flex',
    alignItems:  'center',
    gap:         'var(--space-5)',
  },
  workList: {
    listStyle: 'none',
    padding:   0,
    margin:    0,
  },
};

// ─── Component ─────────────────────────────────────────────────────────────
export default function HomePage({ onItemClick }) {
  const { theme } = useTheme();

  const h1Gradient = theme === 'dark'
    ? 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)'   // violet → cyan
    : 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)';  // violet → sky

  const [preview, setPreview] = useState({
    visible: false,
    title:   '',
    year:    '',
    accent:  color.accents.violet,
    bg:      '#070d1a',
    image:   null,
    phones:  null,
  });

  function handleEnter({ title, year, accent, bg, image, phones }) {
    setPreview({ visible: true, title, year, accent, bg, image, phones });
  }

  function handleLeave() {
    setPreview(p => ({ ...p, visible: false }));
  }

  return (
    <>
      {/* Floating preview card — rendered outside the page flow */}
      <PreviewCard
        visible={preview.visible}
        title={preview.title}
        year={preview.year}
        accent={preview.accent}
        bg={preview.bg}
        image={preview.image}
        phones={preview.phones}
      />

      <div style={styles.page}>
        {/* ── Header ── */}
        <PageTransition delay={0}>
        <header style={styles.header}>
          {/* Replace src with your own photo URL */}
          <Avatar style={{ marginBottom: 'var(--space-5)' }} />

          <h1 style={styles.h1}>Anik Ahmed</h1>

          <p style={styles.role}>
            Product Designer{' '}
            {/* <a href="https://example.com" style={styles.roleLink}>
              Studio / Company
            </a> */}
          </p>

          <nav style={styles.nav} aria-label="Primary navigation">
            <NavLink href="/about">About</NavLink>

            {/* Glassmorphic contact icons */}
            <a
              href="https://www.linkedin.com/in/anikahmed005/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{
                display:             'inline-flex',
                alignItems:          'center',
                justifyContent:      'center',
                width:               '32px',
                height:              '32px',
                borderRadius:        'var(--radius-sm)',
                background:          theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                backdropFilter:      'blur(12px)',
                WebkitBackdropFilter:'blur(12px)',
                border:              `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)'}`,
                color:               'var(--color-muted)',
                textDecoration:      'none',
                flexShrink:          0,
              }}
            >
              <MdiIcon path={mdiLinkedin} size={0.75} color="var(--color-muted)" />
            </a>
            <a
              href="mailto:anikahmedux@gmail.com"
              title="Email"
              style={{
                display:             'inline-flex',
                alignItems:          'center',
                justifyContent:      'center',
                width:               '32px',
                height:              '32px',
                borderRadius:        'var(--radius-sm)',
                background:          theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                backdropFilter:      'blur(12px)',
                WebkitBackdropFilter:'blur(12px)',
                border:              `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)'}`,
                color:               'var(--color-muted)',
                textDecoration:      'none',
                flexShrink:          0,
              }}
            >
              <MdiIcon path={mdiEmailOutline} size={0.75} color="var(--color-muted)" />
            </a>

            <ThemeToggle />
          </nav>
        </header>
        </PageTransition>

        {/* ── Work list ── */}
        <ul style={styles.workList}>
          {WORK.map((item, i) => (
            <WorkItem
              key={item.id}
              title={item.title}
              category={item.category}
              year={item.year}
              href={item.href}
              accent={item.accent}
              bg={item.bg}
              image={item.sections?.find(s => s.image)?.image}
              phones={item.sections?.find(s => s.videoGrid)?.videoGrid}
              isFirst={i === 0}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onClick={onItemClick ? (e) => { e.preventDefault(); onItemClick(item.href); } : undefined}
              style={{
                opacity:        0,
                animation:      'fadeUp 0.5s ease forwards',
                animationDelay: `${(i + 1) * 60}ms`,
              }}
            />
          ))}
        </ul>

        {/* ── Footer ── */}
        <PageTransition delay={(WORK.length + 1) * 60}>
        <Footer name="Anik Ahmed" />
        </PageTransition>
      </div>
    </>
  );
}
