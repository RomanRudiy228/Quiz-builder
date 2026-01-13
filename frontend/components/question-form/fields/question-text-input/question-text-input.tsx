import { QuestionTextInputProps } from './types/question-text-input.types';
import Textarea from '@/shared/ui/textarea/textarea';

export default function QuestionTextInput({ index, register, errors }: QuestionTextInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
      <Textarea
        register={register}
        name={`questions.${index}.text`}
        rows={3}
        placeholder="Enter your question"
      />
      {Array.isArray(errors.questions) && errors.questions[index]?.text && (
        <p className="mt-1 text-sm text-red-600">{errors.questions[index]?.text?.message}</p>
      )}
    </div>
  );
}
