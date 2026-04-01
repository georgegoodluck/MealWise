import { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AddMealSheet } from '../components/AddMealSheet';
import { DayStrip } from '../components/DayStrip';
import { EmptyState } from '../components/EmptyState';
import { Header } from '../components/Header';
import { MealGroup } from '../components/MealGroup';
import { COLORS, DAYS, MEAL_TYPES, RADIUS, SPACING } from '../constants/theme';
import { useMeals } from '../hooks/useMeals';
import { useModal } from '../hooks/useModal';

// Today mapped to our Mon-based index (0=Mon … 6=Sun)
const getTodayIndex = () => {
  const d = new Date().getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1;
};

export default function HomeScreen() {
  const todayIndex = getTodayIndex();
  const [activeDay, setActiveDay] = useState(DAYS[todayIndex]);

  const { meals, addMeal, removeMeal, getMealsForDay, getCountForDay } = useMeals();
  const { visible, open, close, slideAnim, fadeAnim }                  = useModal();

  const mealsForDay = getMealsForDay(activeDay);

  // Group by meal type, only types that have entries
  const grouped = useMemo(() =>
    MEAL_TYPES
      .map((type) => ({ type, items: mealsForDay.filter((m) => m.type === type) }))
      .filter((g) => g.items.length > 0),
    [mealsForDay],
  );

  const handleAdd = ({ name, type, day }) => {
    addMeal({ name, type, day });
    close();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <Header
        totalMeals={meals.length}
        dayLabel={activeDay}
        todayCount={mealsForDay.length}
      />

      <DayStrip
        activeDay={activeDay}
        onSelectDay={setActiveDay}
        getCountForDay={getCountForDay}
        getMealsForDay={getMealsForDay}
        todayIndex={todayIndex}
      />

      {/* Thin rule */}
      <View style={styles.rule} />

      {/* Meal groups */}
      <FlatList
        data={grouped}
        keyExtractor={(g) => g.type}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MealGroup type={item.type} meals={item.items} onRemove={removeMeal} />
        )}
        ListEmptyComponent={<EmptyState day={activeDay} />}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={open} activeOpacity={0.85}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Bottom sheet */}
      <AddMealSheet
        visible={visible}
        slideAnim={slideAnim}
        fadeAnim={fadeAnim}
        onClose={close}
        onAdd={handleAdd}
        defaultDay={activeDay}
        todayIndex={todayIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  rule: { height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.lg, marginBottom: SPACING.sm },
  list: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: 110 },

  fab: {
    position: 'absolute', bottom: 36, right: 24,
    width: 58, height: 58, borderRadius: RADIUS.full,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 14,
    elevation: 10,
  },
  fabText: {
    fontSize: 30, color: COLORS.bg,
    lineHeight: 34, marginTop: -2, fontWeight: '300',
  },
});