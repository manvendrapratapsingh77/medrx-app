import React from 'react';
import {
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from '@/components/ui/select'; // shadcn wrapper
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
 * MedRx styled Select component that forwards to shadcn/ui Select.
 * Uses the primary green for the trigger border/focus.
 */
export const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select... ',
  value,
  onValueChange,
  className = '',
}) => (
  <SelectPrimitive value={value} onValueChange={onValueChange}>
    <SelectTrigger
      className={cn(
        'w-full rounded-lg border border-border bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary',
        className,
      )}
    >
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value} className="text-primary">
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </SelectPrimitive>
);

export default Select;
