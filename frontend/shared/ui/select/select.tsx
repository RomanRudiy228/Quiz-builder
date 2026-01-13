import { SelectProps } from './types/select.types';

export default function Select({
  id,
  value,
  onChange,
  register,
  name,
  children,
  className = '',
  ...props
}: SelectProps) {
  const baseStyles =
    'w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 cursor-pointer [appearance:none] [-webkit-appearance:none] [-moz-appearance:none] bg-[image:none]';

  if (register && name) {
    return (
      <select
        {...register(name)}
        id={id}
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${className}`.trim()}
        {...props}
      >
        {children}
      </select>
    );
  }

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </select>
  );
}
