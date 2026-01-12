export class CreateQuestionDto {
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  correctAnswer: string;
  options?: string;
}
