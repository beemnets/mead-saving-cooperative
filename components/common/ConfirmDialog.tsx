'use client';

interface ConfirmDialogProps {
  open?: boolean;
  title: string;
  message: string;
  confirmText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmDialog({
  open = true,
  title,
  message,
  confirmText,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning',
  isLoading = false,
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: 'bg-error hover:bg-red-600 text-white',
    warning: 'bg-warning hover:bg-amber-600 text-white',
    info: 'bg-info hover:bg-blue-600 text-white',
  };

  const buttonText = confirmText || confirmLabel || 'Confirm';

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 border border-border">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-foreground-secondary">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-background-secondary">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-background-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]}`}
          >
            {isLoading ? 'Processing...' : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
