import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, prefix, suffix, icon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random()}`;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {prefix && <div className="absolute left-3 text-foreground-tertiary flex items-center pointer-events-none">{prefix}</div>}
          
          {icon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-foreground-tertiary">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-3 py-2 text-sm
              bg-background border border-border rounded-lg
              text-foreground placeholder-foreground-tertiary
              transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              disabled:bg-background-secondary disabled:text-foreground-tertiary disabled:cursor-not-allowed
              ${error ? 'border-error focus:border-error focus:ring-error/10' : ''}
              ${(prefix || icon) ? 'pl-10' : ''}
              ${suffix ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />

          {suffix && <div className="absolute right-3 flex items-center pointer-events-none text-foreground-tertiary">{suffix}</div>}
        </div>

        {error && <p className="text-xs font-medium text-error">{error}</p>}
        {helperText && !error && <p className="text-xs text-foreground-tertiary">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
