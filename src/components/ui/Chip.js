import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../design-system/tokens';
import { Typography } from './Typography';

export function Chip({ label, icon, active, style, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.active, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
      <Typography
        variant="captionMedium"
        style={active ? styles.activeText : styles.text}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgPill,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  active: {
    backgroundColor: COLORS.buttonDark,
  },
  text: {
    color: COLORS.textPrimary,
  },
  activeText: {
    color: COLORS.white,
  },
});
