import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { UseFormSetValue } from 'react-hook-form';

export interface CheckboxAnswerFieldProps {
  index: number;
  options: string[];
  answers: string[];
  setOptions: (options: string[]) => void;
  setAnswers: (answers: string[]) => void;
  setValue: UseFormSetValue<CreateQuizFormData>;
}
