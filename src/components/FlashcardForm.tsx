import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import type { FlashcardFormProps } from '../types';

export function FlashcardForm({ onSubmit, initialValues }: FlashcardFormProps) {
  const [word, setWord] = useState(initialValues?.word || '');
  const [translation, setTranslation] = useState(initialValues?.translation || '');
  const [notes, setNotes] = useState(initialValues?.notes || '');

  useEffect(() => {
    if (initialValues) {
      setWord(initialValues.word);
      setTranslation(initialValues.translation);
      setNotes(initialValues.notes || '');
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) return;
    
    await onSubmit({
      word: word.trim(),
      translation: translation.trim(),
      notes: notes.trim(),
      lastReviewed: new Date(),
      correctAnswers: initialValues?.correctAnswers || 0,
      totalAttempts: initialValues?.totalAttempts || 0
    });
    
    if (!initialValues) {
      setWord('');
      setTranslation('');
      setNotes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">
            Word/Phrase
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="translation" className="block text-sm font-medium text-gray-700">
            Translation
          </label>
          <input
            type="text"
            id="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          {initialValues ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
      </div>
    </form>
  );
}