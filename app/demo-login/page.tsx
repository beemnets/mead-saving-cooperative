'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, CardBody, Alert } from '@/components/ui';

export default function DemoLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'manager'>('admin');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async (selectedRole: 'admin' | 'manager') => {
    setIsLoading(true);
    
    // Simulate login by storing role in localStorage
    localStorage.setItem('demoRole', selectedRole);
    localStorage.setItem('demoUser', selectedRole === 'admin' ? 'Admin User' : 'Manager User');
    
    // Wait a moment then redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard/demo');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card elevated className="w-full max-w-md">
        <CardHeader 
          title="Demo Dashboard Access" 
          description="View the new modern design system"
        />
        <CardBody className="space-y-6">
          <Alert variant="info">
            <p className="text-sm">
              <strong>Note:</strong> This is a demo to showcase the new UI design. Choose a role to see the dashboard with your new components.
            </p>
          </Alert>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Select a Role</h3>
              <div className="space-y-2">
                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-background-secondary transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => setRole('admin')}
                    className="mr-3 w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-foreground">Administrator</p>
                    <p className="text-xs text-foreground-tertiary">Full system access</p>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-background-secondary transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="manager"
                    checked={role === 'manager'}
                    onChange={(e) => setRole('manager')}
                    className="mr-3 w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-foreground">Manager</p>
                    <p className="text-xs text-foreground-tertiary">Member & operation management</p>
                  </div>
                </label>
              </div>
            </div>

            <Button
              onClick={() => handleDemoLogin(role)}
              disabled={isLoading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {isLoading ? 'Loading...' : 'View Dashboard'}
            </Button>

            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-foreground-tertiary text-center">
              <strong>For Production:</strong> Replace this demo with actual credentials from your Spring Boot backend
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
