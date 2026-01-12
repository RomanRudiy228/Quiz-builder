import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { title, questions } = createQuizDto;

    const quiz = await this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            type: q.type,
            text: q.text,
            correctAnswer: q.correctAnswer,
            options: q.options || null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return quiz;
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
      createdAt: quiz.createdAt,
    }));
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      return null;
    }

    return quiz;
  }

  async remove(id: string) {
    await this.prisma.quiz.delete({
      where: { id },
    });
    return { message: 'Quiz deleted successfully' };
  }
}

