import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../design-system/tokens';

export function Divider({ style }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
});
