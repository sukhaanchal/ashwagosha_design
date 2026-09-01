import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { CalendarSmallIcon } from './Icons';

export default function FooterNote() {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <CalendarSmallIcon size={14} color={COLORS.accent} />
        <Text style={styles.text}>Today's windows have passed — plan tomorrow instead.</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>Muhurtham for your event →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  text: {
    fontSize: 12,
    color: '#5a5a5a',
    lineHeight: 16.8,
    fontFamily: FONTS.regular,
    flex: 1,
  },
  link: {
    fontSize: 12.5,
    fontFamily: FONTS.medium,
    color: COLORS.accent,
  },
});
