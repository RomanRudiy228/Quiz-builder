export class CreateQuestionDto {
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  correctAnswer: string; // JSON string for checkbox, string for input, "true"/"false" for boolean
  options?: string; // JSON string for checkbox options array
}

export class CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
