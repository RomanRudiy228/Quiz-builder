import { InputProps } from './types/input.types';

export default function Input({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  register,
  name,
  className = '',
  ...props
}: InputProps) {
  const baseStyles =
    'w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900';

  if (register && name) {
    return (
      <input
        {...register(name)}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${baseStyles} ${className}`.trim()}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseStyles} ${className}`.trim()}
      {...props}
    />
  );
}
