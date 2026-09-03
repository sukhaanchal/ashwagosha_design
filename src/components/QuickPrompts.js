import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../utils/theme';
import { QUICK_PROMPTS } from '../data/homeData';
import { PromptIcon } from './Icons';

function PromptRow({ items }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.rowContent}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.pill}
          activeOpacity={0.7}
        >
          <View style={[styles.pillIconCircle, { backgroundColor: item.color + '18' }]}>
            <PromptIcon d={item.icon} size={14} color={item.color} />
          </View>
          <Text style={styles.pillText} numberOfLines={1}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function QuickPrompts() {
  return (
    <View style={styles.container}>
      <PromptRow items={QUICK_PROMPTS.row1} />
      <View style={styles.rowSpacer} />
      <PromptRow items={QUICK_PROMPTS.row2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  rowContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  rowSpacer: {
    height: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.pillBg,
    borderRadius: RADIUS.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  pillIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: FONTS.medium,
    fontSize: 12.5,
    color: COLORS.textPrimary,
  },
});
