import { RadioProps } from './types/radio.types';

export default function Radio({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  register,
  defaultChecked,
  className = '',
}: RadioProps) {
  const labelStyles = 'flex items-center text-gray-900 cursor-pointer';
  const radioStyles =
    'mr-2 w-5 h-5 border-2 border-gray-300 rounded-full outline-none cursor-pointer relative transition-all appearance-none [-webkit-appearance:none] checked:border-indigo-600 checked:before:content-[""] checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:w-2.5 checked:before:h-2.5 checked:before:rounded-full checked:before:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2';

  if (register && name) {
    return (
      <label className={`${labelStyles} ${className}`.trim()}>
        <input
          {...register(name)}
          type="radio"
          id={id}
          value={value}
          defaultChecked={defaultChecked}
          className={radioStyles}
        />
        {label}
      </label>
    );
  }

  return (
    <label className={`${labelStyles} ${className}`.trim()}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        defaultChecked={defaultChecked}
        className={radioStyles}
      />
      {label}
    </label>
  );
}
