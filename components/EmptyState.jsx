import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT, SPACING } from '../constants/theme';

export function EmptyState({ day }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>🍽️</Text>
      </View>
      <Text style={styles.title}>Nothing planned</Text>
      <Text style={styles.body}>
        Tap the <Text style={styles.highlight}>+</Text> button to add meals for {day}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: SPACING.xl,
  },
  iconWrap: {
    width: 72, height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  icon:      { fontSize: 32 },
  title:     { fontSize: 17, fontWeight: FONT.semibold, color: COLORS.text, marginBottom: 8 },
  body:      { fontSize: 14, color: COLORS.textSub, textAlign: 'center', lineHeight: 22 },
  highlight: { color: COLORS.accent, fontWeight: FONT.bold },
});
