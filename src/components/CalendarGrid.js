import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../utils/AppContext';
import { COLORS, FONTS } from '../utils/theme';
import { WEEKDAYS_SHORT, buildMonthGrid, sameDay, dateKey } from '../utils/calendar';

const ROW_H = 54;
const TODAY = new Date(2026, 7, 20);

export default function CalendarGrid() {
  const { state, dispatch } = useApp();
  const { dayOffset, monthOffset, sheetExpanded, events } = state;

  const selDate = new Date(TODAY);
  selDate.setDate(TODAY.getDate() + dayOffset);

  const gridMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + monthOffset, 1);
  const gY = gridMonth.getFullYear();
  const gM = gridMonth.getMonth();
  const rows = buildMonthGrid(gY, gM);

  const selRowIdx = rows.findIndex(row =>
    row.some(d => sameDay(d.cellDate, selDate))
  );
  const effectiveSelRow = selRowIdx >= 0 ? selRowIdx : 0;

  const visibleRows = sheetExpanded ? rows : [rows[effectiveSelRow] || rows[0]];

  return (
    <View style={styles.container}>
      <View style={styles.weekdayRow}>
        {WEEKDAYS_SHORT.map((d, i) => (
          <Text key={i} style={styles.weekdayText}>{d}</Text>
        ))}
      </View>

      <View style={styles.weeksContainer}>
        {visibleRows.map((row, ri) => (
          <View key={ri} style={[styles.weekRow, { height: ROW_H }]}>
            {row.map((cell, ci) => {
              const isSelected = sameDay(cell.cellDate, selDate);
              const key = dateKey(cell.cellDate);
              const hasEvent = Array.isArray(events[key]) && events[key].length > 0;
              const cellOffset = Math.round((cell.cellDate - TODAY) / 86400000);

              return (
                <TouchableOpacity
                  key={ci}
                  style={styles.dayCell}
                  onPress={() => dispatch({ type: 'SELECT_DAY', offset: cellOffset })}
                  activeOpacity={0.7}
                >
                  <View style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}>
                    <Text style={[
                      styles.dayText,
                      isSelected && styles.dayTextSelected,
                      !cell.inMonth && styles.dayTextMuted,
                    ]}>
                      {cell.cellDate.getDate()}
                    </Text>
                  </View>
                  <View style={[styles.dot, hasEvent && styles.dotActive]} />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  weekdayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: '#3a3a3a',
  },
  weeksContainer: {
    marginTop: 12,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  dayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: '#111',
  },
  dayText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.primary,
  },
  dayTextSelected: {
    color: COLORS.white,
  },
  dayTextMuted: {
    color: 'rgba(26,26,26,0.35)',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  dotActive: {
    backgroundColor: COLORS.dot,
  },
});
