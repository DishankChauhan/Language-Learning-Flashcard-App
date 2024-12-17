import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Quiz } from '../Quiz';
import { useAuthState } from '../../hooks/useAuthState';
import { updateQuizStats } from '../../utils/statsUpdater';
import type { Flashcard } from '../../types';

export function QuizView() {
  const { user } = useAuthState();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'flashcards'),
      where('userId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cards: Flashcard[] = [];
      snapshot.forEach((doc) => {
        cards.push({ id: doc.id, ...doc.data() } as Flashcard);
      });
      setFlashcards(cards);
    });

    return unsubscribe;
  }, [user]);

  const handleQuizComplete = async (results: { correct: number; total: number }) => {
    if (!user) return;

    setResults(results);
    setQuizCompleted(true);

    // Update user stats
    await updateQuizStats(user.uid, results.correct, results.total);
  };

  if (quizCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">
          You got {results.correct} out of {results.total} correct!
        </p>
        <button
          onClick={() => setQuizCompleted(false)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Take Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <Quiz flashcards={flashcards} onComplete={handleQuizComplete} />
    </div>
  );
}