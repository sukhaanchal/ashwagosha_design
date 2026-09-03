import React, { useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { COLORS, FONTS, RADIUS } from '../utils/theme';
import { ZODIAC_SIGNS } from '../data/homeData';
import { useApp } from '../utils/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 64;
const CARD_GAP = 12;

export default function HoroscopeCarousel() {
  const { state, dispatch } = useApp();
  const scrollRef = useRef(null);
  const signIdx = state.homeSignIdx ?? 0;

  const onScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const idx = Math.round(offset / (CARD_WIDTH + CARD_GAP));
    if (idx !== signIdx && idx >= 0 && idx < ZODIAC_SIGNS.length) {
      dispatch({ type: 'SET', payload: { homeSignIdx: idx } });
    }
  };

  const onFullHoroscope = () => {
    dispatch({ type: 'SET', payload: { showFullHoroscope: true, fullHoroscopeIdx: signIdx } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's horoscope</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={onScroll}
      >
        {ZODIAC_SIGNS.map((sign, idx) => (
          <View key={sign.name} style={styles.card}>
            <View style={styles.glyphContainer}>
              <Text style={styles.glyph}>{sign.glyph}</Text>
            </View>
            <Text style={styles.signName}>{sign.name}</Text>
            <Text style={styles.dateRange}>{sign.range}</Text>
            <Text style={styles.blurb}>{sign.blurb}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={onFullHoroscope}
                activeOpacity={0.8}
              >
                <Text style={styles.fullButtonText}>Full horoscope</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.findButton}
                onPress={() => dispatch({ type: 'SET', payload: { showPersonalize: true } })}
                activeOpacity={0.8}
              >
                <Text style={styles.findButtonText}>Find your sign</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {ZODIAC_SIGNS.map((sign, idx) => (
          <View
            key={sign.name}
            style={[styles.dot, idx === signIdx && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
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
  },
  card: {
    width: CARD_WIDTH,
    marginRight: CARD_GAP,
    backgroundColor: COLORS.warmBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.warmBorder,
    padding: 20,
    alignItems: 'center',
  },
  glyphContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  glyph: {
    fontSize: 36,
  },
  signName: {
    fontFamily: FONTS.semiBold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  dateRange: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  blurb: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textBody,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  fullButton: {
    backgroundColor: COLORS.buttonDark,
    borderRadius: RADIUS.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  fullButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.white,
  },
  findButton: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.warmBorder,
  },
  findButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d5d5da',
  },
  dotActive: {
    backgroundColor: COLORS.textPrimary,
    width: 18,
    borderRadius: 3,
  },
});
