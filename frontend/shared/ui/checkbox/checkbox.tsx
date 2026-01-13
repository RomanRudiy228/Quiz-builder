import { CheckboxProps } from './types/checkbox.types';

export default function Checkbox({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  className = '',
}: CheckboxProps) {
  const labelStyles = 'flex items-center mb-2 text-gray-900 cursor-pointer';
  const checkboxStyles =
    'mr-2 w-5 h-5 border-2 border-gray-300 rounded outline-none cursor-pointer relative transition-all appearance-none [-webkit-appearance:none] bg-white checked:border-indigo-600 checked:bg-indigo-600 checked:after:content-[""] checked:after:absolute checked:after:top-[1px] checked:after:left-[5px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-white checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2';

  return (
    <label className={`${labelStyles} ${className}`.trim()}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={checkboxStyles}
      />
      {label}
    </label>
  );
}
