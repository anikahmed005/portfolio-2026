import React from 'react';

const styles = {
  footer: {
    marginTop: 'var(--space-14)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-sm)',
    fontWeight: 300,
    color: 'var(--color-muted)',
    letterSpacing: '0.03em',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--color-brand)',
    opacity: 0.7,
    flexShrink: 0,
  },
};

/**
 * Footer
 *
 * @param {string} name  - Your name, used in the copyright line.
 * @param {number} year  - Copyright year. Defaults to current year.
 */
export default function Footer({ name = 'Your Name', year }) {
  const y = year ?? new Date().getFullYear();
  return (
    <footer style={styles.footer}>
      <span style={styles.dot} aria-hidden="true" />
      <span>© {y} {name} — All rights reserved</span>
    </footer>
  );
}
