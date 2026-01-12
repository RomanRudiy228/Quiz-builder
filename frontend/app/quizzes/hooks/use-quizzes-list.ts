'use client';

import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { quizApi, Quiz } from '@/services/quizzes.service';

export function useQuizzesList() {
  const queryClient = useQueryClient();

  const {
    data: quizzes = [],
    isLoading: loading,
    error,
  } = useQuery<Quiz[]>({
    queryKey: ['quizzes'],
    queryFn: () => quizApi.getAll(),
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load quizzes. Please try again.');
    }
  }, [error]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => quizApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Quiz[]>(['quizzes'], (old) =>
        old ? old.filter((q) => q.id !== id) : [],
      );
      toast.success('Quiz deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete quiz. Please try again.');
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) {
      return;
    }
    deleteMutation.mutate(id);
  };

  return {
    quizzes,
    loading,
    deletingId: deleteMutation.isPending ? deleteMutation.variables || null : null,
    handleDelete,
  };
}
