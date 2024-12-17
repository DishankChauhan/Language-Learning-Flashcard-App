import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { Flashcard, QuizState } from '../types';

interface QuizProps {
  flashcards: Flashcard[];
  onComplete: (results: { correct: number; total: number }) => void;
}

export function Quiz({ flashcards, onComplete }: QuizProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentCard: null,
    isAnswered: false,
    isCorrect: false,
    remainingCards: [],
  });
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  useEffect(() => {
    if (flashcards.length > 0) {
      const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
      setQuizState({
        currentCard: shuffled[0],
        isAnswered: false,
        isCorrect: false,
        remainingCards: shuffled.slice(1),
      });
      setCurrentQuestionNumber(1);
      setScore({ correct: 0, total: 0 });
    }
  }, [flashcards]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizState.currentCard || quizState.isAnswered) return;

    const isCorrect = answer.toLowerCase().trim() === quizState.currentCard.translation.toLowerCase().trim();
    setQuizState(prev => ({ ...prev, isAnswered: true, isCorrect }));
    
    // Only update the score when the answer is submitted
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    if (quizState.remainingCards.length === 0) {
      onComplete(score);
      return;
    }

    setQuizState({
      currentCard: quizState.remainingCards[0],
      isAnswered: false,
      isCorrect: false,
      remainingCards: quizState.remainingCards.slice(1),
    });
    setAnswer('');
    setCurrentQuestionNumber(prev => prev + 1);
  };

  if (!quizState.currentCard) {
    return <div className="text-center">No flashcards available for quiz</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="text-sm text-gray-500 mb-4">
        Question {currentQuestionNumber} of {flashcards.length}
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {quizState.currentCard.word}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={quizState.isAnswered}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter translation..."
        />
        
        {!quizState.isAnswered ? (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <div className="space-y-4">
            <div className={`flex items-center ${quizState.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {quizState.isCorrect ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 mr-2" />
              )}
              {quizState.isCorrect ? 'Correct!' : `Incorrect. The answer was: ${quizState.currentCard.translation}`}
            </div>
            <button
              onClick={nextQuestion}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Next Question
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </form>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Current Score:</span>
          <span>{score.correct} / {score.total}</span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${score.total > 0 ? (score.correct / score.total) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}