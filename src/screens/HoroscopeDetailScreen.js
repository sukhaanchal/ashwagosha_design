import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, SPACING } from '../utils/theme';
import { ZODIAC_SIGNS, HOROSCOPE_FULL_TEXT } from '../data/homeData';
import { useApp } from '../utils/AppContext';
import { ChevronLeft, ChevronRight, ShareIcon } from '../components/Icons';

const TABS = ['Brief', 'Life areas', 'Cues', 'Calendar'];

export default function HoroscopeDetailScreen() {
  const { state, dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Brief');
  const [period, setPeriod] = useState('today');

  const signIdx = state.fullHoroscopeIdx ?? 0;
  const sign = ZODIAC_SIGNS[signIdx] || ZODIAC_SIGNS[0];
  const fullText = HOROSCOPE_FULL_TEXT[sign.name] || {};
  const stats = fullText.stats || {};

  const onClose = () => {
    dispatch({ type: 'SET', payload: { showFullHoroscope: false } });
  };

  const onPrev = () => {
    const prev = (signIdx - 1 + ZODIAC_SIGNS.length) % ZODIAC_SIGNS.length;
    dispatch({ type: 'SET', payload: { fullHoroscopeIdx: prev } });
    setActiveTab('Brief');
  };

  const onNext = () => {
    const next = (signIdx + 1) % ZODIAC_SIGNS.length;
    dispatch({ type: 'SET', payload: { fullHoroscopeIdx: next } });
    setActiveTab('Brief');
  };

  return (
    <Modal visible={state.showFullHoroscope} animationType="slide" presentationStyle="fullScreen">
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={onClose} activeOpacity={0.7}>
            <ChevronLeft size={14} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <ShareIcon size={14} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.hero}>
            <View style={styles.heroGlyph}>
              <Text style={styles.heroGlyphText}>{sign.glyph}</Text>
            </View>
            <Text style={styles.heroName}>{sign.name}</Text>
            <Text style={styles.heroRange}>{sign.range}</Text>
            <Text style={styles.heroConstellation}>{sign.name}</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabRow}
          >
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {activeTab === 'Brief' && (
            <View style={styles.tabContent}>
              <View style={styles.periodRow}>
                {['today', 'this week', 'this month'].map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.periodChip, period === p && styles.periodChipActive]}
                    onPress={() => setPeriod(p)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.periodText, period === p && styles.periodTextActive]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.glanceCard}>
                <Text style={styles.glanceTitle}>Today at a glance</Text>
                <Text style={styles.glanceBlurb}>{sign.blurb}</Text>
              </View>

              <View style={styles.statsCard}>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>MOOD</Text>
                    <Text style={styles.statValue}>{stats.mood || '—'}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>LUCKY #</Text>
                    <Text style={styles.statValue}>{stats.lucky || '—'}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>COLOR</Text>
                    <Text style={styles.statValue}>{stats.color || '—'}</Text>
                  </View>
                </View>
              </View>

              {['love', 'career', 'wellness', 'spiritual'].map((area) => {
                const text = fullText[area];
                if (!text) return null;
                return (
                  <View key={area} style={styles.areaCard}>
                    <Text style={styles.areaTitle}>
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </Text>
                    <View style={styles.ratingBar}>
                      <View style={[styles.ratingFill, { width: `${60 + Math.random() * 30}%` }]} />
                    </View>
                    <Text style={styles.areaText}>{text}</Text>
                  </View>
                );
              })}
            </View>
          )}

          {activeTab === 'Life areas' && (
            <View style={styles.tabContent}>
              {['love', 'career', 'wellness', 'spiritual'].map((area) => {
                const text = fullText[area];
                if (!text) return null;
                return (
                  <View key={area} style={styles.lifeCard}>
                    <Text style={styles.lifeTitle}>
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </Text>
                    <Text style={styles.lifeBody}>{text}</Text>
                  </View>
                );
              })}
            </View>
          )}

          {activeTab === 'Cues' && (
            <View style={styles.tabContent}>
              <View style={styles.cueCard}>
                <Text style={styles.cueCategory}>DO</Text>
                <Text style={styles.cueText}>{fullText.career || 'Focus on what matters most.'}</Text>
              </View>
              <View style={styles.cueCard}>
                <Text style={styles.cueCategory}>FEEL</Text>
                <Text style={styles.cueText}>{fullText.love || 'Be present with those close to you.'}</Text>
              </View>
              <View style={styles.cueCard}>
                <Text style={styles.cueCategory}>REST</Text>
                <Text style={styles.cueText}>{fullText.wellness || 'Take care of your body and mind.'}</Text>
              </View>
            </View>
          )}

          {activeTab === 'Calendar' && (
            <View style={styles.tabContent}>
              <View style={styles.calendarPlaceholder}>
                <Text style={styles.placeholderText}>Calendar view coming soon</Text>
                <Text style={styles.placeholderSub}>Monthly astrological forecast for {sign.name}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={styles.prevButton} onPress={onPrev} activeOpacity={0.7}>
            <ChevronLeft size={12} color={COLORS.textPrimary} />
            <Text style={styles.prevText}>Previous sign</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={onNext} activeOpacity={0.7}>
            <Text style={styles.nextText}>Next sign</Text>
            <ChevronRight size={12} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.buttonLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heroGlyph: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.warmBg,
    borderWidth: 1,
    borderColor: COLORS.warmBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroGlyphText: {
    fontSize: 36,
  },
  heroName: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  heroRange: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  heroConstellation: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tabRow: {
    paddingHorizontal: 20,
    gap: 22,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  tab: {
    paddingBottom: 12,
    paddingTop: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.textPrimary,
  },
  tabText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#a8a8ac',
  },
  tabTextActive: {
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  tabContent: {
    padding: 20,
  },
  periodRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  periodChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.buttonLight,
  },
  periodChipActive: {
    backgroundColor: COLORS.buttonDark,
  },
  periodText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  periodTextActive: {
    color: COLORS.white,
  },
  glanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 16,
    marginBottom: 16,
  },
  glanceTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  glanceBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textBody,
    lineHeight: 20,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.buttonLight,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  areaCard: {
    marginBottom: 16,
  },
  areaTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  ratingBar: {
    height: 4,
    backgroundColor: '#f2f2f4',
    borderRadius: 2,
    marginBottom: 10,
  },
  ratingFill: {
    height: 4,
    backgroundColor: COLORS.buttonDark,
    borderRadius: 2,
  },
  areaText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textBody,
    lineHeight: 20,
  },
  lifeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 16,
    marginBottom: 12,
  },
  lifeTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  lifeBody: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textBody,
    lineHeight: 20,
  },
  cueCard: {
    backgroundColor: COLORS.buttonLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cueCategory: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  cueText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textBody,
    lineHeight: 20,
  },
  calendarPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  placeholderSub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.buttonLight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  prevText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.buttonDark,
  },
  nextText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.white,
  },
});
