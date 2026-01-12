import { apiRequest } from './utils/api.helper';
import { Quiz, CreateQuizData } from './types/quizzes.types';

export const quizApi = {
  create: async (data: CreateQuizData): Promise<Quiz> => {
    return apiRequest<Quiz>('/quizzes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async (): Promise<Quiz[]> => {
    return apiRequest<Quiz[]>('/quizzes');
  },

  getById: async (id: string): Promise<Quiz> => {
    return apiRequest<Quiz>(`/quizzes/${id}`);
  },

  delete: async (id: string): Promise<void> => {
    await apiRequest(`/quizzes/${id}`, {
      method: 'DELETE',
    });
  },
};

export type { Question, CreateQuizData, Quiz } from './types/quizzes.types';
