import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children }) => {
  const variantStyles = {
    default: 'bg-gray-200 text-gray-800',
    secondary: 'bg-blue-200 text-blue-800',
    destructive: 'bg-red-200 text-red-800',
  };

  return (
    <span className={`${variantStyles[variant]} rounded-full px-2 py-1 text-sm font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
