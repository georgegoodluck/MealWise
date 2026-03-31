import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT, SPACING } from '../constants/theme';

export function Header({ totalMeals, dayLabel, todayCount }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.appName}>Mealwise</Text>
        <Text style={styles.sub}>
          {todayCount > 0
            ? `${todayCount} meal${todayCount !== 1 ? 's' : ''} · ${dayLabel}`
            : `Nothing planned · ${dayLabel}`}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeNumber}>{totalMeals}</Text>
        <Text style={styles.badgeLabel}>saved</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  left:     { gap: 4 },
  appName:  { fontSize: 24, fontWeight: FONT.bold, color: COLORS.text, letterSpacing: -0.6 },
  sub:      { fontSize: 12, color: COLORS.textSub, fontWeight: FONT.medium },

  badge: {
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 8,
    alignItems: 'center', minWidth: 56,
  },
  badgeNumber: { fontSize: 20, fontWeight: FONT.bold, color: COLORS.accent, lineHeight: 24 },
  badgeLabel:  { fontSize: 9,  fontWeight: FONT.bold, color: COLORS.textFaint, textTransform: 'uppercase', letterSpacing: 0.6 },
});
