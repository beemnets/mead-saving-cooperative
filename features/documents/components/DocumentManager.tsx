'use client';

import { useRef, useState, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { useGetDocumentsByEntityQuery, useUploadDocumentMutation, useDeleteDocumentMutation } from '../documentsApi';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { toastSuccess, toastError } from '@/components/common/Toast';
import type { DocumentMeta } from '@/types';

interface Props {
  entityType: string;
  entityId: string;
  canDelete?: boolean;
}

function getFileTypeLabel(mimeType: string, documentType: string): { label: string; color: string } {
  if (mimeType?.includes('pdf')) return { label: 'PDF', color: 'bg-red-100 text-red-700' };
  if (mimeType?.includes('image')) return { label: 'Image', color: 'bg-purple-100 text-purple-700' };
  if (mimeType?.includes('word') || mimeType?.includes('document')) return { label: 'Word', color: 'bg-blue-100 text-blue-700' };
  if (mimeType?.includes('excel') || mimeType?.includes('spreadsheet')) return { label: 'Excel', color: 'bg-green-100 text-green-700' };
  if (mimeType?.includes('text')) return { label: 'Text', color: 'bg-gray-100 text-gray-700' };
  return { label: documentType ?? 'File', color: 'bg-gray-100 text-gray-600' };
}

function formatSize(bytes: number) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

export function DocumentManager({ entityType, entityId, canDelete = false }: Props) {
  const { data: documents = [], isLoading, refetch } = useGetDocumentsByEntityQuery({ entityType, entityId });
  const [uploadDocument, { isLoading: uploading }] = useUploadDocumentMutation();
  const [deleteDocument, { isLoading: deleting }] = useDeleteDocumentMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<DocumentMeta | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentMeta | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', 'GENERAL');
    formData.append('entityType', entityType);
    formData.append('entityId', entityId);
    try {
      await uploadDocument(formData).unwrap();
      toastSuccess('Document uploaded');
      refetch();
    } catch (e: any) {
      toastError(e?.data?.message ?? 'Failed to upload document');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      await uploadFile(file);
    }
  }, [entityType, entityId]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteDocument(deleteTarget.id).unwrap();
      toastSuccess('Document deleted');
      setDeleteTarget(null);
      refetch();
    } catch (e: any) {
      toastError(e?.data?.message ?? 'Failed to delete document');
      setDeleteTarget(null);
    }
  };

  const handleDownload = async (doc: DocumentMeta) => {
    setDownloading(doc.id);
    try {
      const token = localStorage.getItem('token');
      const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';
      const res = await fetch(`${base}/api/documents/${doc.id}/download`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.documentName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      toastError('Failed to download document');
    } finally {
      setDownloading(null);
    }
  };

  const handlePreview = async (doc: DocumentMeta) => {
    setPreviewDoc(doc);
    setPreviewLoading(true);
    setPreviewUrl(null);
    try {
      const token = localStorage.getItem('token');
      const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';
      const res = await fetch(`${base}/api/documents/${doc.id}/download`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch {
      toastError('Failed to load preview');
      setPreviewDoc(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewDoc(null);
    setPreviewUrl(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress size={24} />
      </div>
    );
  }

  const entityTypeLabel = entityType.toLowerCase().replace('_', ' ');

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h2>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
            ${isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <CircularProgress size={32} />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-800">Drag files here or click to select</p>
                <p className="text-sm text-gray-500 mt-1">PDF, Images, Word, Excel, or Text files</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="mt-1 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Select Files
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Files are associated with {entityTypeLabel} {entityId}
        </p>
      </div>

      {/* Documents List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Documents ({documents.length})
        </h2>

        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-gray-200">
            <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-medium text-gray-500">No documents uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">Upload files using the area above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc: DocumentMeta) => {
              const { label, color } = getFileTypeLabel(doc.mimeType, doc.documentType);
              return (
                <div
                  key={doc.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{doc.documentName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatSize(doc.fileSize)}</p>
                      {doc.uploadDate && (
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(doc.uploadDate)}</p>
                      )}
                    </div>
                    <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
                      {label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handlePreview(doc)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      disabled={downloading === doc.id}
                      className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {downloading === doc.id ? <CircularProgress size={12} /> : null}
                      Download
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => setDeleteTarget(doc)}
                        className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors ml-auto"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Document"
          message={`Delete "${deleteTarget.documentName}"? This cannot be undone.`}
          confirmLabel="Delete"
          variant="danger"
          isLoading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <p className="text-sm font-semibold text-gray-900">{previewDoc.documentName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{formatSize(previewDoc.fileSize)}</p>
              </div>
              <button
                onClick={closePreview}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100 min-h-64">
              {previewLoading ? (
                <CircularProgress size={32} />
              ) : previewUrl ? (
                previewDoc.mimeType?.includes('image') ? (
                  <img src={previewUrl} alt={previewDoc.documentName} className="max-w-full max-h-full object-contain" />
                ) : previewDoc.mimeType?.includes('pdf') ? (
                  <iframe src={previewUrl} className="w-full h-full min-h-[70vh]" title={previewDoc.documentName} />
                ) : (
                  <div className="text-center p-8">
                    <p className="text-gray-500 text-sm">Preview not available for this file type.</p>
                    <button
                      onClick={() => handleDownload(previewDoc)}
                      className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Download to view
                    </button>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
