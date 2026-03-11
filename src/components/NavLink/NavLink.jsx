import React, { useState } from 'react';

const base = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-sm)',
  fontWeight: 300,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  textDecoration: 'none',
  transition: 'color var(--transition-fast)',
  cursor: 'pointer',
};

const hovered = {
  color: 'var(--color-ink)',
};

/**
 * NavLink
 *
 * A small uppercase monospace navigation anchor.
 *
 * @param {string}    href      - Link destination.
 * @param {ReactNode} children  - Label text.
 * @param {object}    style     - Optional style overrides.
 */
export default function NavLink({ href = '#', children, style = {}, onClick }) {
  const [over, setOver] = useState(false);

  return (
    <a
      href={href}
      style={{ ...base, ...(over ? hovered : {}), ...style }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
