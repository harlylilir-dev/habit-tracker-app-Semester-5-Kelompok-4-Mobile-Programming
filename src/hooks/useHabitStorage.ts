import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitContextType, Category } from '../types';

const STORAGE_KEY = '@habit_tracker_data_v1';

export const useHabitStorage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setHabits(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load habits", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Simpan data
  useEffect(() => {
    const saveData = async () => {
      if (isLoading) return;
      try {
        const jsonValue = JSON.stringify(habits);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        console.error("Failed to save habits", e);
      }
    };
    saveData();
  }, [habits, isLoading]);

  return { habits, setHabits, isLoading };
};