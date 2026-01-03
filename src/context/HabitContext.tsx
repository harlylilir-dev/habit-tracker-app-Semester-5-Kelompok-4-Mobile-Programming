import React, { createContext, useContext, ReactNode } from 'react';
import { Habit, HabitContextType, Category } from '../types';
import { useHabitStorage } from '../hooks/useHabitStorage';
import { useNotifications } from '../hooks/useNotifications';

// Membuat Context Kosong
const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const { habits, setHabits, isLoading } = useHabitStorage();
  const { scheduleNotification, cancelNotification } = useNotifications();

  // --- LOGIKA APLIKASI ---

  // 1. Tambah Habit Baru
  const addHabit = async (title: string, category: Category, reminderTime?: Date) => {
    let notificationId;
    
    // Jika ada jam pengingat, jadwalkan notifikasi (Logika disiapkan untuk nanti)
    if (reminderTime) {
      const hour = reminderTime.getHours();
      const minute = reminderTime.getMinutes();
      const id = await scheduleNotification(title, hour, minute);
      if (id) notificationId = id;
    }

    const newHabit: Habit = {
      // Menggunakan Math.random() agar ID unik dan mencegah error "duplicate key"
      id: Date.now().toString() + Math.random().toString(), 
      title,
      category,
      completedDates: [],
      createdAt: new Date().toISOString(),
      reminderTime: reminderTime ? reminderTime.toISOString() : undefined,
    };

    setHabits((prev) => [...prev, newHabit]);
  };

  // 2. Toggle Status (Centang/Hapus Centang Harian)
  const toggleHabitCompletion = (id: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const isCompleted = habit.completedDates.includes(date);
          return {
            ...habit,
            completedDates: isCompleted
              // PERBAIKAN UTAMA DI SINI:
              // Menambahkan ": string" agar TypeScript tidak bingung (error hilang)
              ? habit.completedDates.filter((d: string) => d !== date) // Uncheck
              : [...habit.completedDates, date], // Check
          };
        }
        return habit;
      })
    );
  };

  // 3. Hapus Habit
  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // 4. Reset Data (Fitur Demo)
  const resetData = () => {
    setHabits([]);
  };

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, toggleHabitCompletion, deleteHabit, resetData, isLoading }}
    >
      {children}
    </HabitContext.Provider>
  );
};

// Custom Hook agar mudah dipanggil
export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};