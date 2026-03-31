import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { COLORS, TYPE_CONFIG, FONT, SPACING, RADIUS } from '../constants/theme';

export function MealCard({ meal, onRemove }) {
  const cfg      = TYPE_CONFIG[meal.type];
  const scaleRef = useRef(new Animated.Value(1)).current;

  const handleRemove = () => {
    Animated.sequence([
      Animated.timing(scaleRef, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleRef, { toValue: 1,    duration: 60, useNativeDriver: true }),
    ]).start(() => onRemove(meal.id));
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleRef }] }]}>
      <View style={[styles.typeStripe, { backgroundColor: cfg.color }]} />
      <View style={styles.body}>
        <Text style={styles.mealName} numberOfLines={1}>{meal.name}</Text>
      </View>
      <TouchableOpacity
        onPress={handleRemove}
        style={styles.deleteZone}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={styles.deleteBtn}>
          <Text style={styles.deleteIcon}>−</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 6,
    overflow: 'hidden',
  },
  typeStripe: { width: 3, alignSelf: 'stretch' },
  body: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
  },
  mealName: { fontSize: 15, fontWeight: FONT.medium, color: COLORS.text },

  deleteZone: { paddingHorizontal: SPACING.md },
  deleteBtn: {
    width: 28, height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceHigh,
    borderWidth: 1, borderColor: COLORS.borderHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  deleteIcon: { fontSize: 18, color: COLORS.textFaint, lineHeight: 20, fontWeight: FONT.regular },
});
