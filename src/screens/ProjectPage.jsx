// @ts-nocheck
import React from 'react';
import Tag            from '../components/Tag/Tag';
import TLDRBox        from '../components/TLDRBox/TLDRBox';
import CTAButton      from '../components/CTAButton/CTAButton';
import Footer         from '../components/Footer/Footer';
import NavLink        from '../components/NavLink/NavLink';
import PageTransition from '../components/PageTransition/PageTransition';

const styles = {
  page: {
    maxWidth: '560px',
    margin:   '0 auto',
    padding:  'var(--space-20) var(--space-6) var(--space-32)',
  },
  back: {
    marginBottom: 'var(--space-8)',
  },
  hero: {
    marginBottom: 'var(--space-8)',
  },
  h1: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'var(--text-xl)',
    fontWeight:    500,
    letterSpacing: '-0.01em',
    lineHeight:    1.3,
    color:         'var(--color-ink)',
    margin:        0,
    marginBottom:  'var(--space-3)',
  },
  meta: {
    display:      'flex',
    alignItems:   'center',
    gap:          'var(--space-3)',
    marginBottom: 'var(--space-4)',
  },
  metaText: {
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-sm)',
    fontWeight:    300,
    color:         'var(--color-muted)',
    letterSpacing: '0.02em',
  },
  metaDot: {
    width:        '3px',
    height:       '3px',
    borderRadius: '50%',
    background:   'var(--color-muted)',
    flexShrink:   0,
  },
  tags: {
    display:  'flex',
    flexWrap: 'wrap',
    gap:      'var(--space-2)',
  },
  section: {
    marginBottom: 'var(--space-10)',
  },
  sectionHeading: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'var(--text-md)',
    fontWeight:    400,
    letterSpacing: '-0.01em',
    lineHeight:    1.35,
    color:         'var(--color-ink)',
    marginBottom:  'var(--space-3)',
  },
  paragraph: {
    fontFamily:   'var(--font-serif)',
    fontSize:     'var(--text-base)',
    fontWeight:   300,
    lineHeight:   1.65,
    color:        'var(--color-ink)',
    marginBottom: 'var(--space-3)',
  },
  imagePlaceholder: {
    width:          '100%',
    aspectRatio:    '16 / 9',
    background:     'var(--color-surface)',
    border:         '1px solid var(--color-border)',
    borderRadius:   'var(--radius-md)',
    marginTop:      'var(--space-5)',
    marginBottom:   'var(--space-5)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
  },
  imagePlaceholderLabel: {
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-xs)',
    fontWeight:    300,
    letterSpacing: '0.04em',
    color:         'var(--color-muted)',
    textAlign:     'center',
    padding:       'var(--space-4)',
  },
};

/**
 * ProjectPage
 *
 * Renders a full project detail view. Router-agnostic — all data and
 * navigation callbacks are received as props.
 *
 * @param {object}   props
 * @param {object}   props.project      - A work entry from the WORK data array.
 * @param {function} props.onBack       - Called when the back link is clicked.
 */
export default function ProjectPage({ project, onBack }) {
  const sectionCount = project.sections?.length ?? 0;

  return (
    <div style={styles.page}>

      {/* ── Back navigation ── */}
      <PageTransition delay={0}>
      <nav style={styles.back} aria-label="Breadcrumb">
        <NavLink
          href="/"
          onClick={onBack ? (e) => { e.preventDefault(); onBack(); } : undefined}
        >
          ← Work
        </NavLink>
      </nav>
      </PageTransition>

      {/* ── Hero ── */}
      <PageTransition delay={80}>
      <header style={styles.hero}>
        <h1 style={styles.h1}>{project.title}</h1>

        <div style={styles.meta}>
          <span style={styles.metaText}>{project.year}</span>
          <span style={styles.metaDot} aria-hidden="true" />
          <span style={styles.metaText}>{project.category}</span>
        </div>

        {project.tags?.length > 0 && (
          <div style={styles.tags}>
            {project.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </header>
      </PageTransition>

      {/* ── TLDR box ── */}
      {project.tldr && (
        <PageTransition delay={160}>
          <TLDRBox summary={project.tldr} accent={project.accent} />
        </PageTransition>
      )}

      {/* ── Content sections ── */}
      <main>
        {project.sections?.map((section, i) => (
          <PageTransition key={i} delay={(i + 3) * 80}>
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>{section.heading}</h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} style={styles.paragraph}>{p}</p>
            ))}
            {section.image ? (
              <img
                src={section.image}
                alt={section.heading}
                style={{
                  width:        '100%',
                  borderRadius: 'var(--radius-md)',
                  border:       '1px solid var(--color-border)',
                  marginTop:    'var(--space-5)',
                  marginBottom: 'var(--space-5)',
                  display:      'block',
                }}
              />
            ) : section.imagePlaceholder ? (
              <div style={styles.imagePlaceholder}>
                <span style={styles.imagePlaceholderLabel}>
                  {section.imagePlaceholder}
                </span>
              </div>
            ) : null}
            {section.columns && (
              <div style={{ display: 'flex', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                {section.columns.map((col, k) => (
                  <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {col.heading && <h3 style={styles.sectionHeading}>{col.heading}</h3>}
                    {col.body && <p style={styles.paragraph}>{col.body}</p>}
                  </div>
                ))}
              </div>
            )}
            {section.cta && (
              <CTAButton href={section.cta.href} label={section.cta.label} />
            )}
          </section>
          </PageTransition>
        ))}
      </main>

      {/* ── Footer ── */}
      <PageTransition delay={(sectionCount + 3) * 80}>
        <Footer name="Anik Ahmed" />
      </PageTransition>
    </div>
  );
}
