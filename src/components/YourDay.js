import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { MoonIcon, SparkIcon } from './Icons';

export default function YourDay() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MoonIcon size={14} color={COLORS.accent} />
        <Text style={styles.headerText}>YOUR DAY</Text>
      </View>
      <Text style={styles.body}>
        Tell us your rashi — or add your birth details once — and we'll prepare a personal daily reading for you every morning.
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <SparkIcon size={13} color={COLORS.accent} />
          <Text style={styles.buttonText}>Pick my rashi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Add birth details</Text>
        </TouchableOpacity>
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
  body: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.light,
    lineHeight: 21,
    fontFamily: FONTS.regular,
  },
  buttonRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#d5d5da',
    borderRadius: 999,
    backgroundColor: COLORS.cardBg,
  },
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.primary,
  },
});
