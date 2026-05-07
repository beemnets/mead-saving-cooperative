'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative h-14 flex items-center justify-between px-6 flex-shrink-0 bg-background border-b border-border shadow-xs">
      {/* Left: empty placeholder */}
      <div />

      {/* Right: User + Logout */}
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div
          onClick={() => router.push('/dashboard/profile')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background-secondary hover:bg-background-tertiary cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-foreground leading-tight">
              {mounted ? (user?.fullName || user?.username) : ''}
            </p>
            <p className="text-xs text-foreground-tertiary leading-tight">
              {mounted ? (user?.roles?.[0] || 'User') : ''}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background-secondary text-foreground-secondary hover:text-error hover:bg-error/5 hover:border-error/20 transition-all duration-200 font-medium text-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
