import { forwardRef } from 'react';

interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  allowDecimals?: boolean;
  maxDecimals?: number;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, error, helperText, allowDecimals = true, maxDecimals = 2, className = '', ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allowDecimals && e.key === '.') {
        e.preventDefault();
      }
    };

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
          type="number"
          step={allowDecimals ? Math.pow(10, -maxDecimals) : 1}
          onKeyDown={handleKeyDown}
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

NumberField.displayName = 'NumberField';
