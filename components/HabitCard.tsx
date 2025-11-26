import React from 'react';
import { Habit } from '../types';
import { motion } from 'framer-motion';
import { Check, Flame, Trash2 } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { format } from 'date-fns';

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleHabitCompletion, deleteHabit } = useHabits();
  const today = new Date();
  const isCompletedToday = habit.completedDates.includes(format(today, 'yyyy-MM-dd'));

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative group bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-transparent ${isCompletedToday ? 'dark:border-brand-500/20 border-brand-200' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => toggleHabitCompletion(habit.id, today)}
            whileTap={{ scale: 0.8 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isCompletedToday 
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isCompletedToday && <Check size={24} strokeWidth={3} />}
          </motion.button>
          
          <div>
            <h3 className={`font-semibold text-lg ${isCompletedToday ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {habit.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
              <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-medium">
                {habit.category}
              </span>
              <span className="flex items-center text-orange-500 font-medium">
                <Flame size={14} className="mr-1" /> {habit.streak} day streak
              </span>
            </div>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => deleteHabit(habit.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {/* Progress Bar for Weekly Target (Simulated) */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <div className="flex justify-between text-xs mb-1.5 text-gray-500">
            <span>Weekly Goal</span>
            <span>{Math.min(habit.streak, habit.targetPerWeek)} / {habit.targetPerWeek}</span>
        </div>
        <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((habit.streak / habit.targetPerWeek) * 100, 100)}%` }}
                className="h-full rounded-full"
                style={{ backgroundColor: habit.color }}
            />
        </div>
      </div>
    </motion.div>
  );
};