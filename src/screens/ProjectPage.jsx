// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';

function Reveal({ children, delay = 0, style }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionH2({ children, baseStyle, gradient }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      style={{
        ...baseStyle,
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <span style={{
        background:           gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        backgroundClip:       'text',
      }}>
        {children}
      </span>
    </h2>
  );
}

function useIsMobile(breakpoint = 640) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [breakpoint]);
  return mobile;
}
import ProjectBanner  from '../components/ProjectBanner/ProjectBanner';
import CTAButton      from '../components/CTAButton/CTAButton';
import Footer         from '../components/Footer/Footer';
import PageTransition from '../components/PageTransition/PageTransition';
import NavLink        from '../components/NavLink/NavLink';
import MediaPreview   from '../components/MediaPreview/MediaPreview';
import { useTheme }   from '../context/ThemeContext';
import MdiIcon        from '@mdi/react';
import { mdiMicrophone, mdiFolderOpen, mdiChartLineVariant, mdiWallet } from '@mdi/js';

const MDI_ICONS = {
  'microphone':         mdiMicrophone,
  'folder-open':        mdiFolderOpen,
  'chart-line-variant': mdiChartLineVariant,
  'wallet':             mdiWallet,
};

const styles = {
  page: {
    maxWidth: '850px',
    margin:   '0 auto',
    padding:  'var(--space-10) var(--space-6) 0',
  },
  content: {
    maxWidth:     '780px',
    margin:       '0 auto var(--space-20)',
    padding:      'var(--space-10) 20px var(--space-10)',
    borderRadius: 'var(--radius-lg)',
  },
  section: {
    marginBottom: 'var(--space-10)',
  },
  sectionHeading: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'clamp(1.3rem, 2.5vw, 1.8rem)',
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
    display:      'flex',
    justifyContent: 'center',
    gap:          'var(--space-5)',
    marginTop:    'var(--space-8)',
    marginBottom: 'var(--space-5)',
    flexWrap:     'nowrap',
    /* bleed wider than the 600px content column */
    marginLeft:   'calc(-1 * var(--space-10))',
    marginRight:  'calc(-1 * var(--space-10))',
  },
  videoCell: {
    position: 'relative',
    flex:     '1 1 0',
    minWidth: '0',
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
  featureList: {
    display:       'flex',
    flexDirection: 'column',
    gap:           'var(--space-10)',
    marginTop:     'var(--space-8)',
    marginLeft:    'calc(-1 * var(--space-10))',
    marginRight:   'calc(-1 * var(--space-10))',
  },
  featureRow: {
    display:    'flex',
    gap:        'var(--space-8)',
    alignItems: 'center',
  },
  featureText: {
    flex:          '0 0 38%',
    display:       'flex',
    flexDirection: 'column',
    gap:           'var(--space-3)',
  },
  featureIcon: {
    color:        'var(--color-muted)',
    marginBottom: 'var(--space-1)',
  },
  featureTitle: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'var(--text-md)',
    fontWeight:    400,
    letterSpacing: '-0.01em',
    lineHeight:    1.3,
    color:         'var(--color-ink)',
    margin:        0,
  },
  featureBody: {
    fontFamily:  'var(--font-serif)',
    fontSize:    'var(--text-base)',
    fontWeight:  300,
    lineHeight:  1.65,
    color:       'var(--color-muted)',
    margin:      0,
  },
  featureCard: {
    flex:           1,
    borderRadius:   '16px',
    overflow:       'hidden',
    minHeight:      '340px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    position:       'relative',
  },
  featurePhoneWrap: {
    position: 'relative',
    width:    '55%',
  },
  featurePhoneScreen: {
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
  backNav: {
    position:           'fixed',
    top:                'var(--space-6)',
    left:               'var(--space-6)',
    zIndex:             100,
    background:         'color-mix(in srgb, var(--color-bg) 80%, transparent)',
    backdropFilter:     'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius:       'var(--radius-full)',
    padding:            'var(--space-2) var(--space-4)',
    border:             '1px solid var(--color-border)',
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
  const isMobile    = useIsMobile();
  const { theme }   = useTheme();

  const h2Gradient = theme === 'dark'
    ? 'linear-gradient(135deg, #ede9fe 0%, #cffafe 100%)'   // very light lavender → very light cyan
    : 'linear-gradient(135deg, #3b0764 0%, #082f49 100%)';  // darkest violet → darkest navy

  const h3Gradient = theme === 'dark'
    ? 'linear-gradient(135deg, #ddd6fe 0%, #a5f3fc 100%)'
    : 'linear-gradient(135deg, #4c1d95 0%, #0c4a6e 100%)';
  const sectionCount = project.sections?.length ?? 0;
  const bannerRef = useRef(null);
  const [showBack, setShowBack] = useState(false);
  const [preview, setPreview] = useState({ visible: false, src: null, type: 'image' });

  const showPreview   = (src, type) => setPreview({ visible: true, src, type });
  const hidePreview   = ()          => setPreview(p => ({ ...p, visible: false }));
  const togglePreview = (src, type) => setPreview(p =>
    p.visible && p.src === src
      ? { ...p, visible: false }
      : { visible: true, src, type }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.slug]);

  useEffect(() => {
    if (!bannerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBack(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Media zoom preview ── */}
      <MediaPreview
        visible={preview.visible}
        src={preview.src}
        type={preview.type}
        onDismiss={hidePreview}
      />

      {/* ── Sticky back button — appears after banner scrolls out of view ── */}
      {showBack && (
        <nav style={styles.backNav} aria-label="Breadcrumb">
          <NavLink
            href="/"
            onClick={onBack ? (e) => { e.preventDefault(); onBack(); } : undefined}
          >
            ← Work
          </NavLink>
        </nav>
      )}

      {/* ── Banner ── */}
      <div ref={bannerRef} style={styles.page}>
        <ProjectBanner project={project} />
      </div>

      {/* ── Content sections ── */}
      <div style={styles.content}>
        <main>
        {project.sections?.map((section, i) => (
          <PageTransition key={i} delay={(i + 3) * 80}>
          <section style={styles.section}>
            {section.headerImage && (
              <Reveal delay={0}>
                <div
                  className="img-zoom-wrap"
                  style={{ marginBottom: 'var(--space-5)', cursor: 'zoom-in' }}
                  onMouseEnter={() => showPreview(section.headerImage, 'image')}
                  onMouseLeave={hidePreview}
                  onPointerDown={(e) => { if (e.pointerType !== 'mouse') togglePreview(section.headerImage, 'image') }}
                >
                  <img src={section.headerImage} alt={section.heading} />
                </div>
              </Reveal>
            )}
            <SectionH2 baseStyle={styles.sectionHeading} gradient={h2Gradient}>{section.heading}</SectionH2>
            {section.paragraphs?.map((p, j) => (
              <React.Fragment key={j}>
                <Reveal delay={j * 80}>
                  <p style={styles.paragraph}>{p}</p>
                </Reveal>
                {j === 0 && section.videoGrid && (
                  <Reveal delay={120}>
                    <div style={{ ...styles.videoGrid, ...(isMobile && { flexWrap: 'wrap', marginLeft: 0, marginRight: 0 }) }}>
                      {section.videoGrid.videos.map((src, k) => (
                        <div
                          key={k}
                          style={{ ...styles.videoCell, cursor: 'zoom-in' }}
                          onMouseEnter={() => showPreview(src, 'video')}
                          onMouseLeave={hidePreview}
                          onPointerDown={(e) => { if (e.pointerType !== 'mouse') togglePreview(src, 'video') }}
                        >
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
                  </Reveal>
                )}
              </React.Fragment>
            ))}
            {section.image ? (
              <Reveal delay={60}>
                <div
                  className="img-zoom-wrap"
                  style={{ marginTop: 'var(--space-5)', marginBottom: 'var(--space-5)', cursor: 'zoom-in' }}
                  onMouseEnter={() => showPreview(section.image, 'image')}
                  onMouseLeave={hidePreview}
                  onPointerDown={(e) => { if (e.pointerType !== 'mouse') togglePreview(section.image, 'image') }}
                >
                  <img src={section.image} alt={section.heading} />
                </div>
              </Reveal>
            ) : section.imagePlaceholder ? (
              <Reveal delay={60}>
                <div style={styles.imagePlaceholder}>
                  <span style={styles.imagePlaceholderLabel}>
                    {section.imagePlaceholder}
                  </span>
                </div>
              </Reveal>
            ) : null}
            {section.columns && (
              <Reveal delay={80}>
                <div style={{ display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
                  {section.columns.map((col, k) => (
                    <div key={k} style={{ flex: isMobile ? '1 1 100%' : 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      {col.heading && <h3 style={{ ...styles.sectionHeading, background: h3Gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{col.heading}</h3>}
                      {col.body && <p style={styles.paragraph}>{col.body}</p>}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            {section.featureCards && (
              <div style={styles.featureList}>
                {section.featureCards.map((card, k) => (
                  <Reveal key={k} delay={k * 120}>
                    <div style={{
                      ...styles.featureRow,
                      ...(isMobile && { flexDirection: 'column' }),
                      padding:             '20px',
                      borderRadius:        'var(--radius-lg)',
                      background:          theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                      backdropFilter:      'blur(14px)',
                      WebkitBackdropFilter:'blur(14px)',
                      border:              `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)'}`,
                      boxShadow:           theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.06)',
                    }}>
                      {/* Text */}
                      <div style={{ ...styles.featureText, ...(isMobile && { flex: 'none', width: '100%' }) }}>
                        {MDI_ICONS[card.icon] && (
                          <div style={styles.featureIcon}>
                            <MdiIcon path={MDI_ICONS[card.icon]} size={1.1} color="var(--color-muted)" />
                          </div>
                        )}
                        <h3 style={{ ...styles.featureTitle, background: h3Gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{card.title}</h3>
                        <p style={styles.featureBody}>{card.body}</p>
                      </div>
                      {/* Media card */}
                      <div
                        style={{
                          ...styles.featureCard,
                          background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                          cursor: 'zoom-in',
                        }}
                        onMouseEnter={() => { const s = card.video ?? card.image; if (s) showPreview(s, card.video ? 'video' : 'image') }}
                        onMouseLeave={hidePreview}
                        onPointerDown={(e) => { if (e.pointerType !== 'mouse') { const s = card.video ?? card.image; if (s) togglePreview(s, card.video ? 'video' : 'image') } }}
                      >
                        {card.frame && card.video ? (
                          <div style={styles.featurePhoneWrap}>
                            <div style={styles.featurePhoneScreen}>
                              <video
                                src={card.video}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                autoPlay loop muted playsInline
                              />
                            </div>
                            <img
                              src={card.frame}
                              alt=""
                              aria-hidden="true"
                              style={{ position: 'relative', width: '100%', display: 'block', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }}
                            />
                          </div>
                        ) : card.image ? (
                          <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : card.video ? (
                          <video src={card.video} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline />
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
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
