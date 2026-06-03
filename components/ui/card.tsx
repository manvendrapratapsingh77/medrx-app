import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Simple Card component with the MedRx design tokens.
 * - White background, rounded corners (xl), subtle shadow.
 * - Hover elevation effect.
 */
export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-card-bg rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
  >
    {children}
  </div>
);

export default Card;
