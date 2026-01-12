import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { UseFormSetValue } from 'react-hook-form';

export interface CheckboxOptionsFieldProps {
  index: number;
  options: string[];
  setOptions: (options: string[]) => void;
  setValue: UseFormSetValue<CreateQuizFormData>;
}
