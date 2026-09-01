import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Image } from 'react-native';
import { useApp } from '../utils/AppContext';
import { COLORS, FONTS } from '../utils/theme';
import { PANCHANG, WINDOWS, AVOID_WINDOWS, HORA, SAMVAT, CHANDRA_BALA, TARA_BALA } from '../data/panchangData';
import { MONTHS_LONG, MONTHS_SHORT } from '../utils/calendar';
import { ChevronLeft, ChevronRight, ShareIcon, ListIcon } from '../components/Icons';
import { LOCATIONS } from '../data/panchangData';

const TODAY = new Date(2026, 7, 20);

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

function DetailCard({ label, devanagari, rightLabel, title, sub, description }) {
  return (
    <View style={styles.detailCard}>
      <View style={styles.detailCardHeader}>
        <Text style={styles.detailLabel}>
          {label}{devanagari ? <Text style={styles.devanagari}> ({devanagari})</Text> : null}
        </Text>
        {rightLabel ? <Text style={styles.detailRightLabel}>{rightLabel}</Text> : null}
      </View>
      <Text style={styles.detailTitle}>{title}</Text>
      {sub ? <Text style={styles.detailSub}>{sub}</Text> : null}
      {description ? <Text style={styles.detailDesc}>{description}</Text> : null}
    </View>
  );
}

function SmallDetailCard({ label, title, sub, description }) {
  return (
    <View style={styles.smallDetailCard}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.smallDetailTitle}>{title}</Text>
      {sub ? <Text style={styles.smallDetailSub}>{sub}</Text> : null}
      {description ? <Text style={styles.smallDetailDesc}>{description}</Text> : null}
    </View>
  );
}

function WindowRow({ name, sub, time, isLast }) {
  return (
    <View style={[styles.windowRow, !isLast && styles.windowRowBorder]}>
      <View>
        <Text style={styles.windowName}>{name}</Text>
        {sub ? <Text style={styles.windowSub}>{sub}</Text> : null}
      </View>
      <Text style={styles.windowTime}>{time}</Text>
    </View>
  );
}

