import { z } from 'zod';

export const questionSchema = z
  .object({
    type: z.enum(['boolean', 'input', 'checkbox']),
    text: z.string().min(1, 'Question text is required'),
    correctAnswer: z.string().optional(),
    inputAnswer: z.string().optional(),
    checkboxOptions: z.array(z.string()).optional(),
    checkboxAnswers: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'boolean') {
        return data.correctAnswer === 'true' || data.correctAnswer === 'false';
      }
      return true;
    },
    {
      message: 'Please select a correct answer (True or False)',
      path: ['correctAnswer'],
    },
  )
  .refine(
    (data) => {
      if (data.type === 'input') {
        return data.inputAnswer && data.inputAnswer.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Correct answer is required',
      path: ['inputAnswer'],
    },
  )
  .refine(
    (data) => {
      if (data.type === 'checkbox') {
        if (!data.checkboxOptions || data.checkboxOptions.length < 2) {
          return false;
        }
        if (!data.checkboxOptions.every((opt) => opt.trim().length > 0)) {
          return false;
        }
        return true;
      }
      return true;
    },
    {
      message: 'At least 2 non-empty options are required',
      path: ['checkboxOptions'],
    },
  )
  .refine(
    (data) => {
      if (data.type === 'checkbox') {
        return data.checkboxAnswers && data.checkboxAnswers.length > 0;
      }
      return true;
    },
    {
      message: 'Please select at least one correct answer',
      path: ['checkboxAnswers'],
    },
  );

export const createQuizSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  questions: z
    .array(questionSchema)
    .min(1, 'At least one question is required')
    .max(50, 'Maximum 50 questions allowed'),
});

export type CreateQuizFormData = z.infer<typeof createQuizSchema>;
export type QuestionFormData = z.infer<typeof questionSchema>;
