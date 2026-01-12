import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/components/providers/providers';

export const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create and manage your custom quizzes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
