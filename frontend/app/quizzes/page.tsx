'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { quizApi, Quiz } from '@/services/quizzes.service';
import LoadingSpinner from '@/components/loading-state/loading-state';
import QuizCard from '@/components/quizzes/quiz-card';

export default function QuizzesList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await quizApi.getAll();
      setQuizzes(data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      alert('Failed to load quizzes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) {
      return;
    }

    setDeletingId(id);
    try {
      await quizApi.delete(id);
      setQuizzes(quizzes.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading quizzes..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Home
          </Link>
          <Link
            href="/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            + Create New Quiz
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Quizzes</h1>

          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No quizzes found.</p>
              <Link href="/create" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Create your first quiz →
              </Link>
            </div>
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
