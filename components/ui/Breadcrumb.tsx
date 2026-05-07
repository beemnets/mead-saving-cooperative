import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ items, className = '', ...props }, ref) => {
    return (
      <nav ref={ref} className={`flex items-center gap-2 text-sm ${className}`} {...props}>
        {items.map((item, index) => (
          <React.Fragment key={`breadcrumb-${index}`}>
            {index > 0 && (
              <svg
                className="w-4 h-4 text-foreground-tertiary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}

            {item.current ? (
              <span className="text-foreground font-medium truncate">{item.label}</span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-foreground-secondary hover:text-foreground transition-colors truncate"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground-secondary truncate">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
