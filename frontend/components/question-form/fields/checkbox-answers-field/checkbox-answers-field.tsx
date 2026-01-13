import { CheckboxAnswersFieldProps } from './types/checkbox-answers-field.types';
import Checkbox from '@/shared/ui/checkbox/checkbox';

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
        <Checkbox
          key={optIndex}
          checked={answers.includes(opt)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleAnswerChange(opt, e.target.checked)
          }
          label={opt || `Option ${optIndex + 1}`}
        />
      ))}
    </div>
  );
}
