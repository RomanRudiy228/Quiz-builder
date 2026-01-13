import { UseFormRegister } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>;
  name?: string;
  className?: string;
}
