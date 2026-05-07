'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMembersQuery } from '@/features/members/membersApi';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { useAuth } from '@/hooks/useAuth';
import { ROLES } from '@/constants/app';
import { Pagination } from '@/components/common/Pagination';
import { exportToCsv } from '@/lib/exportCsv';
import { Button, Card, CardHeader, CardBody, Badge, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Input } from '@/components/ui';
import type { Member } from '@/types';

type SortField = 'lastName' | 'firstName' | 'registrationDate' | 'status';
type SortDir = 'asc' | 'desc';

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (field !== sortField) return <span className="ml-1 text-foreground-tertiary">↕</span>;
  return <span className="ml-1 text-primary">{sortDir === 'asc' ? '↑' : '↓'}</span>;
}

export default function MembersPage() {
  const router = useRouter();
  const { hasAnyRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState<SortField>('lastName');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const { data, isLoading, error, refetch } = useGetMembersQuery({
    page,
    size: pageSize,
    search: debouncedQuery || undefined,
    sort: `${sortField},${sortDir}`,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(0);
    const timer = setTimeout(() => setDebouncedQuery(value), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };

  const members = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;
  const canCreateMember = hasAnyRole([ROLES.MANAGER, ROLES.MEMBER_OFFICER]);

  const thCls = 'px-3 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer select-none hover:bg-gray-100 whitespace-nowrap';

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="p-4"><ErrorAlert message="Failed to load members" onRetry={refetch} /></div>;

  return (
    <RoleGuard allowedRoles={[ROLES.MANAGER, ROLES.MEMBER_OFFICER, ROLES.ACCOUNTANT, ROLES.LOAN_OFFICER]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Members</h1>
            {totalElements > 0 && <p className="text-sm text-foreground-tertiary mt-1">{totalElements} total members in system</p>}
          </div>
          <div className="flex items-center gap-3">
            {canCreateMember && (
              <Button
                onClick={() => router.push('/dashboard/members/new')}
                variant="primary"
                size="md"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Add Member
              </Button>
            )}
            <Button
              onClick={() => exportToCsv(members as unknown as Record<string, unknown>[], 'members', [
                { key: 'id', label: 'ID' },
                { key: 'firstName', label: 'First Name' },
                { key: 'lastName', label: 'Last Name' },
                { key: 'email', label: 'Email' },
                { key: 'phoneNumber', label: 'Phone' },
                { key: 'nationalId', label: 'National ID' },
                { key: 'memberType', label: 'Member Type' },
                { key: 'status', label: 'Status' },
                { key: 'registrationDate', label: 'Registration Date' },
                { key: 'committedDeduction', label: 'Committed Deduction' },
                { key: 'shareCount', label: 'Share Count' },
              ])}
              disabled={members.length === 0}
              variant="outline"
              size="md"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card elevated>
          <CardBody>
            <Input
              type="text"
              placeholder="Search members by name, national ID, or phone..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </CardBody>
        </Card>

        {/* Table */}
        <Card elevated>
          <CardHeader title="Members List" description={`Showing ${Math.min(members.length, pageSize)} of ${totalElements} members`} />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <Table striped hoverable>
                <TableHead>
                  <TableRow>
                    <TableHeader>ID</TableHeader>
                    <TableHeader 
                      onClick={() => handleSort('lastName')}
                      className="cursor-pointer select-none hover:bg-background-tertiary whitespace-nowrap"
                    >
                      Name <SortIcon field="lastName" sortField={sortField} sortDir={sortDir} />
                    </TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Phone</TableHeader>
                    <TableHeader 
                      onClick={() => handleSort('registrationDate')}
                      className="cursor-pointer select-none hover:bg-background-tertiary whitespace-nowrap"
                    >
                      Registered <SortIcon field="registrationDate" sortField={sortField} sortDir={sortDir} />
                    </TableHeader>
                    <TableHeader 
                      onClick={() => handleSort('status')}
                      className="cursor-pointer select-none hover:bg-background-tertiary whitespace-nowrap"
                    >
                      Status <SortIcon field="status" sortField={sortField} sortDir={sortDir} />
                    </TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-foreground-tertiary">No members found.</p>
                      </TableCell>
                    </TableRow>
                  ) : members.map((member: Member) => (
                    <TableRow
                      key={member.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/dashboard/members/${member.id}`)}
                    >
                      <TableCell className="font-mono text-xs text-foreground-tertiary">{member.id.slice(0, 8)}…</TableCell>
                      <TableCell className="font-medium text-foreground">
                        {member.firstName} {member.lastName}
                      </TableCell>
                      <TableCell className="text-foreground-secondary text-sm">{member.email}</TableCell>
                      <TableCell className="text-foreground-secondary text-sm">{member.phoneNumber}</TableCell>
                      <TableCell className="text-foreground-secondary text-sm">
                        {member.registrationDate ? new Date(member.registrationDate).toLocaleDateString() : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            member.status === 'ACTIVE' ? 'success' :
                            member.status === 'SUSPENDED' ? 'warning' :
                            'info'
                          }
                          size="sm"
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/members/${member.id}`); }}
                          variant="ghost"
                          size="sm"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(0); }}
        />
      </div>
    </RoleGuard>
  );
}
