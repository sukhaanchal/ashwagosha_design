export const COLORS = {
  // Core
  primary: '#1a1a1a',
  accent: '#8a3a1a',
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',

  // Text hierarchy
  textPrimary: '#303030',
  textSecondary: '#8a8a8a',
  textBody: '#3a3a3a',
  textMuted: '#9a9a9a',
  textSubtle: '#7a7a7a',
  textDevanagari: '#c8c8ce',

  // Backgrounds
  bgHome: '#fafafa',
  bgPage: '#e9eaec',
  bgFull: '#f4f4f6',
  bgCard: '#ffffff',
  bgChip: '#f4f4f6',
  bgPill: '#f2f2f4',
  bgWarm: '#f6f2ea',
  bgAvoid: '#faf6f4',

  // Borders
  border: '#e4e4e8',
  borderLight: '#ececef',
  borderWarm: '#e8e1d3',
  borderInactive: '#d5d5da',

  // Buttons
  buttonDark: '#303030',
  buttonLight: '#f5f5f7',

  // Functional
  green: '#34c759',
  star: '#e8a838',
  dot: '#8a3a1a',
  selectedDay: '#111111',

  // Tab bar
  tabActive: '#303030',
  tabInactive: '#8a8a8a',
  tabBarBg: 'rgba(255,255,255,0.85)',
  tabBarBorder: 'rgba(255,255,255,0.6)',

  // Overlays & shadows
  shadow: 'rgba(0,0,0,0.08)',
  overlay: 'rgba(0,0,0,0.5)',

  // Gradients (CalendarScreen sky)
  skyGradient: '#c8d8e8',
  sphereGradient: '#b8c4d8',
  sphereInner: 'rgba(255,255,255,0.35)',
  glyphBg: 'rgba(255,255,255,0.6)',
};

export const FONTS = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
  monoSemiBold: 'IBMPlexMono_600SemiBold',
};

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 16,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 20,
  xxl: 28,
  pill: 999,
};

export const SHADOWS = {
  card: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  soft: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 34,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FONTS.semiBold,
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.textPrimary,
  },

  // Body
  bodyLarge: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textBody,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textBody,
  },
  bodySmall: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textBody,
  },

  // Labels & captions
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.accent,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textSecondary,
  },
  captionMedium: {
    fontFamily: FONTS.medium,
    fontSize: 12.5,
    lineHeight: 16,
    color: COLORS.textSecondary,
  },

  // Card text
  cardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.textPrimary,
    letterSpacing: -0.1,
  },
  cardSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 16,
    color: COLORS.textSecondary,
  },

  // Buttons
  buttonText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.white,
  },
  buttonTextDark: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textPrimary,
  },

  // Brand
  brandLarge: {
    fontFamily: FONTS.medium,
    fontSize: 22,
    letterSpacing: 1.8,
    color: COLORS.textPrimary,
  },
  brandSmall: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    letterSpacing: 0.4,
    color: COLORS.textPrimary,
  },

  // Mono
  mono: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textBody,
  },
  monoMedium: {
    fontFamily: FONTS.monoMedium,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textBody,
  },
};

export const ICON_SIZES = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 28,
  xl: 36,
};
