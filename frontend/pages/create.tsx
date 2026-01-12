import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { quizApi, Question } from '@/services/quizzes.service';
import Link from 'next/link';

type FormData = {
  title: string;
  questions: Array<{
    type: 'boolean' | 'input' | 'checkbox';
    text: string;
    correctAnswer?: string;
    inputAnswer?: string;
    checkboxOptions?: string[];
    checkboxAnswers?: string[];
  }>;
};

export default function CreateQuiz() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      questions: [
        {
          type: 'boolean',
          text: '',
          correctAnswer: 'true',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Format questions for API
      const formattedQuestions: Question[] = data.questions.map((q) => {
        const question: Question = {
          type: q.type,
          text: q.text,
          correctAnswer: '',
        };

        if (q.type === 'boolean') {
          question.correctAnswer = q.correctAnswer || 'true';
        } else if (q.type === 'input') {
          question.correctAnswer = q.inputAnswer || '';
        } else if (q.type === 'checkbox') {
          const selectedOptions = q.checkboxAnswers || [];
          question.correctAnswer = JSON.stringify(selectedOptions);
          question.options = JSON.stringify(q.checkboxOptions || []);
        }

        return question;
      });

      await quizApi.create({
        title: data.title,
        questions: formattedQuestions,
      });

      router.push('/quizzes');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addQuestion = () => {
    append({
      type: 'boolean',
      text: '',
      correctAnswer: 'true',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Quiz</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter quiz title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  + Add Question
                </button>
              </div>

              {fields.map((field, index) => (
                <QuestionForm
                  key={field.id}
                  index={index}
                  register={register}
                  control={control}
                  remove={remove}
                  errors={errors}
                  setValue={setValue}
                />
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {isSubmitting ? 'Creating...' : 'Create Quiz'}
              </button>
              <Link
                href="/quizzes"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg text-center transition duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function QuestionForm({ index, register, control, remove, errors, setValue }: any) {
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
