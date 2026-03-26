import React from 'react';
import avatarSrc from '../../assets/avatar.jpg';

const styles = {
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
    display: 'block',
    flexShrink: 0,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

// Placeholder SVG shown when no src is provided
function Placeholder() {
  return (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="52" height="52" fill="#111827" />
      <circle cx="26" cy="20" r="9" fill="#1e2a40" />
      <ellipse cx="26" cy="44" rx="14" ry="10" fill="#1e2a40" />
    </svg>
  );
}

/**
 * Avatar
 *
 * @param {string}  src   - Image URL. Omit to show placeholder.
 * @param {string}  alt   - Alt text for the image.
 * @param {object}  style - Optional style overrides.
 */
export default function Avatar({ src = avatarSrc, alt = 'Anik Ahmed', style = {} }) {
  return (
    <div style={{ ...styles.avatar, ...style }} aria-hidden={!src}>
      {src
        ? <img src={src} alt={alt} style={{ ...styles.img, objectPosition: 'center 15%' }} />
        : <Placeholder />
      }
    </div>
  );
}
