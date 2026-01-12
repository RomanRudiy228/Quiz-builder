import { Module } from '@nestjs/common';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, QuizzesModule],
})
export class AppModule {}
