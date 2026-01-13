'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import QuestionForm from '@/components/question-form/question-form';
import { createQuizSchema, type CreateQuizFormData } from './schemas/quiz.schema';
import { useCreateQuiz } from './hooks/use-create-quiz';
import BackLink from '@/shared/ui/back-link/back-link';
import Button from '@/shared/ui/button/button';
import LinkButton from '@/shared/ui/link-button/link-button';
import Input from '@/shared/ui/input/input';

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
          <BackLink href="/">Back to Home</BackLink>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Quiz</h1>

          <form onSubmit={handleSubmit((data) => createQuiz(data))} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <Input id="title" register={register} name="title" placeholder="Enter quiz title" />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
                <Button type="button" onClick={addQuestion} variant="success">
                  + Add Question
                </Button>
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

            <div className="flex justify-end gap-4 pt-4">
              <LinkButton href="/quizzes" variant="secondary" size="lg">
                Cancel
              </LinkButton>
              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                variant="primary"
                size="lg"
                className="min-w-[140px]"
              >
                Create Quiz
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
