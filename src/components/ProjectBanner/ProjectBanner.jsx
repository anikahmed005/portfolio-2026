// @ts-nocheck
import React from 'react';
import Tag from '../Tag/Tag';
import CTAButton from '../CTAButton/CTAButton';
import { useTheme } from '../../context/ThemeContext';

import claudeLogo    from '../../assets/tools/claude.png';
import figmaLogo     from '../../assets/tools/figma.png';
import reactLogo     from '../../assets/tools/react.png';
import geminiLogo    from '../../assets/tools/gemini.png';
import dovetailLogo  from '../../assets/tools/dovetail.png';
import photoshopLogo from '../../assets/tools/photoshop.png';
import googlePlayBadge from '../../assets/GetItOnGooglePlay_Badge_Web_color_English.png';
import { fontSize } from '@ds/tokens/tokens';

export const TOOL_LOGOS = {
  claude:    claudeLogo,
  figma:     figmaLogo,
  react:     reactLogo,
  gemini:    geminiLogo,
  dovetail:  dovetailLogo,
  photoshop: photoshopLogo,
};

const s = {
  banner: {
    width:        '100%',
    borderRadius: 'var(--radius-lg)',
    overflow:     'hidden',
    marginBottom: '50px',
  },
  inner: {
    display:       'flex',
    flexDirection: 'column',
    gap:           'var(--space-3)',
    padding:       'var(--space-6) var(--space-6) var(--space-6)',
  },
  title: {
    fontFamily:    'var(--font-serif)',
    fontSize:      'clamp(1.75rem, 3.5vw, 2.5rem)',
    fontWeight:    500,
    letterSpacing: '-0.02em',
    lineHeight:    1.15,
    color:         'var(--color-ink)',
    margin:        0,
  },
  category: {
    fontFamily: 'var(--font-serif)',
    fontSize:   'var(--text-base)',
    fontWeight: 300,
    fontStyle:  'italic',
    color:      'var(--color-muted)',
    margin:     0,
  },
  year: {
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-xs)',
    fontWeight:    300,
    color:         'var(--color-muted)',
    letterSpacing: '0.02em',
    margin:        0,
  },
  tags: {
    display:  'flex',
    flexWrap: 'wrap',
    gap:      'var(--space-2)',
    fontSize: 'clamp(0.75rem)'
    
  },
  divider: {
    width:  '100%',
    height: '1px',
    background: 'var(--color-muted)',
    margin: 'var(--space-2) 0',
  },
  toolsLabel: {
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-xs)',
    fontWeight:    300,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color:         'var(--color-muted)',
  },
  toolsRow: {
    display: 'flex',
    gap:     'var(--space-3)',
    flexWrap:'wrap',
  },
};

export default function ProjectBanner({ project }) {
  const { theme } = useTheme();

  const titleGradient = theme === 'dark'
    ? 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)'
    : 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)';

  const chipBg     = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.75)';
  const chipBorder = theme === 'dark' ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.85)';

  return (
    <div style={{
      ...s.banner,
      background:           theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
      backdropFilter:       'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border:               `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)'}`,
      borderBottom:         `2px solid ${project.accent}`,
      boxShadow:            theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.06)',
    }}>
      <div style={s.inner}>

        {/* Title */}
        <h1 style={{
          ...s.title,
          background:           titleGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
        }}>
          {project.title}
        </h1>

        {/* Category */}
        {project.category && <p style={s.category}>{project.category}</p>}

        {/* Year */}
        {project.year && <p style={s.year}>{project.year}</p>}

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div style={s.tags}>
            {project.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
        )}

        {/* Tools */}
        {project.tools?.length > 0 && (
          <>
            <div style={s.divider} />
            <span style={s.toolsLabel}>Tools Used</span>
            <div style={s.toolsRow}>
              {project.tools.map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  style={{
                    display:             'flex',
                    alignItems:          'center',
                    justifyContent:      'center',
                    width:               '48px',
                    height:              '48px',
                    borderRadius:        'var(--radius-md)',
                    background:          chipBg,
                    backdropFilter:      'blur(10px)',
                    WebkitBackdropFilter:'blur(10px)',
                    border:              `1px solid ${chipBorder}`,
                    padding:             '10px',
                  }}
                >
                  {TOOL_LOGOS[tool.key] && (
                    <img
                      src={TOOL_LOGOS[tool.key]}
                      alt={tool.name}
                      style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* TL;DR */}
        {project.tldr && (
          <>
            <div style={s.divider} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xs)',
                fontWeight:    400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color:         'var(--color-ink)',
              }}>
                TL;DR
              </span>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize:   'var(--text-base)',
                fontWeight: 600,
                fontStyle:  'italic',
                lineHeight: 1.6,
                color:      'var(--color-muted)',
                margin:     0,
              }}>
                {project.tldr}
              </p>
            </div>
          </>
        )}

        {/* CTA */}
        {(project.cta || project.googlePlayHref) && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            {project.cta && (
              <CTAButton
                href={project.cta.href}
                label={project.cta.label}
              />
            )}
            {project.googlePlayHref && (
              <a
                href={project.googlePlayHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  style={{ height: '36px', width: 'auto', display: 'block' }}
                />
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
