// @ts-nocheck
// Highlight — inline text highlight with a marker-sweep animation.
//
// Usage:
//   <Highlight>They were rejecting being told how to budget.</Highlight>
//
// Triggers once when the element enters the viewport (IntersectionObserver).
// Color adapts to the active theme via useTheme().
// Repeatable across all case studies — just wrap any inline text.

import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Highlight({ children }) {
  const { theme }           = useTheme();
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref                 = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.7 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const color = theme === 'dark'
    ? 'rgba(33, 224, 128, 0.46)'
    : 'rgba(12, 136, 194, 0.53)';

  // Inactive: no background (sweeps in from left on reveal)
  // Active:   bottom strip (marker style)
  // Hovered:  expands upward to cover full text height
  const bgSize = !active
    ? '0% 100%'
    : hovered
      ? '100% 100%'
      : '100% 38%';

  return (
    <span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundImage:    `linear-gradient(120deg, ${color} 0%, ${color} 100%)`,
        backgroundRepeat:   'no-repeat',
        backgroundPosition: '0 100%',
        backgroundSize:     bgSize,
        opacity:            active ? 1 : 0.55,
        filter:             active ? 'blur(0px)' : 'blur(0.8px)',
        transition: [
          'background-size 0.45s cubic-bezier(0.22,1,0.36,1)',
          'opacity 0.5s ease 0.05s',
          'filter 0.5s ease 0.05s',
        ].join(', '),
      }}
    >
      {children}
    </span>
  );
}
