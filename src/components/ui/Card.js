import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../design-system/tokens';

export function Card({ variant = 'default', style, children, ...props }) {
  return (
    <View style={[styles.base, variants[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
  },
});

const variants = {
  default: {},
  bordered: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  warm: {
    backgroundColor: COLORS.bgWarm,
    borderWidth: 1,
    borderColor: COLORS.borderWarm,
    borderRadius: RADIUS.xl,
  },
  flat: {
    backgroundColor: COLORS.bgFull,
  },
};
