import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from 'react-native';
import { useApp } from '../utils/AppContext';
import { COLORS, FONTS } from '../utils/theme';
import { MONTHS_LONG, MONTHS_SHORT, WEEKDAYS_SHORT } from '../utils/calendar';
import { CloseIcon, ChevronLeft, ChevronRight } from '../components/Icons';

const TODAY = new Date(2026, 7, 20);
const WEEKDAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CAL_HEADS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function InlineCalendar({ calY, calM, activeField, startYMD, endYMD, dispatch }) {
  const first = new Date(calY, calM, 1);
  const firstDow = first.getDay();
  const daysInMonth = new Date(calY, calM + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) => {
    if (!d) return false;
    const ymd = activeField === 'startDate' ? startYMD : endYMD;
    return ymd && ymd.y === calY && ymd.m === calM && ymd.d === d;
  };

  return (
    <View style={styles.calContainer}>
      <View style={styles.calHeader}>
        <Text style={styles.calMonthLabel}>{MONTHS_LONG[calM]} {calY}</Text>
        <View style={styles.calNavRow}>
          <TouchableOpacity
            onPress={() => dispatch({ type: 'EVENT_CAL_STEP', delta: -1 })}
            activeOpacity={0.7}
          >
            <ChevronLeft size={12} color={COLORS.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch({ type: 'EVENT_CAL_STEP', delta: 1 })}
            activeOpacity={0.7}
          >
            <ChevronRight size={12} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calGrid}>
        {CAL_HEADS.map((h, i) => (
          <View key={i} style={styles.calHeadCell}>
            <Text style={styles.calHeadText}>{h}</Text>
          </View>
        ))}
        {cells.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={styles.calDayCell}
            onPress={() => d && dispatch({ type: 'PICK_EVENT_DATE', y: calY, m: calM, d, field: activeField })}
            activeOpacity={0.7}
            disabled={!d}
          >
            {d ? (
              <View style={[styles.calDayCircle, isSelected(d) && styles.calDayCircleSelected]}>
                <Text style={[styles.calDayText, isSelected(d) && styles.calDayTextSelected]}>{d}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function TimeWheel({ value, items, onSelect }) {
  return (
    <View style={styles.wheelContainer}>
      {items.map((item, i) => {
        const isSelected = item === value;
        return (
          <TouchableOpacity
            key={i}
            style={[styles.wheelItem, isSelected && styles.wheelItemSelected]}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.wheelItemText,
              isSelected && styles.wheelItemTextSelected,
            ]}>{typeof item === 'number' ? String(item).padStart(2, '0') : item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TimePicker({ prefix, state, dispatch }) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const mins = Array.from({ length: 12 }, (_, i) => i * 5);
  const ampms = ['AM', 'PM'];

  const hKey = `${prefix}H`;
  const mKey = `${prefix}Min`;
  const aKey = `${prefix}Ampm`;

  return (
    <View style={styles.timePickerContainer}>
      <View style={styles.timePickerHighlight} />
      <View style={styles.timePickerColumns}>
        <ScrollView style={styles.timeCol} showsVerticalScrollIndicator={false}>
          {hours.map(h => (
            <TouchableOpacity
              key={h}
              style={styles.timeCell}
              onPress={() => dispatch({ type: 'SET', payload: { [hKey]: h } })}
              activeOpacity={0.7}
            >
              <Text style={[styles.timeCellText, state[hKey] === h && styles.timeCellTextActive]}>{h}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={styles.timeCol} showsVerticalScrollIndicator={false}>
          {mins.map(m => (
            <TouchableOpacity
              key={m}
              style={styles.timeCell}
              onPress={() => dispatch({ type: 'SET', payload: { [mKey]: m } })}
              activeOpacity={0.7}
            >
              <Text style={[styles.timeCellText, state[mKey] === m && styles.timeCellTextActive]}>{String(m).padStart(2, '0')}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={styles.timeCol} showsVerticalScrollIndicator={false}>
          {ampms.map(a => (
            <TouchableOpacity
              key={a}
              style={styles.timeCell}
              onPress={() => dispatch({ type: 'SET', payload: { [aKey]: a } })}
              activeOpacity={0.7}
            >
              <Text style={[styles.timeCellText, state[aKey] === a && styles.timeCellTextActive]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default function CreateEventModal() {
  const { state, dispatch } = useApp();

  const base = new Date(TODAY);
  base.setDate(base.getDate() + state.dayOffset);
  const weekday = WEEKDAYS_FULL[base.getDay()];

  const startYMD = state.startYMD || { y: base.getFullYear(), m: base.getMonth(), d: base.getDate() };
  const endYMD = state.endYMD || { y: base.getFullYear(), m: base.getMonth(), d: base.getDate() };

  const fmtDate = (ymd) => `${ymd.d} ${MONTHS_SHORT[ymd.m]} ${ymd.y}`;
  const fmtTime = (h, m, ap) => `${h}:${String(m).padStart(2, '0')} ${ap}`;

  const calY = state.calY != null ? state.calY : startYMD.y;
  const calM = state.calM != null ? state.calM : startYMD.m;
  const activeField = state.eventActiveField;

  const headerDate = `${weekday}, ${base.getDate()} ${MONTHS_SHORT[base.getMonth()]} ${base.getFullYear()}`;

  return (
    <Modal
      visible={state.showEvent}
      transparent
      animationType="fade"
      onRequestClose={() => dispatch({ type: 'CLOSE_EVENT' })}
    >
      <View style={styles.backdrop}>
        <View style={styles.popup}>
          <View style={styles.popupHeader}>
            <View>
              <Text style={styles.popupTitle}>
                {state.eventKind === 'reminder' ? 'New Reminder' : 'New Event'}
              </Text>
              <Text style={styles.popupDate}>{headerDate}</Text>
            </View>
            <TouchableOpacity
              style={styles.popupClose}
              onPress={() => dispatch({ type: 'CLOSE_EVENT' })}
              activeOpacity={0.7}
            >
              <CloseIcon size={12} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.popupScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <TextInput
                  value={state.eventTitle}
                  onChangeText={(v) => dispatch({ type: 'SET', payload: { eventTitle: v } })}
                  placeholder={state.eventKind === 'reminder' ? 'Reminder title' : 'Event title'}
                  placeholderTextColor="#8a8a8a"
                  style={styles.titleInput}
                />
              </View>
              <View style={styles.inputDivider} />
              <View style={styles.inputRow}>
                <TextInput
                  value={state.eventLocation}
                  onChangeText={(v) => dispatch({ type: 'SET', payload: { eventLocation: v } })}
                  placeholder="Add Location or Video Call"
                  placeholderTextColor="#8a8a8a"
                  style={styles.locationInput}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Starts</Text>
                <TouchableOpacity
                  style={styles.datePill}
                  onPress={() => dispatch({ type: 'TOGGLE_EVENT_FIELD', field: 'startDate' })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.datePillText, activeField === 'startDate' && styles.datePillActive]}>
                    {fmtDate(startYMD)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.datePill}
                  onPress={() => dispatch({ type: 'TOGGLE_EVENT_FIELD', field: 'startTime' })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.datePillText, activeField === 'startTime' && styles.datePillActive]}>
                    {fmtTime(state.startH, state.startMin, state.startAmpm)}
                  </Text>
                </TouchableOpacity>
              </View>

              {activeField === 'startDate' && (
                <InlineCalendar calY={calY} calM={calM} activeField="startDate" startYMD={startYMD} endYMD={endYMD} dispatch={dispatch} />
              )}
              {activeField === 'startTime' && (
                <TimePicker prefix="start" state={state} dispatch={dispatch} />
              )}

              <View style={styles.inputDivider} />

              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Ends</Text>
                <TouchableOpacity
                  style={styles.datePill}
                  onPress={() => dispatch({ type: 'TOGGLE_EVENT_FIELD', field: 'endDate' })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.datePillText, activeField === 'endDate' && styles.datePillActive]}>
                    {fmtDate(endYMD)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.datePill}
                  onPress={() => dispatch({ type: 'TOGGLE_EVENT_FIELD', field: 'endTime' })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.datePillText, activeField === 'endTime' && styles.datePillActive]}>
                    {fmtTime(state.endH, state.endMin, state.endAmpm)}
                  </Text>
                </TouchableOpacity>
              </View>

              {activeField === 'endDate' && (
                <InlineCalendar calY={calY} calM={calM} activeField="endDate" startYMD={startYMD} endYMD={endYMD} dispatch={dispatch} />
              )}
              {activeField === 'endTime' && (
                <TimePicker prefix="end" state={state} dispatch={dispatch} />
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <TextInput
                  value={state.eventNotes}
                  onChangeText={(v) => dispatch({ type: 'SET', payload: { eventNotes: v } })}
                  placeholder="Add Notes or URL"
                  placeholderTextColor="#8a8a8a"
                  style={styles.locationInput}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => dispatch({ type: 'CLOSE_EVENT' })}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => dispatch({ type: 'SAVE_EVENT' })}
                activeOpacity={0.7}
              >
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  popup: {
    width: '100%',
    maxWidth: 346,
    maxHeight: '88%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.18,
    shadowRadius: 50,
    elevation: 12,
  },
  popupHeader: {
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  popupTitle: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.1,
  },
  popupDate: {
    fontSize: 12,
    color: '#8a8a8a',
    marginTop: 2,
    fontFamily: FONTS.regular,
  },
  popupClose: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupScroll: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  inputGroup: {
    backgroundColor: COLORS.chipBg,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
  },
  inputRow: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#e6e6ea',
    marginHorizontal: 12,
  },
  titleInput: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.primary,
    padding: 0,
  },
  locationInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    color: COLORS.primary,
    padding: 0,
  },
  dateRow: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: FONTS.regular,
  },
  datePill: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePillText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.primary,
  },
  datePillActive: {
    color: COLORS.accent,
  },
  calContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e6e6ea',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 6,
  },
  calMonthLabel: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  calNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calHeadCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  calHeadText: {
    fontSize: 9.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#8a8a8a',
    fontFamily: FONTS.regular,
  },
  calDayCell: {
    width: '14.28%',
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calDayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calDayCircleSelected: {
    backgroundColor: COLORS.accent,
  },
  calDayText: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.primary,
  },
  calDayTextSelected: {
    color: COLORS.white,
  },
  timePickerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e6e6ea',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  timePickerHighlight: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: '50%',
    height: 36,
    marginTop: -8,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
  },
  timePickerColumns: {
    flexDirection: 'row',
    gap: 4,
  },
  timeCol: {
    flex: 1,
    maxHeight: 144,
  },
  timeCell: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeCellText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: '#a8a8ac',
  },
  timeCellTextActive: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    paddingVertical: 2,
    paddingHorizontal: 4,
    paddingBottom: 14,
  },
  cancelText: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: '#8a8a8a',
  },
  addBtn: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  addBtnText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.white,
  },
});
