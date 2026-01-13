import { UseFormRegister } from 'react-hook-form';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register?: UseFormRegister<any>;
  name?: string;
  className?: string;
  children: React.ReactNode;
}
