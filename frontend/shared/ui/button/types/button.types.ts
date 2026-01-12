import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonVariants, ButtonSizes } from '../utils/button.utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children: ReactNode;
  isLoading?: boolean;
}
