import { CheckboxOptionsFieldProps } from './types/checkbox-options-field.types';
import Input from '@/shared/ui/input/input';

export default function CheckboxOptionsField({
  index,
  options,
  setOptions,
  setValue,
}: CheckboxOptionsFieldProps) {
  const addOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
    setValue(`questions.${index}.checkboxOptions`, newOptions);
  };

  const removeOption = (optIndex: number) => {
    const newOptions = options.filter((_, i) => i !== optIndex);
    setOptions(newOptions);
    setValue(`questions.${index}.checkboxOptions`, newOptions);
  };

  const updateOption = (optIndex: number, value: string) => {
    const newOptions = [...options];
    newOptions[optIndex] = value;
    setOptions(newOptions);
    setValue(`questions.${index}.checkboxOptions`, newOptions);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
      {options.map((opt, optIndex) => (
        <div key={optIndex} className="flex gap-2 mb-2">
          <Input
            type="text"
            value={opt}
            onChange={(e) => updateOption(optIndex, e.target.value)}
            placeholder={`Option ${optIndex + 1}`}
            className="flex-1"
          />
          {options.length > 2 && (
            <button
              type="button"
              onClick={() => removeOption(optIndex)}
              className="text-red-600 hover:text-red-800 px-3"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
      >
        + Add Option
      </button>
    </div>
  );
}
