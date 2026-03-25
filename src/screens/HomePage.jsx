import React, { useState } from 'react';
import Avatar          from '../components/Avatar/Avatar';
import NavLink         from '../components/NavLink/NavLink';
import WorkItem        from '../components/WorkItem/WorkItem';
import PreviewCard     from '../components/PreviewCard/PreviewCard';
import Footer          from '../components/Footer/Footer';
import PageTransition  from '../components/PageTransition/PageTransition';
import { color }       from '../tokens/tokens';
import { WORK }        from '../data/work';

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
    fontSize:      'var(--text-xl)',
    fontWeight:    400,
    letterSpacing: '-0.01em',
    lineHeight:    1.4,
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
    marginTop:  'var(--space-5)',
    display:    'flex',
    gap:        'var(--space-5)',
  },
  workList: {
    listStyle: 'none',
    padding:   0,
    margin:    0,
  },
};

// ─── Component ─────────────────────────────────────────────────────────────
export default function HomePage({ onItemClick }) {
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
            Designer at{' '}
            <a href="https://example.com" style={styles.roleLink}>
              Studio / Company
            </a>
          </p>

          <nav style={styles.nav} aria-label="Primary navigation">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/connect">Connect</NavLink>
            <NavLink href="/writing">Writing</NavLink>
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
