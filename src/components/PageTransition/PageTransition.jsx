import React from 'react';

/**
 * PageTransition
 *
 * Wraps an element and fades it in using a CSS keyframe animation.
 * Use `delay` to stagger multiple elements sequentially.
 *
 * @param {ReactNode} children  - Content to animate.
 * @param {number}    delay     - Animation start delay in ms (default 0).
 * @param {object}    style     - Optional additional styles on the wrapper div.
 */
export default function PageTransition({ children, delay = 0, style = {} }) {
  return (
    <div style={{
      opacity:        0,
      animation:      'fadeUp 0.2s ease forwards',
      animationDelay: `${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}
