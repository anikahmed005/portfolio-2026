// @ts-nocheck
import React from 'react';
import ProjectBanner  from '../components/ProjectBanner/ProjectBanner';
import CTAButton      from '../components/CTAButton/CTAButton';
import Footer         from '../components/Footer/Footer';
import PageTransition from '../components/PageTransition/PageTransition';

const styles = {
  page: {
    maxWidth: '850px',
    margin:   '0 auto',
    padding:  'var(--space-10) var(--space-6) 0',
  },
  content: {
    maxWidth: '600px',
    margin:   '0 auto',
    padding:  'var(--space-10) var(--space-6) var(--space-32)',
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
  videoGrid: {
    display:         'flex',
    justifyContent:  'center',
    gap:             'var(--space-4)',
    marginTop:       'var(--space-8)',
    marginBottom:    'var(--space-5)',
    flexWrap:        'wrap',
  },
  videoCell: {
    position:  'relative',
    flex:      '1 1 0',
    minWidth:  '80px',
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
  videoEl: {
    position:  'absolute',
    top:       0,
    left:      0,
    width:     '100%',
    height:    '100%',
    objectFit: 'cover',
    display:   'block',
    zIndex:    1,
  },
  videoFrameImg: {
    position:      'relative',
    width:         '100%',
    display:       'block',
    zIndex:        2,
    pointerEvents: 'none',
    userSelect:    'none',
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
    <>
      {/* ── Banner ── */}
      <div style={styles.page}>
        <ProjectBanner project={project} onBack={onBack} />
      </div>

      {/* ── Content sections ── */}
      <div style={styles.content}>
        <main>
        {project.sections?.map((section, i) => (
          <PageTransition key={i} delay={(i + 3) * 80}>
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>{section.heading}</h2>
            {section.paragraphs?.map((p, j) => (
              <React.Fragment key={j}>
                <p style={styles.paragraph}>{p}</p>
                {j === 0 && section.videoGrid && (
                  <div style={styles.videoGrid}>
                    {section.videoGrid.videos.map((src, k) => (
                      <div key={k} style={styles.videoCell}>
                        <div style={styles.phoneScreen}>
                          <video
                            src={src}
                            style={styles.videoEl}
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                        <img
                          src={section.videoGrid.frame}
                          alt=""
                          aria-hidden="true"
                          style={styles.videoFrameImg}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
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
    </>
  );
}
