import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional Tailwind classes applied to the input.
   */
  className?: string;
}

/**
 * Styled text input matching the MedRx design system.
 * - Border with the defined `border` color.
 * - Focus ring uses the primary green.
 * - Rounded corners (lg) and subtle padding.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-border bg-white px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export default Input;
