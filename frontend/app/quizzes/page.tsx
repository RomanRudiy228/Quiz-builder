'use client';

import LoadingSpinner from '@/components/loading-state/loading-state';
import QuizCard from '@/components/quiz-card/quiz-card';
import EmptyState from '@/components/empty-state/empty-state';
import { useQuizzesList } from './hooks/use-quizzes-list';
import BackLink from '@/shared/ui/back-link/back-link';
import LinkButton from '@/shared/ui/link-button/link-button';

export default function QuizzesList() {
  const { quizzes, loading, deletingId, handleDelete } = useQuizzesList();

  if (loading) {
    return <LoadingSpinner message="Loading quizzes..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <BackLink href="/">Back to Home</BackLink>
          <LinkButton href="/create" variant="primary">
            + Create New Quiz
          </LinkButton>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Quizzes</h1>

          {quizzes.length === 0 ? (
            <EmptyState
              message="No quizzes found."
              actionText="Create your first quiz"
              actionHref="/create"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onDelete={handleDelete}
                  isDeleting={deletingId === quiz.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
