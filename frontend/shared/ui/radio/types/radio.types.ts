import { UseFormRegister } from 'react-hook-form';

export interface RadioProps {
  id?: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<any>;
  label: string;
  defaultChecked?: boolean;
  className?: string;
}
