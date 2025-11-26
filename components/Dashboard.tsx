import React, { useMemo } from 'react';
import { useHabits } from '../context/HabitContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { format, subDays, startOfWeek, addDays, getDay } from 'date-fns';
import { Activity, TrendingUp, Calendar, Trophy } from 'lucide-react';
import { HabitCard } from './HabitCard';

export const Dashboard: React.FC = () => {
  const { habits, getHabitStats } = useHabits();
  const stats = getHabitStats();

  // Prepare chart data: Last 7 days
  const chartData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayName = format(date, 'EEE');
      
      const count = habits.reduce((acc, habit) => {
        return acc + (habit.completedDates.includes(dateStr) ? 1 : 0);
      }, 0);

      data.push({ name: dayName, count });
    }
    return data;
  }, [habits]);

  // Sort habits: incomplete first, then by streak
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const sortedHabits = [...habits].sort((a, b) => {
    const aDone = a.completedDates.includes(todayStr);
    const bDone = b.completedDates.includes(todayStr);
    if (aDone === bDone) return 0;
    return aDone ? 1 : -1;
  });

  return (
    <div className="space-y-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatsCard 
            icon={<Trophy size={20} className="text-yellow-500" />} 
            label="Completion Rate" 
            value={`${stats.overallRate}%`}
            color="bg-yellow-500/10"
        />
        <StatsCard 
            icon={<Activity size={20} className="text-brand-500" />} 
            label="Habits Active" 
            value={stats.total}
            color="bg-brand-500/10"
        />
        <StatsCard 
            icon={<Calendar size={20} className="text-emerald-500" />} 
            label="Completed Today" 
            value={stats.completedToday}
            color="bg-emerald-500/10"
        />
        <StatsCard 
            icon={<TrendingUp size={20} className="text-purple-500" />} 
            label="Best Streak" 
            value={Math.max(...habits.map(h => h.streak), 0)}
            color="bg-purple-500/10"
        />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Chart Section */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">Weekly Overview</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    dy={10}
                />
                <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[6, 6, 6, 6]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#3b82f6' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mini Calendar or Motivation */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 rounded-3xl shadow-lg shadow-brand-500/20 relative overflow-hidden flex flex-col justify-center"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Keep going!</h3>
                <p className="text-brand-100 text-sm mb-6">
                    "Consistency is not about perfection. It's about simply not giving up."
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono bg-white/10 w-fit px-3 py-1.5 rounded-lg">
                   <span>{format(new Date(), 'EEEE, MMMM do')}</span>
                </div>
            </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white px-1">Today's Focus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedHabits.length > 0 ? sortedHabits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          )) : (
            <div className="col-span-2 text-center py-10 text-gray-500">
                No habits yet. Click + to add one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center space-y-2">
        <div className={`p-2 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</div>
        </div>
    </div>
);