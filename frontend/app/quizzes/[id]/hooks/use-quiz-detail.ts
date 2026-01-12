'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { quizApi, Quiz } from '@/services/quizzes.service';

export function useQuizDetail(id: string | undefined) {
  const {
    data: quiz,
    isLoading: loading,
    error,
  } = useQuery<Quiz>({
    queryKey: ['quiz', id],
    queryFn: () => {
      if (!id) throw new Error('Quiz ID is required');
      return quizApi.getById(id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load quiz. Please try again.');
    }
  }, [error]);

  return {
    quiz: quiz || null,
    loading,
  };
}
