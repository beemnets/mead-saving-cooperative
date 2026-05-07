import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ elevated = false, hoverable = false, className = '', children, ...props }, ref) => {
    const baseStyles =
      'bg-background border border-border rounded-lg transition-all duration-200 overflow-hidden';
    const elevatedStyles = elevated ? 'shadow-md' : 'shadow-xs';
    const hoverableStyles = hoverable ? 'hover:shadow-lg hover:border-primary/20' : '';

    return (
      <div ref={ref} className={`${baseStyles} ${elevatedStyles} ${hoverableStyles} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, action, className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`px-6 py-4 border-b border-border ${className}`} {...props}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
            {description && <p className="mt-1 text-sm text-foreground-secondary">{description}</p>}
            {children}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`px-6 py-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`px-6 py-3 border-t border-border bg-background-secondary ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
