import LinkButton from '@/shared/ui/link-button/link-button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Builder</h1>
        <p className="text-gray-600 mb-8">Create and manage your custom quizzes</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton href="/create" variant="primary" size="lg">
            Create Quiz
          </LinkButton>
          <LinkButton href="/quizzes" variant="secondary" size="lg">
            View All Quizzes
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
