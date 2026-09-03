import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../utils/theme';
import { ASTROLOGERS } from '../data/homeData';
import { StarIcon } from './Icons';

export default function AstrologersList() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Astrologers</Text>
      {ASTROLOGERS.map((astro) => (
        <View key={astro.name} style={styles.card}>
          <View style={[styles.avatar, { backgroundColor: astro.bg }]}>
            <Text style={styles.avatarLetter}>{astro.name[0]}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{astro.name}</Text>
              <View style={styles.ratingRow}>
                <StarIcon size={11} color={COLORS.starColor} />
                <Text style={styles.rating}>{astro.rating}</Text>
              </View>
            </View>
            <Text style={styles.specialty}>{astro.specialty}</Text>
          </View>
          <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 26,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f4',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  specialty: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.buttonLight,
  },
  viewText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
});
