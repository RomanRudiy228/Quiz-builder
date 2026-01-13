import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { BackLinkProps } from './types/back-link.types';

export default function BackLink({ href, children = 'Back' }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors"
    >
      <FaArrowLeft className="text-sm" />
      {children}
    </Link>
  );
}
