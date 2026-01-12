import { QuestionTypeSelectorProps } from './types/question-type-selector.types';

export default function QuestionTypeSelector({
  index,
  register,
  value,
  onChange,
}: QuestionTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
      <select
        {...register(`questions.${index}.type`)}
        value={value}
        onChange={(e) => onChange(e.target.value as 'boolean' | 'input' | 'checkbox')}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
      >
        <option value="boolean">True/False</option>
        <option value="input">Short Text Answer</option>
        <option value="checkbox">Multiple Choice (Checkbox)</option>
      </select>
    </div>
  );
}
