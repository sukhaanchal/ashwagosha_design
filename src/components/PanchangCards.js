import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { PANCHANG } from '../data/panchangData';
import { TithiIcon, SunriseIcon, SunsetIcon } from './Icons';

function Label({ text, devanagari }) {
  return (
    <Text style={styles.label}>
      {text}{' '}
      {devanagari ? <Text style={styles.devanagari}>({devanagari})</Text> : null}
    </Text>
  );
}

function PanchangValue({ name, sub }) {
  return (
    <View>
      <Text style={styles.valueLarge}>{name}</Text>
      {sub ? <Text style={styles.valueSub}>{sub}</Text> : null}
    </View>
  );
}

export function PanchangGrid() {
  const { tithi, nakshatra, yoga, karana } = PANCHANG;
  return (
    <View style={styles.card}>
      <View style={styles.grid2x2}>
        <View style={styles.gridCell}>
          <View style={styles.labelRow}>
            <TithiIcon size={12} color={COLORS.accent} />
            <Label text={tithi.label} devanagari={tithi.devanagari} />
          </View>
          <PanchangValue name={tithi.name} sub={`until ${tithi.until}`} />
        </View>
        <View style={styles.gridCell}>
          <Label text={nakshatra.label} devanagari={nakshatra.devanagari} />
          <PanchangValue name={nakshatra.name} sub={`${nakshatra.pada} · until ${nakshatra.until}`} />
        </View>
        <View style={styles.gridCell}>
          <Label text={yoga.label} devanagari={yoga.devanagari} />
          <PanchangValue name={yoga.name} sub={`until ${yoga.until}`} />
        </View>
        <View style={styles.gridCell}>
          <Label text={karana.label} devanagari={karana.devanagari} />
          <PanchangValue name={karana.name} sub={`until ${karana.until}`} />
        </View>
      </View>
    </View>
  );
}

export function SunCard() {
  return (
    <View style={styles.card}>
      <View style={styles.grid2}>
        <View>
          <View style={styles.iconLabel}>
            <SunriseIcon size={14} color={COLORS.accent} />
            <Label text="Sunrise" />
          </View>
          <Text style={styles.timeValue}>{PANCHANG.sunrise}</Text>
          <Text style={styles.valueSub}>{PANCHANG.sunDay}</Text>
        </View>
        <View>
          <View style={styles.iconLabel}>
            <SunsetIcon size={14} color={COLORS.accent} />
            <Label text="Sunset" />
          </View>
          <Text style={styles.timeValue}>{PANCHANG.sunset}</Text>
          <Text style={styles.valueSub}>{PANCHANG.sunNak}</Text>
        </View>
      </View>
    </View>
  );
}

export function RahuCard() {
  return (
    <View style={styles.card}>
      <View style={styles.grid2}>
        <View>
          <Label text="Rahu Kaal" devanagari="राहु काल" />
          <Text style={styles.timeValueSm}>{PANCHANG.rahuKaal.start} – {PANCHANG.rahuKaal.end}</Text>
          <Text style={styles.valueSub}>{PANCHANG.rahuKaal.note}</Text>
        </View>
        <View>
          <Label text="Abhijit" />
          <Text style={styles.timeValueSm}>{PANCHANG.abhijit.start} – {PANCHANG.abhijit.end}</Text>
          <Text style={styles.valueSub}>{PANCHANG.abhijit.note}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
  },
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 22,
  },
  gridCell: {
    width: '45%',
  },
  grid2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.muted,
    fontFamily: FONTS.regular,
  },
  devanagari: {
    color: COLORS.devanagari,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  valueLarge: {
    marginTop: 6,
    fontSize: 17,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  valueSub: {
    marginTop: 2,
    fontSize: 12.5,
    color: COLORS.subtle,
    fontFamily: FONTS.regular,
  },
  timeValue: {
    marginTop: 6,
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  timeValueSm: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
});
