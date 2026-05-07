'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

const DEFAULT_SIZE_OPTIONS = [10, 20, 50, 100];

export function Pagination({
  page,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_SIZE_OPTIONS,
}: PaginationProps) {
  const from = totalElements === 0 ? 0 : page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, totalElements);

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-background-secondary text-sm">
      {/* Left: showing X-Y of Z */}
      <div className="flex items-center gap-4">
        <span className="text-foreground-secondary font-medium">
          {totalElements === 0 ? 'No results' : `${from}–${to} of ${totalElements}`}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-foreground-tertiary text-xs font-medium">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(0); }}
            className="px-2 py-1 rounded-lg border border-border text-xs text-foreground bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
          >
            {pageSizeOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: page navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(0)}
          disabled={page === 0}
          className="px-2 py-2 rounded-lg border border-border text-foreground-secondary disabled:opacity-40 hover:bg-background transition-colors text-xs font-medium"
          title="First page"
        >
          «
        </button>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-2 rounded-lg border border-border text-foreground-secondary disabled:opacity-40 hover:bg-background transition-colors font-medium text-sm"
        >
          Previous
        </button>
        <span className="text-foreground-secondary px-3 font-medium">
          Page {page + 1} of {Math.max(1, totalPages)}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="px-3 py-2 rounded-lg border border-border text-foreground-secondary disabled:opacity-40 hover:bg-background transition-colors font-medium text-sm"
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
          className="px-2 py-2 rounded-lg border border-border text-foreground-secondary disabled:opacity-40 hover:bg-background transition-colors text-xs font-medium"
          title="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
}
