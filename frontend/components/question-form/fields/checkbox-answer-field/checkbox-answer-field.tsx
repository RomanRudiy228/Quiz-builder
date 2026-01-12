import CheckboxOptionsField from '../checkbox-options-field/checkbox-options-field';
import CheckboxAnswersField from '../checkbox-answers-field/checkbox-answers-field';
import { CheckboxAnswerFieldProps } from './types/checkbox-answer-field.types';

export default function CheckboxAnswerField({
  index,
  options,
  answers,
  setOptions,
  setAnswers,
  setValue,
}: CheckboxAnswerFieldProps) {
  return (
    <div className="space-y-4">
      <CheckboxOptionsField
        index={index}
        options={options}
        setOptions={setOptions}
        setValue={setValue}
      />
      <CheckboxAnswersField
        index={index}
        options={options}
        answers={answers}
        setAnswers={setAnswers}
        setValue={setValue}
      />
    </div>
  );
}
