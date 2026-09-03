import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../utils/theme';
import { LEARN_ARTICLES } from '../data/homeData';
import { ArrowUpRightIcon } from './Icons';

export default function LearnSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Learn</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {LEARN_ARTICLES.map((article) => (
          <TouchableOpacity key={article.title} style={styles.card} activeOpacity={0.8}>
            <View style={[styles.imageSlot, { backgroundColor: article.bg }]}>
              <Text style={styles.slotEmoji}>✦</Text>
            </View>
            <View style={styles.cardText}>
              <View style={styles.tagsRow}>
                {article.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
              </View>
              <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
              <Text style={styles.articleBlurb} numberOfLines={2}>{article.blurb}</Text>
              <View style={styles.arrowCircle}>
                <ArrowUpRightIcon size={12} color={COLORS.textPrimary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 26,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 260,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  imageSlot: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotEmoji: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.4)',
  },
  cardText: {
    flex: 1,
    padding: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  articleTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
    marginBottom: 6,
  },
  articleBlurb: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.buttonLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
