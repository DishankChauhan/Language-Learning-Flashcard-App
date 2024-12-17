import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { calculateStreak } from './streakCalculator';
import type { UserStats } from '../types';

export async function initializeUserStats(userId: string) {
  const statsRef = doc(db, 'userStats', userId);
  const statsDoc = await getDoc(statsRef);

  if (!statsDoc.exists()) {
    const initialStats: Omit<UserStats, 'id'> = {
      userId,
      totalQuizzes: 0,
      totalCorrectAnswers: 0,
      totalAttempts: 0,
      lastQuizDate: new Date(),
      streakDays: 1,
      masteredWords: 0
    };

    await setDoc(statsRef, initialStats);
  }
}

export async function updateQuizStats(
  userId: string,
  correctAnswers: number,
  totalAttempts: number
) {
  const statsRef = doc(db, 'userStats', userId);
  const statsDoc = await getDoc(statsRef);

  if (!statsDoc.exists()) {
    await initializeUserStats(userId);
  }

  const currentStats = statsDoc.data() as Omit<UserStats, 'id'>;
  const now = new Date();
  const streak = calculateStreak(currentStats.lastQuizDate?.toDate());

  await updateDoc(statsRef, {
    totalQuizzes: (currentStats.totalQuizzes || 0) + 1,
    totalCorrectAnswers: (currentStats.totalCorrectAnswers || 0) + correctAnswers,
    totalAttempts: (currentStats.totalAttempts || 0) + totalAttempts,
    lastQuizDate: now,
    streakDays: streak
  });
}