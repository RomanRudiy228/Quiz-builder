import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const quiz = await prisma.quiz.create({
    data: {
      title: 'Sample JavaScript Quiz',
      questions: {
        create: [
          {
            type: 'boolean',
            text: 'JavaScript is a compiled language.',
            correctAnswer: 'false',
          },
          {
            type: 'input',
            text: 'What does DOM stand for?',
            correctAnswer: 'Document Object Model',
          },
          {
            type: 'checkbox',
            text: 'Which of the following are JavaScript frameworks?',
            options: JSON.stringify(['React', 'HTML', 'Vue', 'CSS', 'Angular']),
            correctAnswer: JSON.stringify(['React', 'Vue', 'Angular']),
          },
        ],
      },
    },
  });

  console.log('Created sample quiz:', quiz);
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

