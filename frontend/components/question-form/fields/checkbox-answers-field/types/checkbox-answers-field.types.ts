import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { UseFormSetValue } from 'react-hook-form';

export interface CheckboxAnswersFieldProps {
  index: number;
  options: string[];
  answers: string[];
  setAnswers: (answers: string[]) => void;
  setValue: UseFormSetValue<CreateQuizFormData>;
}
