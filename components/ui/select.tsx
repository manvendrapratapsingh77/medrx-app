import React from 'react';
import { cn } from '@/lib/utils';

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * Simple native select input styled to match the app.
 */
export const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select... ',
  value = '',
  onValueChange,
  className = '',
}) => (
  <select
    value={value}
    onChange={(event) => onValueChange?.(event.target.value)}
    className={cn(
      'w-full rounded-lg border border-border bg-white px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary',
      className,
    )}
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
