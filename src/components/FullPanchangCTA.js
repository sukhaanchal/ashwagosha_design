import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { useApp } from '../utils/AppContext';
import { ListIcon, ChevronRight } from './Icons';

export default function FullPanchangCTA() {
  const { dispatch } = useApp();
  return (
    <TouchableOpacity
      style={styles.cta}
      onPress={() => dispatch({ type: 'OPEN_FULL' })}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <ListIcon size={16} color={COLORS.accent} />
        <View style={styles.textCol}>
          <Text style={styles.title}>See full panchang</Text>
          <Text style={styles.sub}>Hora, Chandra bala, Vara, more</Text>
        </View>
      </View>
      <ChevronRight size={14} color={COLORS.accent} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cta: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.cardBg,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textCol: {
    gap: 2,
  },
  title: {
    fontSize: 13.5,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.1,
  },
  sub: {
    fontSize: 11.5,
    color: '#8a8a8a',
    fontFamily: FONTS.regular,
  },
});
