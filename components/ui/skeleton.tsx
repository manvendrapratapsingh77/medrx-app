import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Generic loading skeleton component.
 *
 * `className` can be used to set the width/height of the placeholder, e.g.
 * `<Skeleton className="h-4 w-32" />`.
 * It uses Tailwind's `animate-pulse` with a light grey background that fits the
 * MedRx off‑white theme.
 */
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={cn(
      'bg-gray-200 rounded-md animate-pulse',
      className,
    )}
  />
);

export default Skeleton;
