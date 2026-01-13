import { CheckboxAnswersFieldProps } from './types/checkbox-answers-field.types';

export default function CheckboxAnswersField({
  index,
  options,
  answers,
  setAnswers,
  setValue,
}: CheckboxAnswersFieldProps) {
  const handleAnswerChange = (option: string, checked: boolean) => {
    let newAnswers: string[];
    if (checked) {
      newAnswers = [...answers, option];
    } else {
      newAnswers = answers.filter((a) => a !== option);
    }
    setAnswers(newAnswers);
    setValue(`questions.${index}.checkboxAnswers`, newAnswers);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Correct Answers (select all that apply)
      </label>
      {options.map((opt, optIndex) => (
        <label key={optIndex} className="flex items-center mb-2 text-gray-900">
          <input
            type="checkbox"
            checked={answers.includes(opt)}
            onChange={(e) => handleAnswerChange(opt, e.target.checked)}
            className="mr-2"
          />
          {opt || `Option ${optIndex + 1}`}
        </label>
      ))}
    </div>
  );
}
