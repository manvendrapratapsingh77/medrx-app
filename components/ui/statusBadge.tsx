import React from 'react';
import { cn } from '@/lib/utils';

type Status = 'pending' | 'approved' | 'rejected' | 'completed';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

/**
 * Small badge that displays a status with color coding matching the MedRx theme.
 * - pending: amber (use #F59E0B)
 * - approved: green (primary)
 * - rejected: red (use #DC2626)
 * - completed: dark green (primary-dark)
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const colorMap: Record<Status, string> = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-primary-light text-primary-dark',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-primary-dark text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        colorMap[status],
        className,
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
