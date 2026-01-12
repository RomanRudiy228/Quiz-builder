import { Quiz } from '@/services/types/quizzes.types';

export interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}
