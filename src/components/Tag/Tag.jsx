import React from 'react';
import { color } from '../../tokens/tokens';

const styles = {
  pill: {
    display:       'inline-block',
    fontFamily:    'var(--font-monospace)',
    fontSize:      'var(--text-sm)',
    fontWeight:    400,
    letterSpacing: '0.03em',
    color:         'var(--color-ink)',
    border:        '2px solid var(--color-border)',
    borderRadius:  'var(--radius-full)',
    padding:       '0.2rem 0.55rem',
    lineHeight:    1.4,
    whiteSpace:    'nowrap',
  },
};

/**
 * Tag
 *
 * A compact monospace pill used to label a project's type.
 *
 * @param {string} label  - Tag text (lowercase recommended).
 * @param {object} style  - Optional style overrides.
 */
export default function Tag({ label, style = {} }) {
  return (
    <span style={{ ...styles.pill, ...style }}>
      {label}
    </span>
  );
}
