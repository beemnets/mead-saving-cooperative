import { forwardRef } from 'react';

interface DateFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          className={`w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder-foreground-tertiary transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${
            error ? 'border-error focus:border-error focus:ring-error/10' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs font-medium text-error">{error}</p>}
        {helperText && !error && <p className="text-xs text-foreground-tertiary">{helperText}</p>}
      </div>
    );
  }
);

DateField.displayName = 'DateField';
