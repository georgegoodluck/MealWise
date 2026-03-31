import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Modal, Animated, Pressable,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import {
  COLORS, TYPE_CONFIG, MEAL_TYPES,
  DAYS, DAY_SHORT, FONT, SPACING, RADIUS,
} from '../constants/theme';

export function AddMealSheet({ visible, slideAnim, fadeAnim, onClose, onAdd, defaultDay, todayIndex }) {
  const [mealName,     setMealName]     = useState('');
  const [selectedType, setSelectedType] = useState('Breakfast');
  const [selectedDay,  setSelectedDay]  = useState(defaultDay);

  // Sync day when sheet reopens
  React.useEffect(() => {
    if (visible) setSelectedDay(defaultDay);
  }, [visible, defaultDay]);

  const handleAdd = () => {
    if (!mealName.trim()) return;
    onAdd({ name: mealName.trim(), type: selectedType, day: selectedDay });
    setMealName('');
    setSelectedType('Breakfast');
  };

  const handleClose = () => onClose(() => {
    setMealName('');
    setSelectedType('Breakfast');
  });

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

          <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
            {/* Handle */}
            <View style={styles.handle} />

            {/* Title row */}
            <View style={styles.titleRow}>
              <Text style={styles.title}>Add a meal</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* ── Meal name ── */}
            <Text style={styles.label}>What are you eating?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Jollof rice, Avocado toast..."
              placeholderTextColor={COLORS.textFaint}
              value={mealName}
              onChangeText={setMealName}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
              autoFocus
              selectionColor={COLORS.accent}
            />

            {/* ── Type ── */}
            <Text style={styles.label}>Meal type</Text>
            <View style={styles.typeGrid}>
              {MEAL_TYPES.map((t) => {
                const cfg = TYPE_CONFIG[t];
                const sel = t === selectedType;
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setSelectedType(t)}
                    activeOpacity={0.7}
                    style={[
                      styles.typeBtn,
                      sel && { backgroundColor: cfg.dimColor, borderColor: cfg.color },
                    ]}
                  >
                    <Text style={styles.typeIcon}>{cfg.icon}</Text>
                    <Text style={[styles.typeText, sel && { color: cfg.color }]}>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── Day ── */}
            <Text style={styles.label}>Day</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DAYS}
              keyExtractor={(d) => d}
              contentContainerStyle={{ gap: SPACING.sm, marginBottom: SPACING.xl }}
              renderItem={({ item, index }) => {
                const sel     = item === selectedDay;
                const isToday = index === todayIndex;
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedDay(item)}
                    activeOpacity={0.7}
                    style={[styles.dayChip, sel && styles.dayChipActive]}
                  >
                    {isToday && (
                      <View style={[styles.todayDot, sel && styles.todayDotActive]} />
                    )}
                    <Text style={[styles.dayChipText, sel && styles.dayChipTextActive]}>
                      {DAY_SHORT[index]}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            {/* ── CTA ── */}
            <TouchableOpacity
              style={[styles.cta, !mealName.trim() && styles.ctaDisabled]}
              onPress={handleAdd}
              disabled={!mealName.trim()}
              activeOpacity={0.85}
            >
              <Text style={[styles.ctaText, !mealName.trim() && styles.ctaTextDisabled]}>
                Add to {selectedDay}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.bgElevated,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  handle: {
    width: 36, height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.borderHigh,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  title:        { fontSize: 20, fontWeight: FONT.bold, color: COLORS.text },
  closeBtn:     {
    width: 30, height: 30,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 11, color: COLORS.textSub, fontWeight: FONT.semibold },

  label: {
    fontSize: 11, fontWeight: FONT.bold,
    color: COLORS.textSub,
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: SPACING.sm,
  },

  input: {
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md, paddingVertical: 14,
    fontSize: 16, color: COLORS.text,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.lg,
  },

  typeGrid: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.lg },
  typeBtn:  {
    flex: 1, alignItems: 'center',
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5, borderColor: COLORS.border,
    gap: 4,
  },
  typeIcon: { fontSize: 16 },
  typeText: { fontSize: 10, fontWeight: FONT.bold, color: COLORS.textSub, textTransform: 'uppercase', letterSpacing: 0.5 },

  dayChip: {
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5, borderColor: COLORS.border,
    alignItems: 'center', position: 'relative',
  },
  dayChipActive:     { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  dayChipText:       { fontSize: 13, fontWeight: FONT.semibold, color: COLORS.textSub },
  dayChipTextActive: { color: COLORS.bg },

  todayDot: {
    position: 'absolute', top: 4, right: 4,
    width: 5, height: 5, borderRadius: RADIUS.full,
    backgroundColor: COLORS.accent,
  },
  todayDotActive: { backgroundColor: COLORS.bg },

  cta: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaDisabled:     { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  ctaText:         { fontSize: 16, fontWeight: FONT.bold, color: COLORS.bg },
  ctaTextDisabled: { color: COLORS.textFaint },
});
