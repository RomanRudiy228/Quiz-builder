import { QuestionTypeSelectorProps } from './types/question-type-selector.types';
import Select from '@/shared/ui/select/select';

export default function QuestionTypeSelector({
  index,
  register,
  value,
  onChange,
}: QuestionTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
      <Select
        register={register}
        name={`questions.${index}.type`}
        value={value}
        onChange={(e) => onChange(e.target.value as 'boolean' | 'input' | 'checkbox')}
      >
        <option value="boolean" className="bg-white text-gray-900 py-2">
          True/False
        </option>
        <option value="input" className="bg-white text-gray-900 py-2">
          Short Text Answer
        </option>
        <option value="checkbox" className="bg-white text-gray-900 py-2">
          Multiple Choice (Checkbox)
        </option>
      </Select>
    </div>
  );
}
