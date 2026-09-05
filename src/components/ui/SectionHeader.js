import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../design-system/tokens';
import { Typography } from './Typography';

export function SectionHeader({ title, icon, variant = 'label', action, style }) {
  if (variant === 'title') {
    return (
      <View style={[styles.titleRow, style]}>
        <Typography variant="h3">{title}</Typography>
        {action}
      </View>
    );
  }

  return (
    <View style={[styles.labelRow, style]}>
      {icon}
      <Typography variant="label">{title}</Typography>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
});
