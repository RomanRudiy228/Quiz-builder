import { UseFormRegister } from 'react-hook-form';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register?: UseFormRegister<any>;
  name?: string;
  className?: string;
}
