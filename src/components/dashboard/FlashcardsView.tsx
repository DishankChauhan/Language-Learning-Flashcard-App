import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FlashcardForm } from '../FlashcardForm';
import { FlashcardList } from '../FlashcardList';
import { useAuthState } from '../../hooks/useAuthState';
import type { Flashcard } from '../../types';

export function FlashcardsView() {
  const { user } = useAuthState();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

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

  const handleSubmit = async (flashcard: Omit<Flashcard, 'id' | 'masteryLevel' | 'userId'>) => {
    if (!user) return;

    if (editingCard) {
      await updateDoc(doc(db, 'flashcards', editingCard.id), {
        ...flashcard,
        lastReviewed: new Date(),
        masteryLevel: editingCard.masteryLevel,
      });
      setEditingCard(null);
    } else {
      await addDoc(collection(db, 'flashcards'), {
        ...flashcard,
        userId: user.uid,
        masteryLevel: 0,
        lastReviewed: new Date(),
        correctAnswers: 0,
        totalAttempts: 0,
      });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'flashcards', id));
  };

  const handleEdit = (flashcard: Flashcard) => {
    setEditingCard(flashcard);
  };

  return (
    <div className="space-y-8">
      <FlashcardForm
        onSubmit={handleSubmit}
        initialValues={editingCard || undefined}
      />
      <FlashcardList
        flashcards={flashcards}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}