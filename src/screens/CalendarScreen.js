import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../utils/AppContext';
import { COLORS, FONTS } from '../utils/theme';
import { formatMonthYear } from '../utils/calendar';
import CalendarGrid from '../components/CalendarGrid';
import { PanchangGrid, SunCard, RahuCard } from '../components/PanchangCards';
import LocationDropdown from '../components/LocationDropdown';
import FullPanchangCTA from '../components/FullPanchangCTA';
import YourDay from '../components/YourDay';
import ComingUp from '../components/ComingUp';
import FooterNote from '../components/FooterNote';
import BottomTabBar from '../components/BottomTabBar';
import FullPanchangScreen from './FullPanchangScreen';
import PreferencesSheet from './PreferencesSheet';
import CreateEventModal from './CreateEventModal';
import { PlusIcon, FilterIcon, ChevronLeft, ChevronRight, CalendarSmallIcon } from '../components/Icons';

const TODAY = new Date(2026, 7, 20);

function AddMenu({ onNewEvent, onClose }) {
  return (
    <View style={styles.addMenu}>
      <TouchableOpacity style={styles.addMenuItem} onPress={onNewEvent} activeOpacity={0.7}>
        <View style={styles.addMenuIcon}>
          <CalendarSmallIcon size={14} color={COLORS.primary} />
        </View>
        <Text style={styles.addMenuText}>New Event</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useApp();

  const gridMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + state.monthOffset, 1);
  const monthLabel = formatMonthYear(gridMonth.getFullYear(), gridMonth.getMonth());

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.skyBg]}>
        <View style={styles.skyGradient} />
      </View>

      <View style={[styles.content, { paddingTop: insets.top || 54 }]}>
        <View style={styles.topBar}>
          <Text style={styles.brandName}>ashwagosha</Text>
          <View style={styles.topBarRight}>
            <View>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => dispatch({ type: 'TOGGLE_MENU' })}
                activeOpacity={0.7}
              >
                <PlusIcon size={18} color={COLORS.primary} />
              </TouchableOpacity>
              {state.addMenuOpen && (
                <AddMenu
                  onNewEvent={() => dispatch({ type: 'OPEN_EVENT', kind: 'event' })}
                  onClose={() => dispatch({ type: 'TOGGLE_MENU' })}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => dispatch({ type: 'OPEN_PREFS' })}
              activeOpacity={0.7}
            >
              <FilterIcon size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarArea}>
          <View style={styles.monthRow}>
            <Text style={styles.monthLabel}>{monthLabel}</Text>
            <View style={styles.monthNavRow}>
              <TouchableOpacity
                style={styles.monthNavBtn}
                onPress={() => dispatch({ type: 'PREV_MONTH' })}
                activeOpacity={0.7}
              >
                <ChevronLeft size={18} color="#3a3a3a" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.monthNavBtn}
                onPress={() => dispatch({ type: 'NEXT_MONTH' })}
                activeOpacity={0.7}
              >
                <ChevronRight size={18} color="#3a3a3a" />
              </TouchableOpacity>
            </View>
          </View>

          <CalendarGrid />

          <TouchableOpacity
            style={styles.expandToggle}
            onPress={() => dispatch({ type: 'TOGGLE_MONTH' })}
            activeOpacity={0.7}
          >
            <View style={styles.expandBar} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.sheetScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetContent}
        >
          <LocationDropdown />
          <PanchangGrid />
          <SunCard />
          <RahuCard />
          <FullPanchangCTA />
          <YourDay />
          <ComingUp />
          <FooterNote />
          <View style={{ height: 120 }} />
        </ScrollView>
      </View>

      <BottomTabBar />

      <FullPanchangScreen />
      <PreferencesSheet />
      <CreateEventModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pageBg,
  },
  skyBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 380,
  },
  skyGradient: {
    flex: 1,
    backgroundColor: '#c8d8e8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  topBar: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandName: {
    fontFamily: FONTS.regular,
    fontSize: 22,
    letterSpacing: 1.8,
    color: COLORS.primary,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMenu: {
    position: 'absolute',
    top: 44,
    right: 0,
    zIndex: 20,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 32,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#ececee',
    padding: 6,
    minWidth: 180,
  },
  addMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addMenuIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f2f2f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMenuText: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    color: COLORS.primary,
  },
  calendarArea: {
    paddingTop: 24,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginBottom: 18,
  },
  monthLabel: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.15,
  },
  monthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  monthNavBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandToggle: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  expandBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#c8c8ce',
  },
  sheetScroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  sheetContent: {
    paddingBottom: 20,
  },
});
