'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardBody } from '@/components/ui';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { user } = useAuth();
  const roles = mounted ? (user?.roles ?? []) : [];
  const isManager = roles.includes('MANAGER');
  const isAdmin = roles.includes('ADMINISTRATOR');
  const isLoanOfficer = roles.includes('LOAN_OFFICER');
  const isMemberOfficer = roles.includes('MEMBER_OFFICER');
  const isAccountant = roles.includes('ACCOUNTANT');
  const isAuditor = roles.includes('AUDITOR');
  const isMember = roles.includes('MEMBER');

  const quickActions = [
    { label: 'Add Member', href: '/dashboard/members/new', icon: '➕', show: isManager || isMemberOfficer },
    { label: 'Members', href: '/dashboard/members', icon: '👥', show: isManager || isMemberOfficer || isMember },
    { label: 'New Transaction', href: '/dashboard/transactions', icon: '💳', show: isManager || isAccountant },
    { label: 'Accounts', href: '/dashboard/accounts', icon: '🏦', show: isManager || isMemberOfficer || isAccountant },
    { label: 'Loan Application', href: '/dashboard/loans', icon: '📋', show: isManager || isLoanOfficer || isAccountant || isMember },
    { label: 'View Reports', href: '/dashboard/reports/financial', icon: '📊', show: isManager || isAccountant || isAuditor },
    { label: 'Audit Logs', href: '/dashboard/audit', icon: '🔍', show: isManager || isAuditor },
    { label: 'Configuration', href: '/dashboard/config', icon: '⚙️', show: isAdmin },
    { label: 'Users', href: '/dashboard/users', icon: '👤', show: isAdmin },
    { label: 'Share Capital', href: '/dashboard/share-capital', icon: '📈', show: isManager || isMemberOfficer || isAccountant },
    { label: 'Payroll', href: '/dashboard/payroll', icon: '💰', show: isManager || isAccountant },
    { label: 'Documents', href: '/dashboard/documents', icon: '📄', show: isManager || isLoanOfficer || isMemberOfficer || isAccountant },
  ].filter((a) => a.show);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {mounted ? user?.fullName || user?.username : 'User'}</h1>
        <p className="text-foreground-secondary mt-2">Here&apos;s an overview of your system and quick access to key functions</p>
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <Card elevated hoverable>
          <CardHeader title="Quick Actions" description="Fast access to important features" />
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group relative flex items-center justify-center aspect-square rounded-lg border border-border bg-background-secondary hover:bg-background-tertiary hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-3 text-center p-4">
                    <span className="text-4xl transition-transform group-hover:scale-110 duration-200">{action.icon}</span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Empty State */}
      {quickActions.length === 0 && (
        <Card elevated>
          <CardBody className="text-center py-12">
            <svg className="w-16 h-16 text-foreground-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Access</h3>
            <p className="text-foreground-secondary">Your role doesn&apos;t have access to any features yet. Please contact your administrator.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
