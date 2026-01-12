import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';
import { UseFormRegister } from 'react-hook-form';

export interface BooleanAnswerFieldProps {
  index: number;
  register: UseFormRegister<CreateQuizFormData>;
}