function SunMoonGrid() {
  const items = [
    { label: 'Sunrise', value: PANCHANG.sunrise },
    { label: 'Sunset', value: PANCHANG.sunset },
    { label: 'Moonrise', value: PANCHANG.moonrise },
    { label: 'Moonset', value: PANCHANG.moonset },
    { label: 'Rashi (Moon)', value: PANCHANG.moonRashi },
    { label: 'Sun sign', value: PANCHANG.sunSign },
  ];
  return (
    <View style={styles.detailCard}>
      <Text style={styles.detailLabel}>SUN & MOON</Text>
      <View style={styles.sunMoonGrid}>
        {items.map((item, i) => (
          <View key={i} style={styles.sunMoonCell}>
            <Text style={styles.sunMoonLabel}>{item.label}</Text>
            <Text style={styles.sunMoonValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function FullPanchangScreen() {
  const { state, dispatch } = useApp();
  const { dayOffset, locIdx } = state;

  const selDate = new Date(TODAY);
  selDate.setDate(TODAY.getDate() + dayOffset);
  const sheetTitle = `${dayOffset === 0 ? 'Today, ' : ''}${String(selDate.getDate()).padStart(2, '0')} ${MONTHS_LONG[selDate.getMonth()]}`;
  const location = `${LOCATIONS[locIdx].city} · ${LOCATIONS[locIdx].tz}`;

  const prevD = new Date(selDate);
  prevD.setDate(prevD.getDate() - 1);
  const nextD = new Date(selDate);
  nextD.setDate(nextD.getDate() + 1);
  const prevLabel = `${prevD.getDate()} ${MONTHS_SHORT[prevD.getMonth()]}`;
  const nextLabel = `${nextD.getDate()} ${MONTHS_SHORT[nextD.getMonth()]}`;

  return (
    <Modal
      visible={state.showFull}
      animationType="slide"
      onRequestClose={() => dispatch({ type: 'CLOSE_FULL' })}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => dispatch({ type: 'CLOSE_FULL' })}
              activeOpacity={0.7}
            >
              <ChevronLeft size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
              <ShareIcon size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMeta}>
            <ListIcon size={14} color={COLORS.primary} />
            <Text style={styles.headerLabel}>FULL PANCHANG</Text>
          </View>
          <Text style={styles.headerTitle}>{sheetTitle}</Text>
          <Text style={styles.headerLocation}>{location}</Text>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.thumbnail}>
            <View style={styles.thumbnailPlaceholder}>
              <Text style={styles.thumbnailText}>Panchang</Text>
            </View>
          </View>

          <View style={styles.introContainer}>
            <Text style={styles.introText}>{PANCHANG.intro}</Text>
          </View>

          <DetailCard
            label="TITHI"
            devanagari="तिथि"
            rightLabel={PANCHANG.tithi.paksha}
            title={PANCHANG.tithi.fullName}
            sub={`until ${PANCHANG.tithi.until} — ${PANCHANG.tithi.then}`}
            description={PANCHANG.tithi.description}
          />

          <DetailCard
            label="NAKSHATRA"
            devanagari="नक्षत्र"
            rightLabel={PANCHANG.nakshatra.pada}
            title={PANCHANG.nakshatra.name}
            sub={`until ${PANCHANG.nakshatra.until} — ${PANCHANG.nakshatra.then}`}
            description={PANCHANG.nakshatra.description}
          />

          <View style={styles.halfRow}>
            <SmallDetailCard
              label="YOGA"
              title={PANCHANG.yoga.name}
              sub={`until ${PANCHANG.yoga.until}`}
              description={PANCHANG.yoga.description}
            />
            <SmallDetailCard
              label="KARANA"
              title={PANCHANG.karana.name}
              sub={`until ${PANCHANG.karana.until}`}
              description={PANCHANG.karana.description}
            />
          </View>

          <View style={styles.halfRow}>
            <SmallDetailCard
              label="VARA"
              title={PANCHANG.vara.name}
              sub={PANCHANG.vara.sub}
            />
            <SmallDetailCard
              label="AYANA · RITU"
              title={PANCHANG.ayana.name}
              sub={PANCHANG.ayana.sub}
            />
          </View>

          <SunMoonGrid />

          <SectionHeader title="WINDOWS OF THE DAY" />

          <View style={styles.windowsCard}>
            {WINDOWS.map((w, i) => (
              <WindowRow key={i} name={w.name} sub={w.sub} time={w.time} isLast={i === WINDOWS.length - 1} />
            ))}
          </View>

          <View style={styles.avoidCard}>
            <View style={styles.avoidHeader}>
              <Text style={styles.avoidHeaderText}>AVOID</Text>
            </View>
            {AVOID_WINDOWS.map((w, i) => (
              <View key={i} style={[styles.windowRow, i < AVOID_WINDOWS.length - 1 && styles.windowRowBorder]}>
                <Text style={styles.windowName}>{w.name}</Text>
                <Text style={styles.windowTime}>{w.time}</Text>
              </View>
            ))}
          </View>

          <SectionHeader title="HORA — PLANETARY HOURS" />

          <View style={styles.horaCard}>
            <View style={styles.horaGrid}>
              {HORA.map((h, i) => (
                <View key={i} style={styles.horaCell}>
                  <Text style={styles.horaTime}>{h.time}</Text>
                  <Text style={styles.horaPlanet}>{h.planet}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.horaMore} activeOpacity={0.7}>
              <Text style={styles.horaMoreText}>Show all 24 horas →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.halfRow}>
            <View style={styles.balaCard}>
              <Text style={styles.detailLabel}>CHANDRA BALA</Text>
              <Text style={styles.balaTitle}>Favourable for</Text>
              <Text style={styles.balaText}>{CHANDRA_BALA}</Text>
            </View>
            <View style={styles.balaCard}>
              <Text style={styles.detailLabel}>TARA BALA</Text>
              <Text style={styles.balaTitle}>Favourable janma stars</Text>
              <Text style={styles.balaText}>{TARA_BALA}</Text>
            </View>
          </View>

          <View style={styles.samvatCard}>
            <Text style={styles.detailLabel}>SAMVAT & ERA</Text>
            <View style={styles.samvatGrid}>
              <View style={styles.samvatCell}>
                <Text style={styles.samvatCellLabel}>Vikram samvat</Text>
                <Text style={styles.samvatCellValue}>{SAMVAT.vikram}</Text>
              </View>
              <View style={styles.samvatCell}>
                <Text style={styles.samvatCellLabel}>Shaka samvat</Text>
                <Text style={styles.samvatCellValue}>{SAMVAT.shaka}</Text>
              </View>
              <View style={styles.samvatCell}>
                <Text style={styles.samvatCellLabel}>Amanta month</Text>
                <Text style={styles.samvatCellValue}>{SAMVAT.amanta}</Text>
              </View>
              <View style={styles.samvatCell}>
                <Text style={styles.samvatCellLabel}>Purnimanta month</Text>
                <Text style={styles.samvatCellValue}>{SAMVAT.purnimanta}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.footerNote}>Panchang for {location}. Timings drift by minutes with location.</Text>

          <View style={styles.navRow}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => dispatch({ type: 'PREV_DAY' })}
              activeOpacity={0.7}
            >
              <ChevronLeft size={16} color={COLORS.primary} />
              <View>
                <Text style={styles.navLabel}>PREVIOUS</Text>
                <Text style={styles.navDate}>{prevLabel}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, styles.navButtonRight]}
              onPress={() => dispatch({ type: 'NEXT_DAY' })}
              activeOpacity={0.7}
            >
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.navLabel}>NEXT</Text>
                <Text style={styles.navDate}>{nextLabel}</Text>
              </View>
              <ChevronRight size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fullBg,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 14,
    backgroundColor: COLORS.fullBg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMeta: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: COLORS.primary,
    fontFamily: FONTS.monoSemiBold,
  },
  headerTitle: {
    marginTop: 14,
    fontFamily: FONTS.semiBold,
    fontSize: 24,
    letterSpacing: -0.5,
    color: COLORS.primary,
    lineHeight: 26.4,
  },
  headerLocation: {
    marginTop: 4,
    fontSize: 12.5,
    color: COLORS.subtle,
    fontFamily: FONTS.regular,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  thumbnail: {
    width: '100%',
    height: 170,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: '#e9eaec',
  },
  thumbnailPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d8c4b0',
  },
  thumbnailText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#6a5040',
  },
  introContainer: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
  introText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.light,
    lineHeight: 24.8,
  },
  detailCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 18,
    paddingBottom: 16,
    marginBottom: 12,
  },
  detailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.muted,
    fontFamily: FONTS.mono,
  },
  devanagari: {
    color: COLORS.devanagari,
  },
  detailRightLabel: {
    fontSize: 11.5,
    color: COLORS.subtle,
    fontFamily: FONTS.regular,
  },
  detailTitle: {
    marginTop: 8,
    fontSize: 22,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  detailSub: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.subtle,
    fontFamily: FONTS.regular,
  },
  detailDesc: {
    marginTop: 14,
    fontSize: 13.5,
    color: COLORS.light,
    lineHeight: 20.9,
    fontFamily: FONTS.regular,
  },
  halfRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  smallDetailCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
  },
  smallDetailTitle: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  smallDetailSub: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.subtle,
    fontFamily: FONTS.regular,
  },
  smallDetailDesc: {
    marginTop: 10,
    fontSize: 12.5,
    color: '#5a5a5a',
    lineHeight: 18.75,
    fontFamily: FONTS.regular,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderText: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: COLORS.accent,
    fontFamily: FONTS.monoSemiBold,
  },
  windowsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  windowRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  windowRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f2',
  },
  windowName: {
    fontSize: 13.5,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  windowSub: {
    marginTop: 2,
    fontSize: 11.5,
    color: COLORS.subtle,
    fontFamily: FONTS.regular,
  },
  windowTime: {
    fontSize: 13.5,
    color: COLORS.primary,
    fontFamily: FONTS.mono,
    fontVariant: ['tabular-nums'],
  },
  avoidCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  avoidHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.avoidBg,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f2',
  },
  avoidHeaderText: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: COLORS.accent,
    fontFamily: FONTS.monoSemiBold,
  },
  horaCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  horaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  horaCell: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horaTime: {
    fontSize: 12.5,
    color: '#5a5a5a',
    fontFamily: FONTS.mono,
  },
  horaPlanet: {
    fontSize: 12.5,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  horaMore: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  horaMoreText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.accent,
  },
  balaCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
  },
  balaTitle: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  balaText: {
    marginTop: 6,
    fontSize: 12.5,
    color: COLORS.light,
    lineHeight: 18.75,
    fontFamily: FONTS.regular,
  },
  samvatCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },
  samvatGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 16,
  },
  samvatCell: {
    width: '45%',
  },
  samvatCellLabel: {
    fontSize: 11.5,
    color: '#8a8a8a',
    fontFamily: FONTS.regular,
  },
  samvatCellValue: {
    marginTop: 3,
    fontSize: 14.5,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 11.5,
    color: COLORS.muted,
    paddingVertical: 4,
    fontFamily: FONTS.regular,
  },
  navRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginTop: 16,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.cardBg,
  },
  navButtonRight: {
    justifyContent: 'flex-end',
  },
  navLabel: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: COLORS.muted,
    fontFamily: FONTS.mono,
  },
  navDate: {
    fontSize: 13.5,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  sunMoonGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 14,
    columnGap: 16,
  },
  sunMoonCell: {
    width: '45%',
  },
  sunMoonLabel: {
    fontSize: 11.5,
    color: '#8a8a8a',
    fontFamily: FONTS.regular,
  },
  sunMoonValue: {
    marginTop: 3,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});
