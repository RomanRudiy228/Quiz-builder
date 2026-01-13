import Link from 'next/link';
import { buttonVariants, buttonSizes } from '../button/utils/button.utils';
import { LinkButtonProps } from './types/link-button.types';

export default function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  fullWidth = false,
}: LinkButtonProps) {
  const baseStyles = 'inline-block font-semibold rounded-lg transition duration-200 text-center';
  const variantStyles = buttonVariants[variant];
  const sizeStyles = buttonSizes[size];
  const widthStyles = fullWidth ? 'w-full block' : '';
  const combinedClassName =
    `${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`.trim();

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
