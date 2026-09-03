import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../utils/theme';
import { ZODIAC_SIGNS } from '../data/homeData';
import { useApp } from '../utils/AppContext';
import { PlusIcon } from './Icons';

export default function SavedHoroscopes() {
  const { state, dispatch } = useApp();
  const profiles = state.profiles || [
    { id: 'self', name: 'You', signIdx: 1 },
  ];

  const onAdd = () => {
    dispatch({ type: 'SET', payload: { showPersonalize: true } });
  };

  const onTap = (profile) => {
    dispatch({ type: 'SET', payload: { homeSignIdx: profile.signIdx } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Saved horoscopes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {profiles.map((p) => {
          const sign = ZODIAC_SIGNS[p.signIdx] || ZODIAC_SIGNS[0];
          return (
            <TouchableOpacity
              key={p.id}
              style={styles.profileCard}
              onPress={() => onTap(p)}
              activeOpacity={0.7}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarGlyph}>{sign.glyph}</Text>
              </View>
              <Text style={styles.profileName} numberOfLines={1}>{p.name}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.addCard} onPress={onAdd} activeOpacity={0.7}>
          <View style={styles.addCircle}>
            <PlusIcon size={16} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  profileCard: {
    alignItems: 'center',
    width: 60,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.warmBg,
    borderWidth: 1,
    borderColor: COLORS.warmBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarGlyph: {
    fontSize: 24,
  },
  profileName: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  addCard: {
    alignItems: 'center',
    width: 60,
  },
  addCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.buttonLight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  addText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
