'use client';

import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { QuestionFormProps } from './types/question-form.types';
import QuestionTypeSelector from './fields/question-type-selector/question-type-selector';
import QuestionTextInput from './fields/question-text-input/question-text-input';
import BooleanAnswerField from './fields/boolean-answer-field/boolean-answer-field';
import InputAnswerField from './fields/input-answer-field/input-answer-field';
import CheckboxAnswerField from './fields/checkbox-answer-field/checkbox-answer-field';

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

  const handleTypeChange = (newType: 'boolean' | 'input' | 'checkbox') => {
    setValue(`questions.${index}.type`, newType);
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
        <QuestionTypeSelector
          index={index}
          register={register}
          value={type}
          onChange={handleTypeChange}
        />

        <QuestionTextInput index={index} register={register} errors={errors} />

        {type === 'boolean' && <BooleanAnswerField index={index} register={register} />}

        {type === 'input' && <InputAnswerField index={index} register={register} errors={errors} />}

        {type === 'checkbox' && (
          <CheckboxAnswerField
            index={index}
            options={checkboxOptions}
            answers={checkboxAnswers}
            setOptions={setCheckboxOptions}
            setAnswers={setCheckboxAnswers}
            setValue={setValue}
          />
        )}
      </div>
    </div>
  );
}
