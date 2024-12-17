import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { UserStats } from '../types';
import { useAuthState } from './useAuthState';

export function useUserStats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthState();

  useEffect(() => {
    if (!user) {
      setStats(null);
      setLoading(false);
      return;
    }

    const statsRef = doc(db, 'userStats', user.uid);
    const unsubscribe = onSnapshot(statsRef, (doc) => {
      if (doc.exists()) {
        setStats({ id: doc.id, ...doc.data() } as UserStats);
      } else {
        setStats(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { stats, loading };
}