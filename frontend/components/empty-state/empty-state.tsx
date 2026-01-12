import Link from 'next/link';
import { EmptyStateProps } from './types/empty-state.types';

export default function EmptyState({
  message = 'No items found.',
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg mb-4">{message}</p>
      {actionText && actionHref && (
        <Link href={actionHref} className="text-indigo-600 hover:text-indigo-800 font-medium">
          {actionText}
        </Link>
      )}
    </div>
  );
}
