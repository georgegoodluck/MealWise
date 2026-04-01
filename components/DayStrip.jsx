import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, DAYS, DAY_SHORT, FONT, MEAL_TYPES, RADIUS, SPACING, TYPE_CONFIG } from '../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const H_PAD        = SPACING.lg * 2;
const GAP          = 6;
const CARD_WIDTH   = (SCREEN_WIDTH - H_PAD - GAP * 6) / 7;

export function DayStrip({ activeDay, onSelectDay, getCountForDay, getMealsForDay, todayIndex }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.grid}>
        {DAYS.map((day, index) => {
          const isActive    = day === activeDay;
          const isToday     = index === todayIndex;
          const count       = getCountForDay(day);
          const dayMeals    = getMealsForDay(day);
          const presentTypes = MEAL_TYPES.filter((t) =>
            dayMeals.some((m) => m.type === t)
          );

          return (
            <TouchableOpacity
              key={day}
              onPress={() => onSelectDay(day)}
              activeOpacity={0.75}
              style={[
                styles.card,
                isActive && styles.cardActive,
                isToday && !isActive && styles.cardToday,
              ]}
            >
              {/* Top accent bar for today */}
              {isToday && (
                <View style={[styles.todayBar, isActive && styles.todayBarActive]} />
              )}

              {/* Day abbreviation */}
              <Text style={[styles.dayLabel, isActive && styles.dayLabelActive]}>
                {DAY_SHORT[index]}
              </Text>

              {/* Meal count */}
              <Text style={[
                styles.countNum,
                isActive && styles.countNumActive,
                count === 0 && styles.countNumEmpty,
              ]}>
                {count > 0 ? count : '·'}
              </Text>

              {/* Coloured type dots */}
              <View style={styles.dotsRow}>
                {presentTypes.slice(0, 3).map((t) => (
                  <View
                    key={t}
                    style={[
                      styles.typeDot,
                      { backgroundColor: isActive ? COLORS.bg + 'AA' : TYPE_CONFIG[t].color },
                    ]}
                  />
                ))}
                {presentTypes.length === 0 && <View style={styles.dotSpacer} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    gap: GAP,
  },
  card: {
    width: CARD_WIDTH,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  cardActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  cardToday: {
    borderColor: COLORS.accent,
    borderWidth: 1.5,
  },
  todayBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 3,
    backgroundColor: COLORS.accent,
    borderTopLeftRadius:  RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },
  todayBarActive: { backgroundColor: COLORS.bg + '55' },

  dayLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.textSub,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  dayLabelActive: { color: COLORS.bg },

  countNum: {
    fontSize: 18,
    fontWeight: FONT.bold,
    color: COLORS.text,
    lineHeight: 22,
  },
  countNumActive: { color: COLORS.bg },
  countNumEmpty:  { color: COLORS.textFaint, fontSize: 16 },

  dotsRow: {
    flexDirection: 'row',
    gap: 3,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  typeDot: {
    width: 5, height: 5,
    borderRadius: RADIUS.full,
  },
  dotSpacer: { height: 5 },
});