import { ReactNode } from 'react';
import { ButtonVariants } from '../../button/utils/button.utils';
import { ButtonSizes } from '../../button/utils/button.utils';

export interface LinkButtonProps {
  href: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}
