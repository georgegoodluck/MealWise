import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { COLORS, DAYS, DAY_SHORT, FONT, SPACING, RADIUS } from '../constants/theme';

export function DayStrip({ activeDay, onSelectDay, getCountForDay, todayIndex }) {
  const renderTab = ({ item, index }) => {
    const isActive = item === activeDay;
    const isToday  = index === todayIndex;
    const count    = getCountForDay(item);

    return (
      <TouchableOpacity
        onPress={() => onSelectDay(item)}
        style={[styles.tab, isActive && styles.tabActive]}
        activeOpacity={0.7}
      >
        {isToday && (
          <View style={[styles.todayIndicator, isActive && styles.todayIndicatorActive]} />
        )}
        <Text style={[styles.dayText, isActive && styles.dayTextActive]}>
          {DAY_SHORT[index]}
        </Text>
        {count > 0 ? (
          <View style={[styles.countBubble, isActive && styles.countBubbleActive]}>
            <Text style={[styles.countText, isActive && styles.countTextActive]}>
              {count}
            </Text>
          </View>
        ) : (
          <View style={styles.countSpacer} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={DAYS}
      keyExtractor={(d) => d}
      contentContainerStyle={styles.strip}
      renderItem={renderTab}
    />
  );
}

const styles = StyleSheet.create({
  strip: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.md },

  tab: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 52,
    gap: 4,
    position: 'relative',
  },
  tabActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  todayIndicator: {
    position: 'absolute',
    top: 5, right: 5,
    width: 5, height: 5,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accent,
  },
  todayIndicatorActive: { backgroundColor: COLORS.bg },

  dayText:       { fontSize: 13, fontWeight: FONT.semibold, color: COLORS.textSub },
  dayTextActive: { color: COLORS.bg },

  countBubble: {
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: RADIUS.full,
    minWidth: 18, height: 18,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4,
  },
  countBubbleActive: { backgroundColor: COLORS.accentPress },
  countText:         { fontSize: 9, fontWeight: FONT.bold, color: COLORS.textSub },
  countTextActive:   { color: COLORS.bg },
  countSpacer:       { height: 18 },
});
