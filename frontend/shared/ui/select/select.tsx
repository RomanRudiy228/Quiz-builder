'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { SelectProps } from './types/select.types';
import { FaChevronDown } from 'react-icons/fa';

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => (Array.isArray(children) ? children : children ? [children] : []),
    [children],
  );

  useEffect(() => {
    if (options.length > 0) {
      const selectedOption = options.find((option: any) => option?.props?.value === value);
      if (selectedOption) {
        setSelectedLabel(selectedOption.props?.children || '');
      }
    }
  }, [value, children, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange({
        target: { value: optionValue },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
    setIsOpen(false);
  };

  const baseStyles =
    'w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 cursor-pointer bg-white relative';

  const selectedValue = value || '';

  if (register && name) {
    return (
      <div ref={selectRef} className="relative">
        <select
          {...register(name)}
          id={id}
          value={selectedValue}
          onChange={onChange}
          className="hidden"
          {...props}
        >
          {children}
        </select>
        <div className={`${baseStyles} ${className}`.trim()} onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center justify-between">
            <span>{selectedLabel || 'Select an option...'}</span>
            <FaChevronDown
              className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option: any, index: number) => {
              const optionValue = option?.props?.value;
              const optionLabel = option?.props?.children;
              const isSelected = optionValue === selectedValue;

              return (
                <div
                  key={optionValue || index}
                  onClick={() => handleOptionClick(optionValue)}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {optionLabel}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={selectRef} className="relative">
      <select
        id={id}
        name={name}
        value={selectedValue}
        onChange={onChange}
        className="hidden"
        {...props}
      >
        {children}
      </select>
      <div className={`${baseStyles} ${className}`.trim()} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <span>{selectedLabel || 'Select an option...'}</span>
          <FaChevronDown
            className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option: any, index: number) => {
            const optionValue = option?.props?.value;
            const optionLabel = option?.props?.children;
            const isSelected = optionValue === selectedValue;

            return (
              <div
                key={optionValue || index}
                onClick={() => handleOptionClick(optionValue)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {optionLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
