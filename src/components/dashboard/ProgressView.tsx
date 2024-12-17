import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Book, Brain, Zap } from 'lucide-react';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUserStats } from '../../hooks/useUserStats';
import { useAuthState } from '../../hooks/useAuthState';
import type { Flashcard, UserStats } from '../../types';

export function ProgressView() {
  const { user } = useAuthState();
  const { stats, loading } = useUserStats();
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;

    // Listen to flashcards changes
    const flashcardsQuery = query(
      collection(db, 'flashcards'),
      where('userId', '==', user.uid)
    );

    const unsubscribeFlashcards = onSnapshot(flashcardsQuery, (snapshot) => {
      const cards: Flashcard[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        cards.push({
          id: doc.id,
          ...data,
          lastReviewed: data.lastReviewed?.toDate(),
        } as Flashcard);
      });
      setFlashcards(cards);
      setIsLoading(false);
    });

    // Listen to user stats changes
    const statsRef = doc(db, 'userStats', user.uid);
    const unsubscribeStats = onSnapshot(statsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Omit<UserStats, 'id'>;
        // Update stats in real-time if needed
      }
    });

    return () => {
      unsubscribeFlashcards();
      unsubscribeStats();
    };
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const masteredCards = flashcards.filter(card => 
    card.correctAnswers / Math.max(card.totalAttempts, 1) >= 0.8 && card.totalAttempts >= 5
  );

  const calculateProgress = () => {
    if (flashcards.length === 0) return 0;
    return (masteredCards.length / flashcards.length) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Book}
          title="Total Flashcards"
          value={flashcards.length}
          color="blue"
        />
        <StatCard
          icon={Brain}
          title="Quizzes Completed"
          value={stats?.totalQuizzes || 0}
          color="purple"
        />
        <StatCard
          icon={Trophy}
          title="Mastered Words"
          value={masteredCards.length}
          color="yellow"
        />
        <StatCard
          icon={Zap}
          title="Current Streak"
          value={stats?.streakDays || 0}
          suffix="days"
          color="green"
        />
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h3>
        <div className="space-y-6">
          <ProgressBar
            label="Overall Progress"
            value={calculateProgress()}
            color="blue"
          />
          <div className="mt-2 text-sm text-gray-600">
            {masteredCards.length} out of {flashcards.length} words mastered
          </div>
        </div>
      </div>

      {/* Mastered Words */}
      {masteredCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Mastered Words ({masteredCards.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {masteredCards.map(card => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <p className="font-medium text-gray-900">{card.word}</p>
                <p className="text-gray-600">{card.translation}</p>
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{
                      width: `${(card.correctAnswers / card.totalAttempts) * 100}%`
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Accuracy: {((card.correctAnswers / card.totalAttempts) * 100).toFixed(0)}%
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function StatCard({ icon: Icon, title, value, suffix = '', color }: {
  icon: any;
  title: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-8 h-8 text-${color}-500`} />
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>
            {value.toLocaleString()}{suffix && ` ${suffix}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ label, value, color }: {
  label: string;
  value: number;
  color: string;
}) {
  const percentage = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full bg-${color}-500`}
        />
      </div>
    </div>
  );
}