export function calculateStreak(lastQuizDate: Date | null): number {
  if (!lastQuizDate) return 0;

  const now = new Date();
  const last = new Date(lastQuizDate);
  
  // Reset hours to compare dates only
  now.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  // If more than 1 day has passed, streak is broken
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1) return 0;
  
  return diffDays === 0 ? 1 : 1; // Current day counts as 1
}