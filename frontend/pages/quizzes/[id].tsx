import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { quizApi, Quiz } from '@/services/quizzes.service';

export default function QuizDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      loadQuiz(id);
    }
  }, [id]);

  const loadQuiz = async (quizId: string) => {
    try {
      const data = await quizApi.getById(quizId);
      setQuiz(data);
    } catch (error) {
      console.error('Error loading quiz:', error);
      alert('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Quiz not found</p>
          <Link href="/quizzes" className="text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/quizzes" className="text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Quizzes
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
          <p className="text-gray-600 mb-6">
            {quiz.questions?.length || 0} question
            {(quiz.questions?.length || 0) !== 1 ? 's' : ''}
          </p>

          <div className="space-y-6">
            {quiz.questions?.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {question.type}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{question.text}</p>

                {question.type === 'boolean' && (
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600 mb-2">Correct Answer:</p>
                    <p className="font-medium text-gray-800">
                      {question.correctAnswer === 'true' ? 'True' : 'False'}
                    </p>
                  </div>
                )}

                {question.type === 'input' && (
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600 mb-2">Correct Answer:</p>
                    <p className="font-medium text-gray-800">{question.correctAnswer}</p>
                  </div>
                )}

                {question.type === 'checkbox' && (
                  <div className="bg-white border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-600 mb-2">Options:</p>
                    {question.options && (
                      <ul className="list-disc list-inside space-y-1 mb-3">
                        {JSON.parse(question.options).map((opt: string, i: number) => (
                          <li key={i} className="text-gray-800">
                            {opt}
                            {JSON.parse(question.correctAnswer).includes(opt) && (
                              <span className="ml-2 text-green-600 font-medium">✓ (correct)</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-sm text-gray-600">
                      Correct answers: {JSON.parse(question.correctAnswer).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
