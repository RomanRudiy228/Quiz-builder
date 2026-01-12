'use client';

import Link from 'next/link';

import { QuizCardProps } from './types/quiz-card.types';

export default function QuizCard({ quiz, onDelete, isDeleting }: QuizCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 bg-white">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex-1">{quiz.title}</h2>
        <button
          onClick={() => onDelete(quiz.id)}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 disabled:text-gray-400 ml-2"
          title="Delete quiz"
        >
          {isDeleting ? '...' : '🗑️'}
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        {quiz.questionCount || 0} question
        {(quiz.questionCount || 0) !== 1 ? 's' : ''}
      </p>
      <Link
        href={`/quizzes/${quiz.id}`}
        className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        View Details
      </Link>
    </div>
  );
}
