import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface InputAnswerFieldProps {
  index: number;
  register: UseFormRegister<CreateQuizFormData>;
  errors: FieldErrors<CreateQuizFormData>;
}
