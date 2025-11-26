import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HabitProvider } from './context/HabitContext';
import { Layout, LayoutDashboard, List, Plus, Settings as SettingsIcon } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { HabitList } from './components/HabitList';
import { Settings } from './components/Settings';
import { AddHabitModal } from './components/AddHabitModal';
import { AnimatePresence } from 'framer-motion';

// Mobile Navigation Component
const MobileNav = ({ onAddClick }: { onAddClick: () => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-40 px-6 py-3 flex justify-between items-center md:hidden">
      <NavItem to="/" icon={<LayoutDashboard size={24} />} />
      <NavItem to="/habits" icon={<List size={24} />} />
      
      <div className="relative -top-6">
        <button 
            onClick={onAddClick}
            className="w-14 h-14 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-500/40 hover:scale-105 transition-transform"
        >
            <Plus size={28} />
        </button>
      </div>

      <div className="w-8"></div> {/* Spacer for center button */}
      <NavItem to="/settings" icon={<SettingsIcon size={24} />} />
    </div>
  );
};

// Sidebar for Desktop
const Sidebar = ({ onAddClick }: { onAddClick: () => void }) => {
    return (
        <div className="hidden md:flex flex-col w-64 fixed h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 bg-brand-600 rounded-lg"></div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Atomic</h1>
            </div>

            <nav className="space-y-2 flex-1">
                <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <SidebarItem to="/habits" icon={<List size={20} />} label="My Habits" />
                <SidebarItem to="/settings" icon={<SettingsIcon size={20} />} label="Settings" />
            </nav>

            <button 
                onClick={onAddClick}
                className="w-full py-3 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors"
            >
                <Plus size={18} /> New Habit
            </button>
        </div>
    );
};

const NavItem = ({ to, icon }: { to: string, icon: React.ReactNode }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `p-2 rounded-xl transition-colors ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`
    }
  >
    {icon}
  </NavLink>
);

const SidebarItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
    <NavLink 
        to={to}
        className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300 font-medium' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`
        }
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

const MainContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-sans">
            <Sidebar onAddClick={() => setIsModalOpen(true)} />
            
            <main className="md:ml-64 p-6 md:p-10 max-w-5xl mx-auto min-h-screen">
                <div className="flex justify-between items-center md:hidden mb-6">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg"></div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Atomic</h1>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/habits" element={<HabitList />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </AnimatePresence>
            </main>

            <MobileNav onAddClick={() => setIsModalOpen(true)} />
            <AddHabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HabitProvider>
        <Router>
            <MainContent />
        </Router>
      </HabitProvider>
    </ThemeProvider>
  );
};

export default App;