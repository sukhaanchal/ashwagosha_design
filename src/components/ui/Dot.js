import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../design-system/tokens';

export function DotIndicator({ count, activeIndex }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === activeIndex ? styles.active : styles.inactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  active: {
    width: 18,
    backgroundColor: COLORS.textPrimary,
  },
  inactive: {
    width: 6,
    backgroundColor: COLORS.borderInactive,
  },
});
