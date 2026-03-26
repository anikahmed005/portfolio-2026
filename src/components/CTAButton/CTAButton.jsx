import React, { useState } from 'react';

const base = {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            'var(--space-2)',
  width:          'fit-content',
  fontFamily:     'var(--font-mono)',
  fontSize:       'var(--text-sm)',
  fontWeight:     300,
  letterSpacing:  '0.04em',
  color:          'var(--color-ink)',
  border:         '1px solid var(--color-border)',
  borderRadius:   'var(--radius-sm)',
  padding:        '0.45rem var(--space-4)',
  textDecoration: 'none',
  transition:     'background var(--transition-fast), border-color var(--transition-fast)',
  cursor:         'pointer',
  marginTop:      'var(--space-5)',
};

const hovered = {
  background:  'var(--color-brand)',
  borderColor: 'var(--color-surface)',
  color: 'var(--color-surface)'
};

/**
 * CTAButton
 *
 * An outlined anchor styled as a call-to-action. Opens in a new tab.
 *
 * @param {string} href   - Destination URL.
 * @param {string} label  - Button text (↗ is appended automatically).
 * @param {object} style  - Optional style overrides.
 */
export default function CTAButton({ href, label, style = {} }) {
  const [over, setOver] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...base, ...(over ? hovered : {}), ...style }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
