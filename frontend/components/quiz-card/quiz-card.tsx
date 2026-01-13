'use client';

import LinkButton from '@/shared/ui/link-button/link-button';
import Button from '@/shared/ui/button/button';
import { FaTrash } from 'react-icons/fa';
import { QuizCardProps } from './types/quiz-card.types';

export default function QuizCard({ quiz, onDelete, isDeleting }: QuizCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 bg-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex-1">{quiz.title}</h2>
        <Button
          onClick={() => onDelete(quiz.id)}
          disabled={isDeleting}
          variant="ghost"
          size="sm"
          className="ml-2"
          title="Delete quiz"
        >
          {isDeleting ? '...' : <FaTrash className="text-red-500" />}
        </Button>
      </div>
      <p className="text-gray-600 mb-4">
        {quiz.questionCount || 0} question
        {(quiz.questionCount || 0) !== 1 ? 's' : ''}
      </p>
      <LinkButton href={`/quizzes/${quiz.id}`} variant="primary" fullWidth>
        View Details
      </LinkButton>
    </div>
  );
}
