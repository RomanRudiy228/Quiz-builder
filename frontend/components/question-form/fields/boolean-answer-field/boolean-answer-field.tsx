import { BooleanAnswerFieldProps } from './types/boolean-answer-field.types';

export default function BooleanAnswerField({ index, register }: BooleanAnswerFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
      <div className="flex gap-4">
        <label className="flex items-center text-gray-900">
          <input
            {...register(`questions.${index}.correctAnswer`)}
            type="radio"
            value="true"
            defaultChecked
            className="mr-2"
          />
          True
        </label>
        <label className="flex items-center text-gray-900">
          <input
            {...register(`questions.${index}.correctAnswer`)}
            type="radio"
            value="false"
            className="mr-2"
          />
          False
        </label>
      </div>
    </div>
  );
}
