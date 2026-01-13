import { QuestionTextInputProps } from './types/question-text-input.types';

export default function QuestionTextInput({ index, register, errors }: QuestionTextInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
      <textarea
        {...register(`questions.${index}.text`)}
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        placeholder="Enter your question"
      />
      {Array.isArray(errors.questions) && errors.questions[index]?.text && (
        <p className="mt-1 text-sm text-red-600">{errors.questions[index]?.text?.message}</p>
      )}
    </div>
  );
}
