import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Smartphone, Bell, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6 pb-20"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Appearance</h3>
        </div>
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                </div>
            </div>
            <button 
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-brand-600' : 'bg-gray-200'}`}
            >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">General</h3>
        </div>
        
        <SettingsItem icon={<Bell size={20} />} label="Notifications" description="Manage daily reminders" />
        <SettingsItem icon={<Database size={20} />} label="Data & Storage" description="Export or clear your data" />
        <SettingsItem icon={<Shield size={20} />} label="Privacy" description="Manage your privacy settings" />
        <SettingsItem icon={<Smartphone size={20} />} label="About" description="Version 1.0.0" />
      </div>
    </motion.div>
  );
};

const SettingsItem = ({ icon, label, description }: { icon: React.ReactNode, label: string, description: string }) => (
    <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    </button>
);