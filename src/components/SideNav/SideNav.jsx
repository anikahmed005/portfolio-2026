import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const LINKS = [
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
];

export default function SideNav() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState('');

  const highlightColor = isDark
    ? 'rgba(33, 224, 128, 0.46)'
    : 'rgba(12, 136, 194, 0.53)';

  useEffect(() => {
    const observers = [];

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <style>{`
        .sidenav-root {
          position: fixed;
          left: max(1rem, calc(50vw - 305px - 110px));
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 50;
        }
        @media (max-width: 900px) {
          .sidenav-root { display: none; }
        }
      `}</style>

      <nav className="sidenav-root" aria-label="Page sections">
        {LINKS.map(({ label, id }) => {
          const isActive  = active === id;
          const isHovered = hovered === id;
          const bgSize = isActive
            ? isHovered ? '100% 100%' : '100% 38%'
            : '0% 38%';

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered('')}
              style={{
                background:   'none',
                border:       'none',
                cursor:       'pointer',
                padding:      '2px 0',
                textAlign:    'left',
              }}
            >
              <span style={{
                fontFamily:          'var(--font-mono)',
                fontSize:            '11px',
                color:               isActive
                  ? 'var(--color-ink)'
                  : isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                whiteSpace:          'nowrap',
                backgroundImage:     `linear-gradient(120deg, ${highlightColor} 0%, ${highlightColor} 100%)`,
                backgroundRepeat:    'no-repeat',
                backgroundPosition:  '0 100%',
                backgroundSize:      bgSize,
                transition: [
                  'background-size 0.45s cubic-bezier(0.22,1,0.36,1)',
                  'color 0.3s ease',
                ].join(', '),
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
