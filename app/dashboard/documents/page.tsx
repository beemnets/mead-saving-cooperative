'use client';

import { useState } from 'react';
import { DocumentManager } from '@/features/documents/components/DocumentManager';
import { EntitySelector } from '@/features/documents/components/EntitySelector';

const entityTypes = [
  { value: 'LOAN', label: 'Loan' },
  { value: 'MEMBER', label: 'Member' },
  { value: 'COLLATERAL', label: 'Collateral' },
  { value: 'LOAN_APPLICATION', label: 'Loan Application' },
];

export default function DocumentsPage() {
  const [entityType, setEntityType] = useState('LOAN');
  const [entityId, setEntityId] = useState('');
  const [entityLabel, setEntityLabel] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLoadDocuments = () => {
    if (entityId.trim()) setSubmitted(true);
  };

  const handleClear = () => {
    setSubmitted(false);
    setEntityId('');
    setEntityLabel('');
  };

  const handleEntitySelect = (id: string, label: string) => {
    setEntityId(id);
    setEntityLabel(label);
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
        <p className="text-sm text-gray-600 mt-1">Upload, manage, and preview documents for loans, members, collateral, and applications</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
            <select
              value={entityType}
              onChange={(e) => { 
                setEntityType(e.target.value); 
                setSubmitted(false); 
                setEntityId(''); 
                setEntityLabel('');
              }}
              className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {entityTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          
          <EntitySelector 
            entityType={entityType}
            onSelect={handleEntitySelect}
            selectedId={entityId}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleLoadDocuments}
            disabled={!entityId.trim()}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Load Documents
          </button>
          {submitted && (
            <button
              type="button"
              onClick={handleClear}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {submitted && entityId.trim() ? (
        <>
          {/* Entity badge */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-600">Entity:</span>{' '}
              <span className="font-mono font-semibold text-blue-700">{entityType}</span>
              <span className="text-gray-400 mx-2">/</span>
              <span className="font-mono text-gray-800">{entityLabel || entityId}</span>
            </p>
          </div>

          {/* Document manager */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <DocumentManager entityType={entityType} entityId={entityId.trim()} canDelete={true} />
          </div>
        </>
      ) : (        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <svg className="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-base font-medium text-gray-500">No entity selected</p>
          <p className="text-sm text-gray-400 mt-1">Select an entity type and entity to view documents</p>
        </div>
      )}
    </div>
  );
}
