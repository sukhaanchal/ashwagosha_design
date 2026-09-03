import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../utils/theme';
import { FilterIcon } from '../components/Icons';
import HoroscopeCarousel from '../components/HoroscopeCarousel';
import SavedHoroscopes from '../components/SavedHoroscopes';
import QuickPrompts from '../components/QuickPrompts';
import ForYouGrid from '../components/ForYouGrid';
import AstrologersList from '../components/AstrologersList';
import LearnSection from '../components/LearnSection';
import BottomTabBar from '../components/BottomTabBar';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.wordmark}>ashwagosha</Text>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <FilterIcon size={18} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HoroscopeCarousel />
        <SavedHoroscopes />
        <QuickPrompts />
        <ForYouGrid />
        <AstrologersList />
        <LearnSection />
      </ScrollView>

      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homeBg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  wordmark: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    color: COLORS.textPrimary,
    letterSpacing: 0.4,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.buttonLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
});
