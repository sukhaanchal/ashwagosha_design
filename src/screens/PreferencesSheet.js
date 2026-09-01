import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';
import { useApp } from '../utils/AppContext';
import { COLORS, FONTS } from '../utils/theme';
import { MONTHS_SHORT } from '../utils/calendar';
import { CloseIcon, PlusIcon, ChevronRight } from '../components/Icons';

export default function PreferencesSheet() {
  const { state, dispatch } = useApp();

  const dobStr = `${MONTHS_SHORT[state.dobMonth - 1]} ${state.dobDay}, ${state.dobYear}`;

  return (
    <Modal
      visible={state.showPrefs}
      animationType="slide"
      transparent
      onRequestClose={() => dispatch({ type: 'CLOSE_PREFS' })}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={() => dispatch({ type: 'CLOSE_PREFS' })}
        />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.handle} />
            <View style={styles.headerRow}>
              <View style={{ width: 32 }} />
              <Text style={styles.headerTitle}>Preferences</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => dispatch({ type: 'CLOSE_PREFS' })}
                activeOpacity={0.7}
              >
                <CloseIcon size={14} color="#303030" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Selected</Text>
            <View style={styles.chipRow}>
              {state.prefsSelected.map((label) => (
                <TouchableOpacity
                  key={label}
                  style={styles.selectedChip}
                  onPress={() => dispatch({ type: 'REMOVE_PREF', label })}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chipText}>{label}</Text>
                  <CloseIcon size={12} color="#303030" />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 22 }]}>More topics</Text>
            <View style={styles.chipRow}>
              {state.prefsSuggested.map((label) => (
                <TouchableOpacity
                  key={label}
                  style={styles.suggestedChip}
                  onPress={() => dispatch({ type: 'ADD_PREF', label })}
                  activeOpacity={0.7}
                >
                  <PlusIcon size={12} color="#3a3a3a" />
                  <Text style={[styles.chipText, { color: '#3a3a3a' }]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Your details</Text>
            <View style={styles.detailsColumn}>
              <View style={styles.detailRow}>
                <View>
                  <Text style={styles.detailLabel}>DATE OF BIRTH</Text>
                  <Text style={styles.detailValue}>{dobStr}</Text>
                </View>
                <TouchableOpacity style={styles.detailBtn} activeOpacity={0.7}>
                  <ChevronRight size={14} color="#303030" />
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailLabel}>TIME OF BIRTH</Text>
                  <TextInput
                    value={state.timeVal}
                    onChangeText={(v) => dispatch({ type: 'SET', payload: { timeVal: v } })}
                    placeholder="Select time"
                    placeholderTextColor="#aaa"
                    style={styles.detailInput}
                  />
                </View>
              </View>
              <View style={styles.detailRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailLabel}>PLACE OF BIRTH</Text>
                  <TextInput
                    value={state.placeVal}
                    onChangeText={(v) => dispatch({ type: 'SET', payload: { placeVal: v } })}
                    placeholder="City, Country"
                    placeholderTextColor="#aaa"
                    style={styles.detailInput}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => dispatch({ type: 'CLEAR_PREFS' })}
              activeOpacity={0.7}
            >
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => dispatch({ type: 'CLOSE_PREFS' })}
              activeOpacity={0.7}
            >
              <Text style={styles.saveText}>Save preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  sheet: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -14 },
    shadowOpacity: 0.14,
    shadowRadius: 40,
    elevation: 12,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e5',
    alignSelf: 'center',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: '#303030',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: '#303030',
  },
  chipRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    paddingLeft: 14,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#d5d5da',
    borderRadius: 999,
    backgroundColor: COLORS.cardBg,
  },
  suggestedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#d5d5da',
    borderRadius: 999,
    backgroundColor: COLORS.cardBg,
  },
  chipText: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: '#303030',
  },
  detailsColumn: {
    marginTop: 12,
    gap: 10,
  },
  detailRow: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 10.5,
    letterSpacing: 1.2,
    color: '#8a8a8a',
  },
  detailValue: {
    marginTop: 3,
    fontSize: 14,
    color: '#303030',
    fontFamily: FONTS.regular,
  },
  detailInput: {
    marginTop: 3,
    fontSize: 14,
    color: '#303030',
    fontFamily: FONTS.regular,
    padding: 0,
  },
  detailBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  clearText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#303030',
    textDecorationLine: 'underline',
  },
  saveBtn: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: '#303030',
  },
  saveText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.white,
  },
});
