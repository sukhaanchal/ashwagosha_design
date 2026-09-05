import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../design-system/tokens';

export function IconCircle({
  size = 32,
  backgroundColor = COLORS.bgChip,
  icon,
  style,
}) {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
