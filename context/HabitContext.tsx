import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit } from '../types';
import { format } from 'date-fns';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
  deleteHabit: (id: string) => void;
  getHabitStats: () => { total: number; completedToday: number; overallRate: number };
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const DUMMY_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    category: 'Mindfulness',
    streak: 12,
    completedDates: [
        format(new Date(), 'yyyy-MM-dd'), 
        format(new Date(Date.now() - 86400000), 'yyyy-MM-dd')
    ],
    color: '#8b5cf6', // Violet
    targetPerWeek: 7,
  },
  {
    id: '2',
    name: 'Read 30 Minutes',
    category: 'Learning',
    streak: 5,
    completedDates: [],
    color: '#10b981', // Emerald
    targetPerWeek: 5,
  },
  {
    id: '3',
    name: 'Workout',
    category: 'Health',
    streak: 3,
    completedDates: [format(new Date(), 'yyyy-MM-dd')],
    color: '#f43f5e', // Rose
    targetPerWeek: 4,
  },
  {
    id: '4',
    name: 'Drink 3L Water',
    category: 'Health',
    streak: 20,
    completedDates: [format(new Date(), 'yyyy-MM-dd')],
    color: '#3b82f6', // Blue
    targetPerWeek: 7,
  }
];

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : DUMMY_HABITS;
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabitData: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...newHabitData,
      id: crypto.randomUUID(),
      streak: 0,
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const toggleHabitCompletion = (id: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const isCompleted = h.completedDates.includes(dateStr);
        let newCompletedDates;
        let newStreak = h.streak;

        if (isCompleted) {
          newCompletedDates = h.completedDates.filter((d) => d !== dateStr);
          // Simple streak logic decrement (not perfect but sufficient for demo)
          newStreak = Math.max(0, newStreak - 1);
        } else {
          newCompletedDates = [...h.completedDates, dateStr];
          newStreak = newStreak + 1;
        }

        return {
          ...h,
          completedDates: newCompletedDates,
          streak: newStreak,
        };
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const getHabitStats = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const total = habits.length;
    const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;
    
    // Calculate simple overall completion rate based on last 7 days for all habits
    // (This is a simplified metric)
    const overallRate = total === 0 ? 0 : Math.round((completedToday / total) * 100);

    return { total, completedToday, overallRate };
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabitCompletion, deleteHabit, getHabitStats }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within a HabitProvider');
  return context;
};