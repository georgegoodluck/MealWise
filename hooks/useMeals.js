import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@meal_planner_v2';

export function useMeals() {
  const [meals, setMeals]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setMeals(JSON.parse(raw));
    } catch (e) {
      console.error('[useMeals] load failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (updated) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('[useMeals] save failed:', e);
    }
  };

  const addMeal = useCallback(({ name, type, day }) => {
    const meal = {
      id:        Date.now().toString(),
      name:      name.trim(),
      type,
      day,
      createdAt: new Date().toISOString(),
    };
    setMeals((prev) => {
      const updated = [...prev, meal];
      persist(updated);
      return updated;
    });
  }, []);

  const removeMeal = useCallback((id) => {
    setMeals((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const getMealsForDay = useCallback(
    (day) => meals.filter((m) => m.day === day),
    [meals],
  );

  const getCountForDay = useCallback(
    (day) => meals.filter((m) => m.day === day).length,
    [meals],
  );

  return {
    meals,
    loading,
    addMeal,
    removeMeal,
    getMealsForDay,
    getCountForDay,
  };
}
