import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design-system/tokens';
import { Typography } from './Typography';

export function Button({ variant = 'primary', label, icon, style, textStyle, onPress, children }) {
  const variantStyle = variants[variant] || variants.primary;

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
      {label ? (
        <Typography
          variant="buttonText"
          style={[variantStyle.text, textStyle]}
        >
          {label}
        </Typography>
      ) : null}
      {children}
    </TouchableOpacity>
  );
}

export function IconButton({ icon, size = 36, style, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.iconButton,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.buttonLight,
  },
});

const variants = {
  primary: {
    container: {
      backgroundColor: COLORS.buttonDark,
    },
    text: {
      color: COLORS.white,
    },
  },
  secondary: {
    container: {
      backgroundColor: COLORS.bgCard,
      borderWidth: 1,
      borderColor: COLORS.borderInactive,
    },
    text: {
      color: COLORS.textPrimary,
    },
  },
  ghost: {
    container: {
      backgroundColor: COLORS.transparent,
    },
    text: {
      color: COLORS.textPrimary,
    },
  },
  warm: {
    container: {
      backgroundColor: COLORS.bgCard,
      borderWidth: 1,
      borderColor: COLORS.borderWarm,
    },
    text: {
      color: COLORS.textPrimary,
    },
  },
};
