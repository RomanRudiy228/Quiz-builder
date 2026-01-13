import { InputAnswerFieldProps } from './types/input-answer-field.types';

export default function InputAnswerField({ index, register, errors }: InputAnswerFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
      <input
        {...register(`questions.${index}.inputAnswer`)}
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        placeholder="Enter the correct answer"
      />
      {Array.isArray(errors.questions) && errors.questions[index]?.inputAnswer && (
        <p className="mt-1 text-sm text-red-600">{errors.questions[index]?.inputAnswer?.message}</p>
      )}
    </div>
  );
}
