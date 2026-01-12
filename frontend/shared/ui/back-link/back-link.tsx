import Link from 'next/link';

export interface BackLinkProps {
  href: string;
  children?: string;
}

export default function BackLink({ href, children = '← Back' }: BackLinkProps) {
  return (
    <Link href={href} className="text-indigo-600 hover:text-indigo-800 font-medium">
      {children}
    </Link>
  );
}
