import React from 'react';

const styles = {
  box: {
    background:    'var(--color-surface)',
    border:        '1px solid var(--color-border)',
    borderRadius:  'var(--radius-xs)',
    padding:       'var(--space-4) var(--space-5)',
    marginBottom:  'var(--space-8)',
    // borderLeft is set dynamically from the accent prop
  },
  label: {
    fontFamily:    'var(--font-mono)',
    fontSize:      'var(--text-sm)',
    fontWeight:    300,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color:         'var(--color-muted)',
    marginBottom:  'var(--space-2)',
  },
  summary: {
    fontFamily:  'var(--font-serif)',
    fontSize:    'var(--text-md)',
    fontWeight:  300,
    fontStyle:   'italic',
    lineHeight:  1.6,
    color:       'var(--color-ink)',
    margin:      0,
  },
};

/**
 * TLDRBox
 *
 * Alert-style summary box rendered before the main content on a project page.
 *
 * @param {string} summary  - One-sentence project summary.
 * @param {string} accent   - CSS colour string for the left border.
 * @param {object} style    - Optional style overrides.
 */
export default function TLDRBox({ summary, accent = 'var(--color-brand)', style = {} }) {
  const boxStyle = {
    ...styles.box,
    borderLeft: `3px solid ${accent}`,
    ...style,
  };

  return (
    <aside style={boxStyle}>
      <div style={styles.label}>TLDR</div>
      <p style={styles.summary}>{summary}</p>
    </aside>
  );
}
