import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { COMING_UP } from '../data/panchangData';
import { CalendarIcon, EventIcon } from './Icons';

export default function ComingUp() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <CalendarIcon size={14} color={COLORS.accent} />
        <Text style={styles.headerText}>COMING UP</Text>
      </View>
      <View style={styles.list}>
        {COMING_UP.map((item, i) => (
          <View key={i} style={styles.item}>
            <View style={styles.iconCircle}>
              <EventIcon type={item.icon} size={16} color={COLORS.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.meta}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: COLORS.accent,
    fontFamily: FONTS.semiBold,
  },
  list: {
    marginTop: 6,
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.1,
  },
  itemMeta: {
    fontSize: 12,
    color: '#8a8a8a',
    marginTop: 2,
    fontFamily: FONTS.regular,
  },
});
