import React from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ striped = true, hoverable = true, className = '', ...props }, ref) => {
    return (
      <div className="w-full overflow-x-auto rounded-lg border border-border shadow-xs">
        <table
          ref={ref}
          className={`w-full text-sm text-left ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Table.displayName = 'Table';

export const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => (
    <thead
      ref={ref}
      className={`bg-background-secondary border-b border-border ${className}`}
      {...props}
    />
  )
);

TableHead.displayName = 'TableHead';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => (
    <tbody
      ref={ref}
      className={`divide-y divide-border ${className}`}
      {...props}
    />
  )
);

TableBody.displayName = 'TableBody';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ hoverable = true, className = '', ...props }, ref) => (
    <tr
      ref={ref}
      className={`
        transition-colors duration-200
        ${hoverable ? 'hover:bg-background-secondary' : ''}
        ${className}
      `}
      {...props}
    />
  )
);

TableRow.displayName = 'TableRow';

export const TableHeader = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className = '', ...props }, ref) => (
    <th
      ref={ref}
      className={`
        px-6 py-3 font-semibold text-foreground
        whitespace-nowrap
        ${className}
      `}
      {...props}
    />
  )
);

TableHeader.displayName = 'TableHeader';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className = '', ...props }, ref) => (
    <td
      ref={ref}
      className={`
        px-6 py-4 text-foreground-secondary
        whitespace-nowrap
        ${className}
      `}
      {...props}
    />
  )
);

TableCell.displayName = 'TableCell';
