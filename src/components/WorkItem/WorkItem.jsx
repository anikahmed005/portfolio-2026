import React, { useState } from 'react';

const styles = {
  item: {
    listStyle: 'none',
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 'var(--space-4)',
    padding: '0.9rem var(--space-2)',
    borderBottom: '1px solid var(--color-border)',
    textDecoration: 'none',
    color: 'var(--color-ink)',
    borderRadius: 'var(--radius-sm)',
    margin: '0 calc(-1 * var(--space-2))',
    transition: 'background var(--transition-fade)',
    cursor: 'pointer',
  },
  linkHover: {
    background: 'var(--color-surface-alt)',
  },
  left: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 'var(--text-md)',
    fontWeight: 400,
    lineHeight: 1.35,
    transition: 'color var(--transition-normal)',
  },
  titleHover: {
    color: 'var(--color-brand)',
  },
  category: {
    fontSize: 'var(--text-base)',
    color: 'var(--color-muted)',
    fontWeight: 400,
    fontStyle: 'italic',
    marginTop: '0.1rem',
  },
  year: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-sm)',
    fontWeight: 300,
    color: 'var(--color-muted)',
    letterSpacing: 'var(--letter-wide)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
};

/**
 * WorkItem
 *
 * A single row in the portfolio work list.
 *
 * @param {string}   title      - Project name.
 * @param {string}   category   - Short descriptor, shown in italic below title.
 * @param {string}   year       - Year or range (e.g. "2024–present").
 * @param {string}   href       - Link destination.
 * @param {string}   accent     - CSS color string for the preview thumbnail accent.
 * @param {string}   bg         - CSS color string for the preview thumbnail background.
 * @param {boolean}  isFirst    - If true, adds a top border (for the first item in the list).
 * @param {function} onMouseEnter - Called with the item's data when the mouse enters.
 * @param {function} onMouseLeave - Called when the mouse leaves.
 */
export default function WorkItem({
  title,
  category,
  year,
  href = '#',
  accent,
  bg,
  image,
  isFirst = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  style,
}) {
  const [over, setOver] = useState(false);

  function handleEnter(e) {
    setOver(true);
    onMouseEnter?.({ title, year, accent, bg, image, event: e });
  }

  function handleLeave(e) {
    setOver(false);
    onMouseLeave?.(e);
  }

  const linkStyle = {
    ...styles.link,
    ...(isFirst ? { borderTop: '1px solid var(--color-border)' } : {}),
    ...(over ? styles.linkHover : {}),
  };

  const titleStyle = {
    ...styles.title,
    ...(over ? styles.titleHover : {}),
  };

  return (
    <li style={{ ...styles.item, ...style }}>
      <a
        href={href}
        style={linkStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={onClick}
      >
        <div style={styles.left}>
          <div style={titleStyle}>{title}</div>
          {category && <div style={styles.category}>{category}</div>}
        </div>
        {year && <span style={styles.year}>{year}</span>}
      </a>
    </li>
  );
}
