import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { CreateQuizFormData } from '@/app/create/schemas/quiz.schema';

export interface QuestionFormProps {
  index: number;
  register: UseFormRegister<CreateQuizFormData>;
  control: Control<CreateQuizFormData>;
  remove: (index: number) => void;
  errors: FieldErrors<CreateQuizFormData>;
  setValue: UseFormSetValue<CreateQuizFormData>;
}
