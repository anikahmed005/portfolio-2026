import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const EXPERIENCES = [
  {
    company:  'BudgetBuddi',
    role:     'Founder & Product Builder',
    period:   'Dec 2024 – Present',
    tools:    ['React Native', 'Claude', 'Figma', 'Supabase'],
    body:     'Sole designer and builder of a cross-platform mobile budgeting app, taking the product from concept to beta in under 4 months.',
    callout:  'Built a design system based on tokens for reusable components, which allowed me to build 30+ screens across iOS and Android. and architected 3 third-party API integrations: Supabase, Plaid, and Claude AI.',
  },
  {
    company:  'Signal and Strategy',
    role:     'Product Designer',
    period:   '2024 – Present',
    tools:    ['Figma', 'Webflow', 'Adobe Photoshop'],
    body:     'Established brand identity and digital presence by designing and developing the company\'s website from the ground up, creating cohesive visual systems.',
    callout:  'Drove brand positioning strategy by translating complex AI concepts into accessible visual narratives that resonate with diverse client segments.',
  },
  {
    company:  'Tech Fleet',
    role:     'Lead UX Writer',
    period:   'Nov 2024 – May 2025',
    tools:    ['Figma', 'Dovetail'],
    body:     'Spearheaded roadmapping of UX Writing deliverables to maximise impact across workstreams and manage clientele\'s business needs.',
    callout:  'Facilitated cross-functional collaboration with design, research, product strategy, and development teams to reduce goal misalignment during Agile sprints.',
  },
];

function ToolPill({ label, isDark }) {
  return (
    <span style={{
      fontFamily:    'var(--font-mono)',
      fontSize:      '10px',
      letterSpacing: '0.04em',
      color:         'var(--color-muted)',
      border:        `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'}`,
      borderRadius:  '4px',
      padding:       '2px 7px',
    }}>
      {label}
    </span>
  );
}

export default function ExperienceTimeline() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const lineColor   = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const dotColor    = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)';
  const dotBg       = isDark ? '#0a0f1e' : '#ffffff';

  return (
    <section style={{ marginBottom: 'var(--space-14)' }}>
      <h2 style={{
        fontFamily:    'var(--font-serif)',
        fontSize:      'var(--text-lg)',
        fontWeight:    400,
        color:         'var(--color-ink)',
        marginBottom:  'var(--space-6)',
        letterSpacing: '-0.01em',
      }}>
        Experience
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {EXPERIENCES.map((exp, i) => {
          const isLast = i === EXPERIENCES.length - 1;
          return (
            <div key={i} style={{ display: 'flex', gap: '16px' }}>

              {/* Timeline spine */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width:        '10px',
                  height:       '10px',
                  borderRadius: '50%',
                  border:       `1.5px solid ${dotColor}`,
                  background:   dotBg,
                  marginTop:    '4px',
                  flexShrink:   0,
                }} />
                {!isLast && (
                  <div style={{
                    width:      '1px',
                    flex:       1,
                    background: lineColor,
                    marginTop:  '6px',
                    marginBottom: '6px',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: isLast ? 0 : 'var(--space-8)', minWidth: 0 }}>
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xs)',
                  letterSpacing: '0.03em',
                  color:         'var(--color-brand)',
                  opacity:       0.85,
                }}>
                  {exp.company}
                </span>

                <p style={{
                  fontFamily:  'var(--font-serif)',
                  fontSize:    'var(--text-base)',
                  fontWeight:  400,
                  color:       'var(--color-ink)',
                  margin:      '2px 0 6px',
                }}>
                  {exp.role}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '6px' }}>
                  {exp.tools.map((t, j) => <ToolPill key={j} label={t} isDark={isDark} />)}
                </div>

                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '11px',
                  letterSpacing: '0.03em',
                  color:         'var(--color-muted)',
                  opacity:       0.55,
                  marginBottom:  '8px',
                }}>
                  {exp.period}
                </p>

                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize:   'var(--text-sm)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color:      'var(--color-ink)',
                  opacity:    0.8,
                }}>
                  {exp.body}{' '}
                  <strong style={{ fontWeight: 500, opacity: 1 }}>{exp.callout}</strong>
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
