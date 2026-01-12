const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface Question {
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  correctAnswer: string;
  options?: string;
}

export interface CreateQuizData {
  title: string;
  questions: Question[];
}

export interface Quiz {
  id: string;
  title: string;
  questionCount?: number;
  createdAt?: string;
  questions?: Question[];
}

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

