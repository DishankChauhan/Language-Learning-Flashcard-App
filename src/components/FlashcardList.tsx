import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Flashcard } from '../types';

interface FlashcardListProps {
  flashcards: Flashcard[];
  onDelete: (id: string) => void;
  onEdit: (flashcard: Flashcard) => void;
}

export function FlashcardList({ flashcards, onDelete, onEdit }: FlashcardListProps) {
  return (
    <div className="space-y-4">
      {flashcards.map((flashcard) => (
        <div
          key={flashcard.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{flashcard.word}</h3>
              <p className="text-gray-600">{flashcard.translation}</p>
              {flashcard.notes && (
                <p className="text-sm text-gray-500">{flashcard.notes}</p>
              )}
              <div className="text-sm text-gray-400">
                Mastery Level: {flashcard.masteryLevel}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(flashcard)}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(flashcard.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}