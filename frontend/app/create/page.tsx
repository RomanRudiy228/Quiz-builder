'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import QuestionForm from '@/components/question-form/question-form';
import { createQuizSchema, type CreateQuizFormData } from './schemas/quiz.schema';
import { useCreateQuiz } from './hooks/use-create-quiz';

export default function CreateQuiz() {
  const { createQuiz, isSubmitting } = useCreateQuiz();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateQuizFormData>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [
        {
          type: 'boolean',
          text: '',
          correctAnswer: 'true',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () => {
    append({
      type: 'boolean',
      text: '',
      correctAnswer: 'true',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Quiz</h1>

          <form onSubmit={handleSubmit(createQuiz)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter quiz title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  + Add Question
                </button>
              </div>

              {fields.map((field, index) => (
                <QuestionForm
                  key={field.id}
                  index={index}
                  register={register}
                  control={control}
                  remove={remove}
                  errors={errors}
                  setValue={setValue}
                />
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {isSubmitting ? 'Creating...' : 'Create Quiz'}
              </button>
              <Link
                href="/quizzes"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg text-center transition duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
