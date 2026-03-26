// ─────────────────────────────────────────────
// Design Tokens — Portfolio Design System
// ─────────────────────────────────────────────

export const color = {
  // Base
  bg:        '#000613',
  surface:   '#0D1220FB',
  surfaceAlt:'#0A112293',

  // Borders
  border:    '#1118273D',
  borderSub: '#0d1520',

  // Text
  ink:       '#FFFFFF',
  muted:     '#8A96B9',

  // Brand — use sparingly
  brand:     '#F8C623',

  // Project accent palette (one per project)
  accents: {
    violet: '#c084fc',
    sky:    '#38bdf8',
    green:  '#4ade80',
    amber:  '#fbbf24',
    pink:   '#f472b6',
    teal:   '#2dd4bf',
    orange: '#fb923c',
  },
};

export const font = {
  serif: "'Newsreader', Georgia, serif",
  mono:  "'Geist Mono', 'Fira Mono', monospace",
};

export const fontSize = {
  xs:   '0.90rem',
  sm:   '0.90rem',
  base: '1rem',
  md:   '1.10rem',
  lg:   '1.15rem',
  xl:   '1.20rem',
};

export const fontWeight = {
  light:   300,
  regular: 400,
  bold: 500,
};

export const lineHeight = {
  tight:  1.3,
  normal: 1.4,
  loose:  1.6,
};

export const letterSpacing = {
  tight:  '-0.01em',
  normal: '0em',
  wide:   '0.02em',
  wider:  '0.04em',
};

export const space = {
  0:  '0',
  1:  '0.25rem',   //  4px
  2:  '0.5rem',    //  8px
  3:  '0.75rem',   // 12px
  4:  '1rem',      // 16px
  5:  '1.25rem',   // 20px
  6:  '1.5rem',    // 24px
  8:  '2rem',      // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  20: '5rem',      // 80px
  32: '8rem',      // 128px
};

export const radii = {
  sm:   '4px',
  md:   '8px',
  lg:   '10px',
  full: '9999px',
};

export const shadow = {
  card:  '0 30px 70px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,204,36,0.04)',
  soft:  '0 4px 20px rgba(0,0,0,0.5)',
};

export const transition = {
  fast:   '0.15s ease',
  normal: '0.2s ease',
  spring: '0.22s cubic-bezier(0.22,1,0.36,1)',
};

export const layout = {
  pageMaxWidth:     '560px',
  pagePaddingX:     space[6],
  pagePaddingY:     space[20],
  pagePaddingBottom:space[32],
};

export const zIndex = {
  base:    0,
  overlay: 100,
};

export const colorLight = {
  bg:         '#FFF2D9',
  surface:    '#F1E4D6FC',
  surfaceAlt: '#F0C37F9F',
  border:     '#5555553D',
  borderSub:  '#C8C6C0',
  ink:        '#111010',
  muted:      '#5C5132',
  brand:      '#F8C623',
  accents:    color.accents,
};

// Convenience export — all tokens as one object
const tokens = { 
  color, 
  font, 
  fontSize, 
  fontWeight, 
  lineHeight, 
  letterSpacing, 
  space, 
  radii, 
  shadow, 
  transition, 
  layout, 
  zIndex };
  
export default tokens;
