import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface QuestionTextInputProps {
  index: number;
  register: UseFormRegister<CreateQuizFormData>;
  errors: FieldErrors<CreateQuizFormData>;
}
