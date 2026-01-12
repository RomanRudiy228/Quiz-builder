import { buttonVariants, buttonSizes } from './utils/button.utils';
import { ButtonProps } from './types/button.types';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = buttonVariants[variant];
  const sizeStyles = buttonSizes[size];
  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`.trim();

  return (
    <button className={combinedClassName} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
