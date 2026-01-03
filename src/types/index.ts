// FILE: src/types/index.ts

export type Category = 'Health' | 'Work' | 'Learning' | 'General';

export interface Habit {
  id: string;
  title: string;
  category: Category;
  completedDates: string[];
  createdAt: string;
  reminderTime?: string;
}

export interface HabitContextType {
  habits: Habit[];
  addHabit: (title: string, category: Category, reminderTime?: Date) => Promise<void>;
  toggleHabitCompletion: (id: string, date: string) => void;
  deleteHabit: (id: string) => void;
  resetData: () => void;
  isLoading: boolean;
}