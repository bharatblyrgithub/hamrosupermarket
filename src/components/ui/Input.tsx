'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const id = props.id || props.name;
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            {...props}
            id={id}
            className={`
              block w-full rounded-md shadow-sm
              ${hasError 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }
              ${className}
            `}
            {...(hasError 
              ? { 'aria-invalid': 'true', 'aria-describedby': `${id}-error` }
              : { 'aria-invalid': 'false' }
            )}
          />
        </div>
        {error && (
          <p 
            className="mt-1 text-sm text-red-600" 
            id={`${id}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
