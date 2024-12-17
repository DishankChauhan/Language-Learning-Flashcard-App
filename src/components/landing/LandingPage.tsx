import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Book, Trophy, Globe, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          LassheCards
        </motion.div>
        <div className="space-x-4">
          <Link
            to="/auth"
            className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Master Any Language with Flashcards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Create, study, and track your progress with our interactive flashcard system.
            Learn smarter, not harder.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-x-4"
          >
            <Link
              to="/auth"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all inline-flex items-center"
            >
              Start Learning Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Book,
                title: 'Smart Flashcards',
                description: 'Create and organize your personalized deck of flashcards with ease',
                color: 'blue'
              },
              {
                icon: Brain,
                title: 'Adaptive Learning',
                description: 'Our system adapts to your learning pace and remembers your progress',
                color: 'purple'
              },
              {
                icon: Trophy,
                title: 'Track Progress',
                description: 'Monitor your learning journey with detailed statistics and insights',
                color: 'pink'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <feature.icon className={`w-12 h-12 mb-4 text-${feature.color}-400`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 p-6 rounded-xl"
            >
              <Globe className="w-10 h-10 mx-auto mb-4 text-blue-400" />
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-gray-400">Languages Supported</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="bg-white/5 p-6 rounded-xl"
            >
              <Users className="w-10 h-10 mx-auto mb-4 text-purple-400" />
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-gray-400">Active Learners</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white/5 p-6 rounded-xl"
            >
              <Sparkles className="w-10 h-10 mx-auto mb-4 text-pink-400" />
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-400">Flashcards Created</div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
        </div>
      </main>
    </div>
  );
}