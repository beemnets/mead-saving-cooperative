import React from 'react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
}

const variantStyles: Record<AlertVariant, { container: string; icon: string; text: string }> = {
  success: {
    container: 'bg-success/10 border border-success/20',
    icon: 'text-success',
    text: 'text-success',
  },
  warning: {
    container: 'bg-warning/10 border border-warning/20',
    icon: 'text-warning',
    text: 'text-warning',
  },
  error: {
    container: 'bg-error/10 border border-error/20',
    icon: 'text-error',
    text: 'text-error',
  },
  info: {
    container: 'bg-info/10 border border-info/20',
    icon: 'text-info',
    text: 'text-info',
  },
};

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M12 3a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v2m0 4v2M12 2a10 10 0 110 20 10 10 0 010-20z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      description,
      icon,
      onClose,
      closable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={`
          flex gap-3 rounded-lg p-4 transition-all duration-200
          ${styles.container}
          ${className}
        `}
        {...props}
      >
        {/* Icon */}
        <div className={`flex-shrink-0 flex items-start pt-0.5 ${styles.icon}`}>
          {icon || defaultIcons[variant]}
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && <h4 className={`text-sm font-semibold ${styles.text}`}>{title}</h4>}
          {description && (
            <p className={`mt-1 text-sm ${styles.text} opacity-90`}>{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>

        {/* Close Button */}
        {closable && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 inline-flex text-foreground-tertiary hover:text-foreground transition-colors`}
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
