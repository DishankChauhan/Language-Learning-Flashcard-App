import React from 'react';
import { Trophy, Book, Brain } from 'lucide-react';
import type { Flashcard } from '../types';

interface ProgressProps {
  flashcards: Flashcard[];
  totalQuizzes: number;
}

export function Progress({ flashcards, totalQuizzes }: ProgressProps) {
  const masteredCards = flashcards.filter(card => card.masteryLevel >= 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Total Flashcards</h3>
              <p className="text-2xl font-bold text-blue-600">{flashcards.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Quizzes Completed</h3>
              <p className="text-2xl font-bold text-green-600">{totalQuizzes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Mastered Words</h3>
              <p className="text-2xl font-bold text-yellow-600">{masteredCards.length}</p>
            </div>
          </div>
        </div>
      </div>

      {masteredCards.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mastered Words</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {masteredCards.map(card => (
              <div key={card.id} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium text-gray-900">{card.word}</p>
                <p className="text-gray-600">{card.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}