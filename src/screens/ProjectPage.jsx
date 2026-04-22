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

function ExpandableProcess({ section, sectionStyles, theme, isMobile, h2Gradient, h3Gradient, renderParagraph, onZoomStart, onZoomEnd }) {
  const [open, setOpen]                 = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [buttonAbove, setButtonAbove]   = useState(false);
  const [indicatorLeft, setIndicatorLeft] = useState(-999);

  const contentRef   = useRef(null);
  const buttonRef    = useRef(null);
  const wrapperRef   = useRef(null);
  const openTimer    = useRef(null);
  const closeTimer   = useRef(null);

  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const mutedColor  = theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
  const glassBg     = theme === 'dark'
    ? 'color-mix(in srgb, var(--color-bg) 50%, transparent)'
    : 'color-mix(in srgb, var(--color-bg) 65%, transparent)';

  const toggle = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    if (!open) {
      setOpen(true);
      openTimer.current = setTimeout(() => setContentVisible(true), 80);
    } else {
      setContentVisible(false);
      closeTimer.current = setTimeout(() => setOpen(false), 220);
    }
  };

  const collapseAndReturn = () => {
    toggle();
    setTimeout(() => {
      wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  // Watch for the toggle button scrolling above the viewport
  useEffect(() => {
    if (!open || !buttonRef.current) { setButtonAbove(false); return; }
    const obs = new IntersectionObserver(
      ([entry]) => setButtonAbove(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(buttonRef.current);
    return () => obs.disconnect();
  }, [open]);

  // Calculate pixel position of left-side indicator
  useEffect(() => {
    if (!open) return;
    const calc = () => {
      if (!wrapperRef.current) return;
      const left = wrapperRef.current.getBoundingClientRect().left;
      setIndicatorLeft(left + 10);
    };
    calc();
    window.addEventListener('resize', calc, { passive: true });
    return () => window.removeEventListener('resize', calc);
  }, [open]);

  useEffect(() => () => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current); }, []);

  // Show left indicator on desktop once the toggle button has scrolled above viewport
  const showSideIndicator = open && buttonAbove && !isMobile;

  return (
    <>
      {/* Left-side sticky collapse indicator — fixed at the left edge of the card */}
      {showSideIndicator && (
        <div
          onClick={collapseAndReturn}
          title="Collapse"
          style={{
            position:             'fixed',
            top:                  '50vh',
            left:                 indicatorLeft + 'px',
            transform:            'translateY(-50%)',
            zIndex:               200,
            cursor:               'pointer',
            display:              'flex',
            alignItems:           'center',
            justifyContent:       'center',
            width:                '28px',
            height:               '28px',
            borderRadius:         '50%',
            border:               `1px solid ${borderColor}`,
            background:           theme === 'dark'
              ? 'color-mix(in srgb, var(--color-bg) 72%, transparent)'
              : 'color-mix(in srgb, var(--color-bg) 82%, transparent)',
            backdropFilter:       'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow:            '0 2px 12px rgba(0,0,0,0.18)',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" style={{ color: mutedColor }}>
            <path d="M2 9l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Main expandable card */}
      <div
        ref={wrapperRef}
        style={{
          marginBottom:         'var(--space-10)',
          borderRadius:         open ? 'var(--radius-lg)' : '0',
          border:               open ? `1px solid ${borderColor}` : 'none',
          background:           open ? glassBg : 'none',
          backdropFilter:       open ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: open ? 'blur(20px) saturate(1.4)' : 'none',
          transition:           'background 0.4s ease, border-radius 0.3s ease',
        }}
      >
        {/* Toggle row */}
        <button
          ref={buttonRef}
          onClick={toggle}
          style={{
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'space-between',
            width:           '100%',
            padding:         open ? 'var(--space-4) var(--space-5)' : 'var(--space-4) 0',
            background:      'none',
            border:          'none',
            borderTop:       open ? 'none' : `1px solid ${borderColor}`,
            borderBottom:    `1px solid ${borderColor}`,
            cursor:          'pointer',
            gap:             'var(--space-4)',
            transition:      'padding 0.3s ease',
          }}
        >
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-sm)',
            fontWeight:    400,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color:         mutedColor,
          }}>
            {section.label ?? 'Read the full process'}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{
              flexShrink: 0,
              color:      mutedColor,
              transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Collapsible body */}
        <div
          ref={contentRef}
          style={{
            overflow:   'hidden',
            maxHeight:  open ? (contentRef.current ? contentRef.current.scrollHeight + 'px' : '9999px') : '0px',
            transition: 'max-height 0.55s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div style={{
            padding:    `var(--space-8) var(--space-5) var(--space-6) 48px`,
            opacity:    contentVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}>
            {section.sections?.map((sub, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 'var(--space-10)',
                  opacity:      contentVisible ? 1 : 0,
                  transform:    contentVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition:   `opacity 0.45s ease ${i * 70 + 80}ms, transform 0.45s ease ${i * 70 + 80}ms`,
                }}
              >
                {sub.heading && (
                  <h2 style={{
                    ...sectionStyles.sectionHeading,
                    background:           h2Gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}>
                    {sub.heading}
                  </h2>
                )}
                {sub.imagePlaceholderTop && (
                  <div style={sectionStyles.imagePlaceholder}>
                    <span style={sectionStyles.imagePlaceholderLabel}>{sub.imagePlaceholder}</span>
                  </div>
                )}
                {sub.paragraphs?.map((p, j) => (
                  <p key={j} style={sectionStyles.paragraph}>{renderParagraph(p)}</p>
                ))}
                {sub.image ? (
                  <div style={{ marginTop: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
                    <img src={sub.image} alt={sub.heading} style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
                  </div>
                ) : sub.component ? (
                  <sub.component />
                ) : sub.imageRow ? (
                  <div style={{
                    display:             'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap:                 'var(--space-4)',
                    alignItems:          'start',
                    marginTop:           'var(--space-5)',
                    marginBottom:        'var(--space-5)',
                  }}>
                    {sub.imageRow.map((src, k) => (
                      <div
                        key={k}
                        className="img-zoom-wrap"
                        style={{ cursor: 'zoom-in' }}
                        onPointerDown={onZoomStart ? onZoomStart(src, 'image') : undefined}
                        onPointerUp={onZoomEnd}
                        onPointerCancel={onZoomEnd}
                      >
                        <img
                          src={src}
                          alt=""
                          style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block' }}
                        />
                      </div>
                    ))}
                  </div>
                ) : !sub.imagePlaceholderTop && sub.imagePlaceholder ? (
                  <div style={sectionStyles.imagePlaceholder}>
                    <span style={sectionStyles.imagePlaceholderLabel}>{sub.imagePlaceholder}</span>
                  </div>
                ) : null}
                {sub.columns && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row', marginTop: 'var(--space-8)' }}>
                    {sub.columns.map((col, k) => (
                      <GoalColumn
                        key={k}
                        col={col}
                        headingStyle={sectionStyles.sectionHeading}
                        paragraphStyle={sectionStyles.paragraph}
                        h3Gradient={h3Gradient}
                        theme={theme}
                        renderParagraph={renderParagraph}
                        isLast={k === sub.columns.length - 1}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                )}
                {sub.decisions && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-6)' }}>
                    {sub.decisions.map((decision, k) => {
                      const reversed = !isMobile && decision.reverse;
                      const text = decision.paragraphs ? (
                        <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                          {decision.paragraphs.map((p, j) => (
                            <p key={j} style={{ ...sectionStyles.paragraph, margin: 0 }}>{renderParagraph(p)}</p>
                          ))}
                        </div>
                      ) : (
                        <p style={{ ...sectionStyles.paragraph, flex: '0 0 42%', margin: 0 }}>
                          {renderParagraph(decision.body)}
                        </p>
                      );
                      const placeholder = (
                        <div style={{
                          ...sectionStyles.imagePlaceholder,
                          flex:        1,
                          margin:      0,
                          minHeight:   '180px',
                          aspectRatio: 'unset',
                        }}>
                          <span style={sectionStyles.imagePlaceholderLabel}>
                            {decision.imagePlaceholder}
                          </span>
                        </div>
                      );
                      return (
                        <div
                          key={k}
                          style={{
                            display:       'flex',
                            gap:           'var(--space-8)',
                            alignItems:    'center',
                            flexDirection: isMobile ? 'column' : 'row',
                          }}
                        >
                          {reversed ? placeholder : text}
                          {reversed ? text : placeholder}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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
import Highlight      from '../components/Highlight/Highlight';
import { useTheme }   from '../context/ThemeContext';
import MdiIcon        from '@mdi/react';
import { mdiMicrophone, mdiFolderOpen, mdiChartLineVariant, mdiWallet, mdiSpeedometer, mdiEyeOutline, mdiLockOpenOutline } from '@mdi/js';

const MDI_ICONS = {
  'microphone':         mdiMicrophone,
  'folder-open':        mdiFolderOpen,
  'chart-line-variant': mdiChartLineVariant,
  'wallet':             mdiWallet,
  'speedometer':        mdiSpeedometer,
  'eye-outline':        mdiEyeOutline,
  'lock-open-outline':  mdiLockOpenOutline,
};

// Shared column card — used by both main section columns and expandable sub-section columns.
// Renders a card with optional icon, tag label, heading, and body.
function GoalColumn({ col, headingStyle, paragraphStyle, h3Gradient, theme, renderParagraph, isLast, isMobile }) {
  const isDark  = theme === 'dark';
  const hasIcon = col.icon && MDI_ICONS[col.icon];
  const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  return (
    <div style={{
      flex:          isMobile ? '1 1 100%' : '1 1 0',
      minWidth:      0,
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'flex-start',
      gap:           'var(--space-3)',
      padding:       isMobile ? 'var(--space-4) 0' : '0 var(--space-5)',
      borderRight:   !isMobile && !isLast ? `1px solid ${dividerColor}` : 'none',
      borderBottom:  isMobile && !isLast ? `1px solid ${dividerColor}` : 'none',
    }}>
      {col.tag && (
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color:         'var(--color-muted)',
          opacity:       0.6,
        }}>
          {col.tag}
        </span>
      )}
      {col.heading && (
        <h3 style={{
          ...headingStyle,
          background:           h3Gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
          margin:               0,
        }}>
          {col.heading}
        </h3>
      )}
      {hasIcon && (
        <div style={{
          width:          '100%',
          display:        'flex',
          justifyContent: 'center',
          padding:        'var(--space-4) 0',
        }}>
          <MdiIcon path={MDI_ICONS[col.icon]} size={1.6} color="var(--color-muted)" />
        </div>
      )}
      {col.body && <p style={{ ...paragraphStyle, margin: 0 }}>{renderParagraph(col.body)}</p>}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1080px',
    margin:   '0 auto',
    padding:  'var(--space-10) var(--space-6) 0',
  },
  content: {
    maxWidth:     '1000px',
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
    padding:       '2rem',
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
  // Renders a paragraph — either a plain string, or a { segments: [] } object
  // where individual segments can carry { text, highlight: true }.
  // Reusable: any case study entry can mark text for highlight by using segments.
  const renderParagraph = (p) => {
    if (typeof p === 'string') return p;
    if (p?.segments) {
      return p.segments.map((seg, i) =>
        seg.highlight ? <Highlight key={i}>{seg.text}</Highlight> : seg.text
      );
    }
    return p;
  };

  const sectionCount = project.sections?.length ?? 0;
  const bannerRef = useRef(null);
  const [showBack, setShowBack] = useState(false);
  const [preview, setPreview] = useState({ visible: false, src: null, type: 'image' });

  const showPreview   = (src, type) => setPreview({ visible: true, src, type });
  const hidePreview   = ()          => setPreview(p => ({ ...p, visible: false }));

  const holdTimerRef = useRef(null);
  const holdFiredRef = useRef(false);

  const onTouchStart = (src, type) => () => {
    holdFiredRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      holdFiredRef.current = true;
      showPreview(src, type);
    }, 3000);
  };

  const onTouchEnd = () => {
    clearTimeout(holdTimerRef.current);
  };

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
          {section.type === 'expandableProcess' ? (
            <ExpandableProcess
              section={section}
              sectionStyles={styles}
              theme={theme}
              isMobile={isMobile}
              h2Gradient={h2Gradient}
              h3Gradient={h3Gradient}
              renderParagraph={renderParagraph}
              onZoomStart={onTouchStart}
              onZoomEnd={onTouchEnd}
            />
          ) : (
          <section style={styles.section}>
            {section.headerImage && (
              <Reveal delay={0}>
                <div
                  className="img-zoom-wrap"
                  style={{ marginBottom: 'var(--space-5)', cursor: 'zoom-in' }}
                  onPointerDown={onTouchStart(section.headerImage, 'image')}
                  onPointerUp={onTouchEnd}
                  onPointerCancel={onTouchEnd}
                >
                  <img src={section.headerImage} alt={section.heading} />
                </div>
              </Reveal>
            )}
            <SectionH2 baseStyle={styles.sectionHeading} gradient={h2Gradient}>{section.heading}</SectionH2>
            {section.paragraphs?.map((p, j) => (
              <React.Fragment key={j}>
                <Reveal delay={j * 80}>
                  <p style={styles.paragraph}>{renderParagraph(p)}</p>
                </Reveal>
                {j === 0 && section.videoGrid && (
                  <Reveal delay={120}>
                    <div style={{ ...styles.videoGrid, ...(isMobile && { flexWrap: 'wrap', marginLeft: 0, marginRight: 0 }) }}>
                      {section.videoGrid.videos.map((src, k) => (
                        <div
                          key={k}
                          style={{ ...styles.videoCell, cursor: 'zoom-in' }}
                          onPointerDown={onTouchStart(src, 'video')}
                          onPointerUp={onTouchEnd}
                          onPointerCancel={onTouchEnd}
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
                  onPointerDown={onTouchStart(section.image, 'image')}
                  onPointerUp={onTouchEnd}
                  onPointerCancel={onTouchEnd}
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
                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row', marginTop: 'var(--space-5)' }}>
                  {section.columns.map((col, k) => (
                    <GoalColumn
                      key={k}
                      col={col}
                      headingStyle={styles.sectionHeading}
                      paragraphStyle={styles.paragraph}
                      h3Gradient={h3Gradient}
                      theme={theme}
                      renderParagraph={renderParagraph}
                      isLast={k === section.columns.length - 1}
                      isMobile={isMobile}
                    />
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
                        onPointerDown={(() => { const s = card.video ?? card.image; return s ? onTouchStart(s, card.video ? 'video' : 'image') : undefined; })()}
                        onPointerUp={onTouchEnd}
                        onPointerCancel={onTouchEnd}
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
          )}
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
