export interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
  completedDates: string[]; // ISO Date strings (YYYY-MM-DD)
  color: string;
  targetPerWeek: number;
  icon?: string;
}

export interface UserStats {
  totalHabits: number;
  completedToday: number;
  currentStreak: number;
  completionRate: number;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type View = 'dashboard' | 'habits' | 'settings';
