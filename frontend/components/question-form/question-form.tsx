'use client';

import { useState } from 'react';
import { useWatch, Control, UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface QuestionFormProps {
  index: number;
  register: UseFormRegister<any>;
  control: Control<any>;
  remove: (index: number) => void;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
}

export default function QuestionForm({
  index,
  register,
  control,
  remove,
  errors,
  setValue,
}: QuestionFormProps) {
  const question = useWatch({
    control,
    name: `questions.${index}`,
  });

  const type = question?.type || 'boolean';
  const [checkboxOptions, setCheckboxOptions] = useState<string[]>(
    question?.checkboxOptions || ['', ''],
  );
  const [checkboxAnswers, setCheckboxAnswers] = useState<string[]>(question?.checkboxAnswers || []);

  const handleTypeChange = (newType: string) => {
    setValue(`questions.${index}.type`, newType);
  };

  const addCheckboxOption = () => {
    setCheckboxOptions([...checkboxOptions, '']);
  };

  const removeCheckboxOption = (optIndex: number) => {
    setCheckboxOptions(checkboxOptions.filter((_, i) => i !== optIndex));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-4 bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-700">Question {index + 1}</h3>
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
          <select
            {...register(`questions.${index}.type`)}
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="boolean">True/False</option>
            <option value="input">Short Text Answer</option>
            <option value="checkbox">Multiple Choice (Checkbox)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
          <textarea
            {...register(`questions.${index}.text`, {
              required: 'Question text is required',
            })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your question"
          />
          {errors.questions?.[index]?.text && (
            <p className="mt-1 text-sm text-red-600">{errors.questions[index].text?.message}</p>
          )}
        </div>

        {type === 'boolean' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  {...register(`questions.${index}.correctAnswer`)}
                  type="radio"
                  value="true"
                  defaultChecked
                  className="mr-2"
                />
                True
              </label>
              <label className="flex items-center">
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
        )}

        {type === 'input' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
            <input
              {...register(`questions.${index}.inputAnswer`, {
                required: 'Correct answer is required',
              })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the correct answer"
            />
            {errors.questions?.[index]?.inputAnswer && (
              <p className="mt-1 text-sm text-red-600">
                {errors.questions[index].inputAnswer?.message}
              </p>
            )}
          </div>
        )}

        {type === 'checkbox' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
              {checkboxOptions.map((opt, optIndex) => (
                <div key={optIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...checkboxOptions];
                      newOptions[optIndex] = e.target.value;
                      setCheckboxOptions(newOptions);
                      setValue(`questions.${index}.checkboxOptions`, newOptions);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  {checkboxOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeCheckboxOption(optIndex)}
                      className="text-red-600 hover:text-red-800 px-3"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCheckboxOption}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                + Add Option
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answers (select all that apply)
              </label>
              {checkboxOptions.map((opt, optIndex) => (
                <label key={optIndex} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={checkboxAnswers.includes(opt)}
                    onChange={(e) => {
                      let newAnswers: string[];
                      if (e.target.checked) {
                        newAnswers = [...checkboxAnswers, opt];
                        setCheckboxAnswers(newAnswers);
                      } else {
                        newAnswers = checkboxAnswers.filter((a) => a !== opt);
                        setCheckboxAnswers(newAnswers);
                      }
                      setValue(`questions.${index}.checkboxAnswers`, newAnswers);
                    }}
                    className="mr-2"
                  />
                  {opt || `Option ${optIndex + 1}`}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
