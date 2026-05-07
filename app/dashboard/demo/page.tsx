'use client';

import Link from 'next/link';
import { Card, CardHeader, CardBody, Button, Badge, Alert, Input } from '@/components/ui';

export default function DemoDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome to Modern Dashboard</h1>
        <p className="text-foreground-secondary mt-2">
          This is a preview of the new design system and components
        </p>
      </div>

      {/* Alert Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Alert Components</h2>
        <Alert 
          variant="info" 
          title="Info Alert" 
          description="This is an informational message showing the new alert design."
        />
        <Alert 
          variant="success" 
          title="Success Alert" 
          description="Operation completed successfully with the new design system."
        />
        <Alert 
          variant="warning" 
          title="Warning Alert" 
          description="This is a warning message with improved visibility."
        />
        <Alert 
          variant="error" 
          title="Error Alert" 
          description="An error occurred. Please review and try again."
        />
      </div>

      {/* Card Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card elevated hoverable>
            <CardHeader 
              title="Member Statistics" 
              description="Real-time member data"
            />
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">Total Members</span>
                <span className="text-2xl font-bold text-primary">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">Active Members</span>
                <span className="text-2xl font-bold text-success">2,651</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">Suspended</span>
                <span className="text-2xl font-bold text-warning">196</span>
              </div>
            </CardBody>
          </Card>

          <Card elevated hoverable>
            <CardHeader 
              title="Financial Summary" 
              description="This month's overview"
            />
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">Total Savings</span>
                <span className="text-2xl font-bold text-primary">ETB 45.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">Outstanding Loans</span>
                <span className="text-2xl font-bold text-accent">ETB 28.5M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-secondary">Monthly Revenue</span>
                <span className="text-2xl font-bold text-success">ETB 2.1M</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Button Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Button Variants</h2>
        <Card elevated>
          <CardBody>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Primary Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Secondary Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Outline Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">Small</Button>
                  <Button variant="outline" size="md">Medium</Button>
                  <Button variant="outline" size="lg">Large</Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Ghost Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" size="sm">Small</Button>
                  <Button variant="ghost" size="md">Medium</Button>
                  <Button variant="ghost" size="lg">Large</Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Danger Buttons</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="danger" size="sm">Delete</Button>
                  <Button variant="danger" size="md">Remove</Button>
                  <Button variant="danger" size="lg">Terminate</Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Badge Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Badge Components</h2>
        <Card elevated>
          <CardBody>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Status Badges</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Pending</Badge>
                  <Badge variant="error">Inactive</Badge>
                  <Badge variant="info">Review</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground-secondary mb-3">Sizes</p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="primary" size="sm">Small Badge</Badge>
                  <Badge variant="primary" size="md">Medium Badge</Badge>
                  <Badge variant="primary" size="lg">Large Badge</Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Input Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Input Fields</h2>
        <Card elevated>
          <CardBody className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@cooperative.et"
            />
            <Input
              label="Search"
              placeholder="Search members by name or ID..."
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </CardBody>
        </Card>
      </div>

      {/* Color Palette */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Color Palette</h2>
        <Card elevated>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="w-full h-24 bg-primary rounded-lg shadow-md"></div>
                <p className="text-xs font-medium text-foreground">Primary</p>
                <p className="text-xs text-foreground-tertiary">#2563eb</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-secondary rounded-lg shadow-md"></div>
                <p className="text-xs font-medium text-foreground">Secondary</p>
                <p className="text-xs text-foreground-tertiary">#0891b2</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-accent rounded-lg shadow-md"></div>
                <p className="text-xs font-medium text-foreground">Accent</p>
                <p className="text-xs text-foreground-tertiary">#f59e0b</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-success rounded-lg shadow-md"></div>
                <p className="text-xs font-medium text-foreground">Success</p>
                <p className="text-xs text-foreground-tertiary">#10b981</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-error rounded-lg shadow-md"></div>
                <p className="text-xs font-medium text-foreground">Error</p>
                <p className="text-xs text-foreground-tertiary">#ef4444</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Navigation */}
      <div className="pt-8 flex gap-4 justify-center">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
