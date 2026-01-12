import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
