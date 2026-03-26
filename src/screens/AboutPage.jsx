// @ts-nocheck
import React from 'react';
import Footer        from '../components/Footer/Footer';
import NavLink       from '../components/NavLink/NavLink';
import PageTransition from '../components/PageTransition/PageTransition';
import ThemeToggle   from '../components/ThemeToggle/ThemeToggle';
import { useTheme }  from '../context/ThemeContext';
import aboutImg      from '../assets/about-img.jpg';

function useIsMobile(breakpoint = 720) {
  const [mobile, setMobile] = React.useState(() => window.innerWidth < breakpoint);
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [breakpoint]);
  return mobile;
}

const styles = {
  page: {
    maxWidth: '860px',
    margin:   '0 auto',
    padding:  'var(--space-20) var(--space-6) var(--space-32)',
  },
  backRow: {
    display:      'flex',
    alignItems:   'center',
    gap:          'var(--space-5)',
    marginBottom: 'var(--space-14)',
  },
  heading: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'clamp(2rem, 5vw, 3rem)',
    fontWeight:    400,
    letterSpacing: '-0.02em',
    lineHeight:    1.15,
    color:         'var(--color-ink)',
    margin:        '0 0 var(--space-10) 0',
  },
  body: {
    fontFamily:  'var(--font-serif)',
    fontSize:    'clamp(1rem, 1.5vw, 1.125rem)',
    fontWeight:  300,
    lineHeight:  1.75,
    color:       'var(--color-ink)',
    margin:      0,
  },
  imagePlaceholder: {
    width:        '100%',
    aspectRatio:  '3 / 4',
    borderRadius: 'var(--radius-lg)',
    overflow:     'hidden',
    border:       '1px solid var(--color-border)',
    flexShrink:   0,
  },
};

export default function AboutPage({ onBack }) {
  const { theme } = useTheme();
  const isMobile  = useIsMobile();

  const chipBg     = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)';
  const chipBorder = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)';

  return (
    <div style={styles.page}>
      {/* ── Back nav ── */}
      <PageTransition delay={0}>
        <div style={styles.backRow}>
          <NavLink
            href="/"
            onClick={onBack ? (e) => { e.preventDefault(); onBack(); } : undefined}
          >
            ← Work
          </NavLink>
          <ThemeToggle />
        </div>
      </PageTransition>

      {/* ── Two-column layout ── */}
      <PageTransition delay={60}>
        <div style={{
          display:       'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap:           isMobile ? 'var(--space-10)' : 'var(--space-14)',
          alignItems:    'flex-start',
        }}>

          {/* Left — text */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <h1 style={styles.heading}>About me</h1>

            <p style={styles.body}>
              I'm Anik Ahmed, a product designer based in New York focused on
              building thoughtful digital experiences — from mobile apps and
              enterprise platforms to interactive web. I care deeply about the
              space where strategy, research, and craft intersect, and I'm most
              energized when working on products that make everyday tasks feel
              effortless.
            </p>

            <p style={{ ...styles.body, marginTop: 'var(--space-5)' }}>
              Outside of client work I'm usually shipping side projects,
              exploring new interaction patterns, or diving into a new design
              system challenge. BudgetBuddi is my most recent venture — an
              AI-assisted budgeting app I designed and built end-to-end.
            </p>

            {/* Contact chips */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
              <a
                href="https://www.linkedin.com/in/anikahmed005/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{
                  display:             'inline-flex',
                  alignItems:          'center',
                  gap:                 'var(--space-2)',
                  padding:             '0.45rem var(--space-4)',
                  borderRadius:        'var(--radius-sm)',
                  background:          chipBg,
                  backdropFilter:      'blur(12px)',
                  WebkitBackdropFilter:'blur(12px)',
                  border:              `1px solid ${chipBorder}`,
                  fontFamily:          'var(--font-mono)',
                  fontSize:            'var(--text-xs)',
                  letterSpacing:       '0.04em',
                  textTransform:       'uppercase',
                  color:               'var(--color-muted)',
                  textDecoration:      'none',
                  transition:          'color 0.2s',
                }}
              >
                LinkedIn ↗
              </a>
              <a
                href="mailto:anikahmedux@gmail.com"
                title="Email"
                style={{
                  display:             'inline-flex',
                  alignItems:          'center',
                  gap:                 'var(--space-2)',
                  padding:             '0.45rem var(--space-4)',
                  borderRadius:        'var(--radius-sm)',
                  background:          chipBg,
                  backdropFilter:      'blur(12px)',
                  WebkitBackdropFilter:'blur(12px)',
                  border:              `1px solid ${chipBorder}`,
                  fontFamily:          'var(--font-mono)',
                  fontSize:            'var(--text-xs)',
                  letterSpacing:       '0.04em',
                  textTransform:       'uppercase',
                  color:               'var(--color-muted)',
                  textDecoration:      'none',
                  transition:          'color 0.2s',
                }}
              >
                Email ↗
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div style={{
            ...styles.imagePlaceholder,
            flex: isMobile ? 'none' : '0 0 300px',
            width: isMobile ? '100%' : '300px',
          }}>
            <img
              src={aboutImg}
              alt="Anik Ahmed"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%', display: 'block' }}
            />
          </div>

        </div>
      </PageTransition>

      {/* ── Footer ── */}
      <PageTransition delay={180}>
        <Footer name="Anik Ahmed" />
      </PageTransition>
    </div>
  );
}
