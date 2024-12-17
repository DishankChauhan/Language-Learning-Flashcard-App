import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Brain, BarChart, LogOut } from 'lucide-react';
import { FlashcardsView } from './FlashcardsView';
import { QuizView } from './QuizView';
import { ProgressView } from './ProgressView';
import { auth } from '../../config/firebase';

export function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2] || 'flashcards');

  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'flashcards';
    setActiveTab(path);
  }, [location]);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  LassheCards
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/dashboard" icon={Book} text="Flashcards" isActive={activeTab === 'flashcards'} />
                <NavLink to="/dashboard/quiz" icon={Brain} text="Quiz" isActive={activeTab === 'quiz'} />
                <NavLink to="/dashboard/progress" icon={BarChart} text="Progress" isActive={activeTab === 'progress'} />
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<FlashcardsView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/progress" element={<ProgressView />} />
        </Routes>
      </main>
    </div>
  );
}

function NavLink({ to, icon: Icon, text, isActive }: { to: string; icon: any; text: string; isActive: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
        isActive
          ? 'border-blue-500 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {text}
    </Link>
  );
}