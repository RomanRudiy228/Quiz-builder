import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { UseFormRegister } from 'react-hook-form';

export interface QuestionTypeSelectorProps {
  index: number;
  register: UseFormRegister<CreateQuizFormData>;
  value: 'boolean' | 'input' | 'checkbox';
  onChange: (newType: 'boolean' | 'input' | 'checkbox') => void;
}
