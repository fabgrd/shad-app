/* ============================================================
   Shad — Design tokens (React Native)
   Ported from the Shad Design System (calm / zen / minimalist).
   Sky-blue accent on a cool off-white slate canvas.
   ============================================================ */

export const palette = {
  // Neutral slate (cool, calm)
  slate950: '#0E1417',
  slate900: '#18242A', // primary ink
  slate800: '#263238',
  slate700: '#3A474E',
  slate600: '#56646B',
  slate500: '#74828A',
  slate400: '#9AA5AB',
  slate300: '#C4CCD0',
  slate200: '#E2E7E9', // hairline borders
  slate100: '#EEF2F3',
  slate50: '#F6F9FA', // app canvas
  white: '#FFFFFF',
  black: '#0A0F11',

  // Sky (primary accent)
  sky50: '#ECF7FF',
  sky100: '#D2ECFF',
  sky200: '#A6D9FF',
  sky300: '#72C3FF',
  sky400: '#44B0FF',
  sky500: '#1DA0FF', // base
  sky600: '#0F84DB',
  sky700: '#0C68AD',
  sky800: '#0D5485',

  // Sage (growth / wellbeing)
  sage500: '#2A9C63',
  sage50: '#EDF8F2',

  // Semantic raw
  green500: '#2FB67C',
  green50: '#E9F8F1',
  amber500: '#F5A524',
  amber50: '#FEF6E7',
  red500: '#E0494B',
  red50: '#FDECEC',

  // Mood scale (feeling journal)
  mood1: '#E0494B',
  mood2: '#F5A524',
  mood3: '#F2C94C',
  mood4: '#56C2F0',
  mood5: '#2FB67C',
};

export const colors = {
  canvas: palette.slate50,
  surface: palette.white,
  surfaceMuted: palette.slate100,

  border: palette.slate200,
  borderStrong: palette.slate300,
  divider: palette.slate100,

  textPrimary: palette.slate900,
  textSecondary: palette.slate600,
  textTertiary: palette.slate400,
  textOnAccent: palette.white,

  // Accent (Sky)
  accent: palette.sky500,
  accentHover: palette.sky600,
  accentPress: palette.sky700,
  accentSoft: palette.sky50,
  accentSoft2: palette.sky100,
  accentText: palette.sky700,

  // Ink (solid primary CTA)
  ink: palette.slate900,
  inkPress: palette.slate950,

  success: palette.green500,
  successSoft: palette.green50,
  warning: palette.amber500,
  warningSoft: palette.amber50,
  danger: palette.red500,
  dangerSoft: palette.red50,
};

// Spacing — 4px base grid
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  gutter: 20, // screen horizontal padding
};

// Radius — soft / generous
export const radius = {
  xs: 6,
  sm: 10,
  md: 14, // inputs, small buttons
  lg: 18, // buttons
  xl: 22, // cards
  xxl: 28, // sheets
  pill: 999,
};

// Typography. The app ships Roboto binaries; we keep using them but
// map the design's weight intent onto the available Roboto faces.
export const font = {
  regular: 'Roboto',
  medium: 'Roboto', // no medium face shipped — falls back to regular
  bold: 'Roboto-Bold',
  light: 'Roboto-Light',
};

export const fontSize = {
  display: 34,
  title1: 26,
  title2: 22,
  title3: 18,
  bodyLg: 17,
  body: 15,
  label: 14,
  caption: 13,
  micro: 11,
};

export const shadow = {
  xs: {
    shadowColor: '#18242A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#18242A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#18242A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  accent: {
    shadowColor: palette.sky500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
};

const theme = { palette, colors, space, radius, font, fontSize, shadow };
export default theme;
