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
