import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../utils/AppContext';
import { LOCATIONS } from '../data/panchangData';
import { COLORS, FONTS } from '../utils/theme';
import { LocationPin, ChevronDown, CheckIcon } from './Icons';

export default function LocationDropdown() {
  const { state, dispatch } = useApp();
  const currentLoc = LOCATIONS[state.locIdx];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pill}
        onPress={() => dispatch({ type: 'TOGGLE_LOC' })}
        activeOpacity={0.7}
      >
        <LocationPin size={12} color="#8a8a8a" />
        <Text style={styles.pillText}>{currentLoc.city} · {currentLoc.tz}</Text>
        <ChevronDown size={10} color="#8a8a8a" />
      </TouchableOpacity>

      <Modal
        visible={state.locOpen}
        transparent
        animationType="fade"
        onRequestClose={() => dispatch({ type: 'TOGGLE_LOC' })}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch({ type: 'TOGGLE_LOC' })}
        >
          <View style={styles.dropdown}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
              {LOCATIONS.map((loc, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, i === state.locIdx && styles.optionSelected]}
                  onPress={() => dispatch({ type: 'SELECT_LOC', idx: i })}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionCity}>{loc.city}</Text>
                    <Text style={styles.optionTz}>{loc.tz}</Text>
                  </View>
                  {i === state.locIdx && <CheckIcon size={14} color={COLORS.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    backgroundColor: COLORS.cardBg,
  },
  pillText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: '#5a5a5a',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  dropdown: {
    width: 260,
    maxHeight: 340,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.10,
    shadowRadius: 28,
    elevation: 10,
  },
  scroll: {
    maxHeight: 320,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: '#f5f5f7',
  },
  optionTextContainer: {
    gap: 2,
  },
  optionCity: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.primary,
  },
  optionTz: {
    fontSize: 11,
    color: '#8a8a8a',
    fontFamily: FONTS.regular,
  },
});
