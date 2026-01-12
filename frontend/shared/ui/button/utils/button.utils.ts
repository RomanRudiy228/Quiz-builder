export type ButtonVariants = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
export type ButtonSizes = 'sm' | 'md' | 'lg';

export const buttonVariants: Record<ButtonVariants, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'text-gray-600 hover:text-gray-800 bg-transparent hover:bg-gray-100',
};

export const buttonSizes: Record<ButtonSizes, string> = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2.5 px-5',
  lg: 'py-3 px-6',
};
