import React, { forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random()}`;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-3 py-2 text-sm appearance-none
              bg-background border border-border rounded-lg
              text-foreground
              transition-all duration-200
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              disabled:bg-background-secondary disabled:text-foreground-tertiary disabled:cursor-not-allowed
              ${error ? 'border-error focus:border-error focus:ring-error/10' : ''}
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-tertiary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {error && <p className="text-xs font-medium text-error">{error}</p>}
        {helperText && !error && <p className="text-xs text-foreground-tertiary">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
