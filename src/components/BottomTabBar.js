import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useApp } from '../utils/AppContext';
import { COLORS, FONTS } from '../utils/theme';
import { NavIcon } from './Icons';

const NAV_ITEMS = [
  { key: 'home', glyph: 'M9.02 2.84 3.63 7.04c-.9.7-1.63 2.19-1.63 3.32v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12ZM12 17.99V15' },
  { key: 'calendar', glyph: 'M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5ZM11.995 13.7h.009M8.294 13.7h.01M8.294 16.7h.01' },
  { key: 'add', sphere: true },
  { key: 'chat', glyph: 'M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4ZM15.996 11h.01M11.995 11h.01M7.995 11h.01' },
  { key: 'me', glyph: 'M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z' },
];

export default function BottomTabBar() {
  const { state, dispatch } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {NAV_ITEMS.map((item) => {
          if (item.sphere) {
            return (
              <View key={item.key} style={styles.sphereContainer}>
                <View style={styles.sphere}>
                  <View style={styles.sphereGradient}>
                    <View style={styles.sphereInner} />
                  </View>
                </View>
              </View>
            );
          }

          const isActive = state.active === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.tabButton}
              onPress={() => dispatch({ type: 'SET', payload: { active: item.key } })}
              activeOpacity={0.7}
            >
              <NavIcon
                glyph={item.glyph}
                size={22}
                color={isActive ? COLORS.tabActive : COLORS.tabInactive}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 38,
    zIndex: 3,
  },
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  tabButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sphereContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sphere: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sphereGradient: {
    flex: 1,
    backgroundColor: '#b8c4d8',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sphereInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});
