import React from 'react';
import { useHabits } from '../context/HabitContext';
import { HabitCard } from './HabitCard';
import { motion } from 'framer-motion';

export const HabitList: React.FC = () => {
  const { habits } = useHabits();

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Habits</h2>
        <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {habits.length} Total
        </span>
      </div>

      <div className="space-y-4">
        {habits.length > 0 ? (
          habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <HabitCard habit={habit} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500">No habits found. Start your journey today!</p>
          </div>
        )}
      </div>
    </div>
  );
};