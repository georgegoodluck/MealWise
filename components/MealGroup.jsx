import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MealCard } from './MealCard';
import { COLORS, TYPE_CONFIG, FONT, SPACING } from '../constants/theme';

export function MealGroup({ type, meals, onRemove }) {
  const cfg = TYPE_CONFIG[type];

  return (
    <View style={styles.group}>
      {/* Section header */}
      <View style={styles.header}>
        <Text style={styles.icon}>{cfg.icon}</Text>
        <Text style={[styles.label, { color: cfg.color }]}>{type}</Text>
        <View style={[styles.rule, { backgroundColor: cfg.color + '30' }]} />
        <Text style={[styles.count, { color: cfg.color }]}>{meals.length}</Text>
      </View>

      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} onRemove={onRemove} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group:  { marginBottom: SPACING.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  icon:  { fontSize: 13 },
  label: { fontSize: 11, fontWeight: FONT.bold, textTransform: 'uppercase', letterSpacing: 0.9 },
  rule:  { flex: 1, height: 1 },
  count: { fontSize: 11, fontWeight: FONT.bold },
});
