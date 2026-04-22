import React from 'react';
import { useTheme } from '../../context/ThemeContext';

import logoClaude     from '../../assets/tools/claude.png';
import logoDovetail   from '../../assets/tools/dovetail.png';
import logoFigma      from '../../assets/tools/figma.png';
import logoPhotoshop  from '../../assets/tools/photoshop.png';
import logoReact      from '../../assets/tools/react.png';
import logoHtml       from '../../assets/tools/HTML5.png';
import logoCss        from '../../assets/tools/CSS3.png';
import logoJavaScript from '../../assets/tools/JavaScript.png';
import logoLovable from '../../assets/tools/lovable-icon-bg-light.png';
import logoChatGPT from '../../assets/tools/chatgpt.png';
import logoSketch from '../../assets/tools/sketch.png';
import logoWebflow from '../../assets/tools/webflow.png';
import logoFramer from '../../assets/tools/Framer Icon (White Transparent).png';
import logoCanva from '../../assets/tools/canva.png';
import logoAdobePhotoshop from '../../assets/tools/photoshop.png';

const ROW_1 = [
  { label: 'Figma',        logo: logoFigma },
  { label: 'Claude',       logo: logoClaude },
  { label: 'Dovetail',     logo: logoDovetail },
  { label: 'React Native', logo: logoReact },
  { label: 'HTML',         logo: logoHtml },
  { label: 'CSS',          logo: logoCss },
  { label: 'JavaScript',   logo: logoJavaScript },
];

const ROW_2 = [
  { label: 'Adobe Photoshop', logo: logoPhotoshop },
  { label: 'Canva',           logo: logoCanva },
  { label: 'Webflow',         logo: logoWebflow },
  { label: 'Framer',          logo: logoFramer },
  { label: 'Lovable',         logo: logoLovable },
  { label: 'ChatGPT',         logo: logoChatGPT },
  { label: 'Sketch',          logo: logoSketch },
];

function Pill({ label, logo, isDark }) {
  return (
    <div style={{
      display:    'inline-flex',
      alignItems: 'center',
      gap:        '8px',
      padding:    '6px 14px',
      borderRadius: 'var(--radius-sm)',
      border:     `1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.08)'}`,
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
      flexShrink: 0,
    }}>
      {logo
        ? <img src={logo} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
        : <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)', flexShrink: 0 }} />
      }
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize:   'var(--text-xs)',
        color:      'var(--color-ink)',
        opacity:    0.75,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction, isDark }) {
  const doubled = [...items, ...items];
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{
        display:   'flex',
        gap:       '10px',
        width:     'max-content',
        animation: `${animationName} 22s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <Pill key={i} label={item.label} logo={item.logo} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

export default function ToolsCarousel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section style={{ marginBottom: 'var(--space-14)' }}>
      <h2 style={{
        fontFamily:    'var(--font-serif)',
        fontSize:      'var(--text-lg)',
        fontWeight:    400,
        color:         'var(--color-ink)',
        marginBottom:  'var(--space-5)',
        letterSpacing: '-0.01em',
      }}>
        What I work with
      </h2>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <MarqueeRow items={ROW_1} direction="left"  isDark={isDark} />
          <MarqueeRow items={ROW_2} direction="right" isDark={isDark} />
        </div>
        {['left', 'right'].map(side => (
          <div key={side} style={{
            position:   'absolute',
            top:        0,
            [side]:     0,
            width:      '80px',
            height:     '100%',
            background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--color-bg) 0%, transparent 100%)`,
            pointerEvents: 'none',
            zIndex:     1,
          }} />
        ))}
      </div>
    </section>
  );
}
