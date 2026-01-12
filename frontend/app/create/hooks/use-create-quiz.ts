'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { quizApi, Question } from '@/services/quizzes.service';
import { CreateQuizFormData } from '../schemas/quiz.schema';
import { quizKeys } from '@/shared/query-keys/query-keys';

export function useCreateQuiz() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateQuizFormData) => {
      const formattedQuestions: Question[] = data.questions.map((q) => {
        const question: Question = {
          type: q.type,
          text: q.text,
          correctAnswer: '',
        };

        if (q.type === 'boolean') {
          question.correctAnswer = q.correctAnswer || 'true';
        } else if (q.type === 'input') {
          question.correctAnswer = q.inputAnswer || '';
        } else if (q.type === 'checkbox') {
          const selectedOptions = q.checkboxAnswers || [];
          question.correctAnswer = JSON.stringify(selectedOptions);
          question.options = JSON.stringify(q.checkboxOptions || []);
        }

        return question;
      });

      return quizApi.create({
        title: data.title,
        questions: formattedQuestions,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
      toast.success('Quiz created successfully!');
      router.push('/quizzes');
    },
    onError: () => {
      toast.error('Failed to create quiz. Please try again.');
    },
  });

  return {
    createQuiz: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
  };
}
