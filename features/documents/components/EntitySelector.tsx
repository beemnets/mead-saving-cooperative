'use client';

import { useState, useRef, useEffect } from 'react';
import { useGetAllLoansQuery } from '@/features/loans/loansApi';
import { useGetMembersQuery } from '@/features/members/membersApi';
import { useGetPendingApplicationsQuery } from '@/features/loans/loansApi';
import type { Loan, Member, LoanApplication } from '@/types';

interface Props {
  entityType: string;
  selectedId: string;
  onSelect: (id: string, label: string) => void;
}

export function EntitySelector({ entityType, selectedId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pasteValue, setPasteValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch data based on entity type
  const { data: loansData } = useGetAllLoansQuery(
    { page: 0, size: 50 },
    { skip: entityType !== 'LOAN' }
  );
  const { data: membersData } = useGetMembersQuery(
    { page: 0, size: 50, search: search || undefined },
    { skip: entityType !== 'MEMBER' }
  );
  const { data: applicationsData } = useGetPendingApplicationsQuery(
    undefined,
    { skip: entityType !== 'LOAN_APPLICATION' }
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getLabel = () => {
    if (!selectedId) return '';
    switch (entityType) {
      case 'LOAN': {
        const loan = loansData?.content?.find((l: Loan) => l.id === selectedId);
        return loan ? `${loan.principalAmount?.amount?.toLocaleString() ?? ''} - ${loan.status}` : selectedId;
      }
      case 'MEMBER': {
        const member = membersData?.content?.find((m: Member) => m.id === selectedId);
        return member ? `${member.firstName} ${member.lastName}` : selectedId;
      }
      case 'LOAN_APPLICATION': {
        const app = applicationsData?.find((a: LoanApplication) => a.id === selectedId);
        return app ? `${app.loanPurpose} - ${app.status}` : selectedId;
      }
      default:
        return selectedId;
    }
  };

  const getEntityLabel = () => {
    switch (entityType) {
      case 'LOAN': return 'Select Loan';
      case 'MEMBER': return 'Select Member';
      case 'COLLATERAL': return 'Select Collateral';
      case 'LOAN_APPLICATION': return 'Select Loan Application';
      default: return 'Select Entity';
    }
  };

  const getPlaceholder = () => {
    switch (entityType) {
      case 'LOAN': return 'Choose loan...';
      case 'MEMBER': return 'Choose member...';
      case 'COLLATERAL': return 'Choose collateral...';
      case 'LOAN_APPLICATION': return 'Choose application...';
      default: return 'Choose...';
    }
  };

  const getSearchPlaceholder = () => {
    switch (entityType) {
      case 'LOAN': return 'Search loan...';
      case 'MEMBER': return 'Search member...';
      case 'COLLATERAL': return 'Search collateral...';
      case 'LOAN_APPLICATION': return 'Search application...';
      default: return 'Search...';
    }
  };

  const renderItems = () => {
    if (entityType === 'LOAN') {
      const loans = loansData?.content ?? [];
      const filtered = search
        ? loans.filter((l: Loan) =>
            l.id.toLowerCase().includes(search.toLowerCase()) ||
            l.status?.toLowerCase().includes(search.toLowerCase())
          )
        : loans;
      return filtered.map((loan: Loan, idx: number) => (
        <button
          key={loan.id}
          onClick={() => {
            const label = `Loan ${idx + 1}`;
            onSelect(loan.id, label);
            setOpen(false);
            setSearch('');
          }}
          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${selectedId === loan.id ? 'bg-blue-50' : ''}`}
        >
          <p className="text-sm font-medium text-gray-900">
            {loan.principalAmount?.amount
              ? `${loan.principalAmount.amount.toLocaleString()} ${loan.principalAmount.currency ?? ''}`
              : `Loan ${idx + 1}`}
          </p>
          <p className="text-xs text-gray-500 font-mono mt-0.5">{loan.id.slice(0, 8)}...</p>
        </button>
      ));
    }

    if (entityType === 'MEMBER') {
      const members = membersData?.content ?? [];
      const filtered = search
        ? members.filter((m: Member) =>
            `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
            m.nationalId?.toLowerCase().includes(search.toLowerCase())
          )
        : members;
      return filtered.map((member: Member) => (
        <button
          key={member.id}
          onClick={() => {
            const label = `${member.firstName} ${member.lastName}`;
            onSelect(member.id, label);
            setOpen(false);
            setSearch('');
          }}
          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${selectedId === member.id ? 'bg-blue-50' : ''}`}
        >
          <p className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</p>
          <p className="text-xs text-gray-500 font-mono mt-0.5">{member.id.slice(0, 8)}...</p>
        </button>
      ));
    }

    if (entityType === 'LOAN_APPLICATION') {
      const apps = applicationsData ?? [];
      const filtered = search
        ? apps.filter((a: LoanApplication) =>
            a.loanPurpose?.toLowerCase().includes(search.toLowerCase()) ||
            a.id.toLowerCase().includes(search.toLowerCase())
          )
        : apps;
      return filtered.map((app: LoanApplication) => (
        <button
          key={app.id}
          onClick={() => {
            const label = app.loanPurpose ?? app.id;
            onSelect(app.id, label);
            setOpen(false);
            setSearch('');
          }}
          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${selectedId === app.id ? 'bg-blue-50' : ''}`}
        >
          <p className="text-sm font-medium text-gray-900">{app.loanPurpose}</p>
          <p className="text-xs text-gray-500 font-mono mt-0.5">{app.id.slice(0, 8)}...</p>
        </button>
      ));
    }

    return null;
  };

  const displayValue = selectedId ? getLabel() : '';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{getEntityLabel()}</label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <span className={displayValue ? 'text-gray-900' : 'text-gray-400'}>
            {displayValue || getPlaceholder()}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={getSearchPlaceholder()}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              />
            </div>

            {/* Items list */}
            <div className="max-h-52 overflow-y-auto">
              {renderItems()}
              {entityType === 'COLLATERAL' && (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">
                  Enter UUID below to select collateral
                </div>
              )}
            </div>

            {/* UUID paste input */}
            <div className="p-2 border-t border-gray-100">
              <input
                type="text"
                value={pasteValue}
                onChange={(e) => setPasteValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && pasteValue.trim()) {
                    onSelect(pasteValue.trim(), pasteValue.trim());
                    setPasteValue('');
                    setOpen(false);
                  }
                }}
                placeholder="Or paste UUID here..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
