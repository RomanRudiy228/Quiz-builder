import { BooleanAnswerFieldProps } from './types/boolean-answer-field.types';
import Radio from '@/shared/ui/radio/radio';

export default function BooleanAnswerField({ index, register }: BooleanAnswerFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
      <div className="flex gap-4">
        <Radio
          register={register}
          name={`questions.${index}.correctAnswer`}
          value="true"
          label="True"
          defaultChecked
        />
        <Radio
          register={register}
          name={`questions.${index}.correctAnswer`}
          value="false"
          label="False"
        />
      </div>
    </div>
  );
}
