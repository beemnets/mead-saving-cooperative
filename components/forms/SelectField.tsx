import { forwardRef } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, helperText, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none ${
            error ? 'border-error focus:border-error focus:ring-error/10' : ''
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs font-medium text-error">{error}</p>}
        {helperText && !error && <p className="text-xs text-foreground-tertiary">{helperText}</p>}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';
