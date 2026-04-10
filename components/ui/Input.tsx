// Reusable input component

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="group">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full 
              ${icon ? 'pl-12' : 'px-4'} 
              py-3 
              border-2 
              ${error ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'} 
              rounded-xl 
              focus:outline-none 
              focus:ring-4 
              ${error ? 'focus:ring-red-100 focus:border-red-500' : 'focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500'} 
              bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white 
              transition-all duration-200 
              hover:border-gray-300 dark:hover:border-gray-600
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;