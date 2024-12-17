export interface Flashcard {
  id: string;
  userId: string;
  word: string;
  translation: string;
  notes?: string;
  masteryLevel: number;
  lastReviewed: Date;
  correctAnswers: number;
  totalAttempts: number;
}

export interface QuizState {
  currentCard: Flashcard | null;
  isAnswered: boolean;
  isCorrect: boolean;
  remainingCards: Flashcard[];
}

export interface UserStats {
  id: string;
  userId: string;
  totalQuizzes: number;
  totalCorrectAnswers: number;
  totalAttempts: number;
  lastQuizDate: Date;
  streakDays: number;
  masteredWords: number;
}

export interface FlashcardFormProps {
  onSubmit: (flashcard: Omit<Flashcard, 'id' | 'masteryLevel' | 'userId'>) => Promise<void>;
  initialValues?: Flashcard;
}

export interface AuthError {
  code: string;
  message: string;
}