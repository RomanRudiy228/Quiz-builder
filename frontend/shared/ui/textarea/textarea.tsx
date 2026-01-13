import { TextareaProps } from './types/textarea.types';

export default function Textarea({
  id,
  placeholder,
  value,
  onChange,
  register,
  name,
  rows = 3,
  className = '',
  ...props
}: TextareaProps) {
  const baseStyles =
    'w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 resize-none';

  if (register && name) {
    return (
      <textarea
        {...register(name)}
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={`${baseStyles} ${className}`.trim()}
        {...props}
      />
    );
  }

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`${baseStyles} ${className}`.trim()}
      {...props}
    />
  );
}
