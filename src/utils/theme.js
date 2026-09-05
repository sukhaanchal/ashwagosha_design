import {
  COLORS as DS_COLORS,
  FONTS as DS_FONTS,
  SPACING as DS_SPACING,
  RADIUS as DS_RADIUS,
} from '../design-system/tokens';

export const COLORS = {
  ...DS_COLORS,
  // Legacy aliases for existing components
  muted: DS_COLORS.textMuted,
  subtle: DS_COLORS.textSubtle,
  light: DS_COLORS.textBody,
  borderLight: DS_COLORS.borderLight,
  cardBg: DS_COLORS.bgCard,
  pageBg: DS_COLORS.bgPage,
  homeBg: DS_COLORS.bgHome,
  fullBg: DS_COLORS.bgFull,
  chipBg: DS_COLORS.bgChip,
  pillBg: DS_COLORS.bgPill,
  warmBg: DS_COLORS.bgWarm,
  warmBorder: DS_COLORS.borderWarm,
  devanagari: DS_COLORS.textDevanagari,
  avoidBg: DS_COLORS.bgAvoid,
  starColor: DS_COLORS.star,
};

export const FONTS = DS_FONTS;

export const SPACING = {
  ...DS_SPACING,
  // Legacy values for existing components
  xl: 18,
  xxl: 22,
  xxxl: 24,
};

export const RADIUS = {
  ...DS_RADIUS,
  // Legacy values for existing components
  circle: 50,
};
