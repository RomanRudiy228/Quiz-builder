import { InputAnswerFieldProps } from './types/input-answer-field.types';
import Input from '@/shared/ui/input/input';

export default function InputAnswerField({ index, register, errors }: InputAnswerFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
      <Input
        register={register}
        name={`questions.${index}.inputAnswer`}
        placeholder="Enter the correct answer"
      />
      {Array.isArray(errors.questions) && errors.questions[index]?.inputAnswer && (
        <p className="mt-1 text-sm text-red-600">{errors.questions[index]?.inputAnswer?.message}</p>
      )}
    </div>
  );
}
