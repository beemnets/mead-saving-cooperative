# Modern Design System Documentation

## Overview

Your frontend has been completely redesigned with a modern, professional design system. All components now use a unified color palette, typography, and spacing system based on Tailwind CSS design tokens.

## Color System

### Primary Colors
- **Primary**: `#2563eb` (Blue) - Used for main actions, links, and interactive elements
- **Primary Dark**: `#1d4ed8` - Hover state for primary elements
- **Primary Light**: `#3b82f6` - Secondary background for primary elements

### Secondary Colors
- **Secondary**: `#0891b2` (Cyan) - Alternative accent color for secondary actions
- **Secondary Dark**: `#0e7490` - Hover state
- **Secondary Light**: `#06b6d4` - Background tint

### Semantic Colors
- **Success**: `#10b981` - For confirmations, valid states
- **Warning**: `#f59e0b` - For caution alerts
- **Error**: `#ef4444` - For errors and destructive actions
- **Info**: `#3b82f6` - For informational messages

### Neutral Colors
- **Background**: `#ffffff` - Main background
- **Foreground**: `#0f172a` - Main text color
- **Border**: `#e2e8f0` - Border colors

All colors are defined as CSS variables in `app/globals.css` for easy customization.

## UI Components

### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" size="lg" icon={<IconComponent />}>With Icon</Button>
<Button isLoading variant="primary">Loading...</Button>
```

**Variants**: primary, secondary, outline, ghost, danger
**Sizes**: sm, md, lg

### Card
Container component with optional header, body, and footer sections.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card elevated hoverable>
  <CardHeader title="Card Title" description="Subtitle" />
  <CardBody>Content goes here</CardBody>
  <CardFooter>Footer content</CardFooter>
</Card>
```

### Input
Text input field with label, error states, and helper text.

```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email" 
  placeholder="Enter email"
  error={error ? "Invalid email" : undefined}
  helperText="We'll never share your email"
/>
```

### Select
Dropdown select field with consistent styling.

```tsx
import { Select } from '@/components/ui';

<Select 
  label="Choose option"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
/>
```

### Badge
Small status indicator component.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
```

### Alert
Message container for notifications.

```tsx
import { Alert } from '@/components/ui';

<Alert variant="error" title="Error" closable onClose={handleClose}>
  Something went wrong
</Alert>
```

### Table
Data table component with thead, tbody, rows, headers, and cells.

```tsx
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui';

<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Modal
Dialog component for overlays and forms.

```tsx
import { Modal } from '@/components/ui';
import { Button } from '@/components/ui';

<Modal 
  isOpen={open} 
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button onClick={handleClose} variant="ghost">Cancel</Button>
      <Button onClick={handleConfirm} variant="primary">Confirm</Button>
    </>
  }
>
  Are you sure?
</Modal>
```

### Spinner
Loading indicator component.

```tsx
import { Spinner } from '@/components/ui';

<Spinner size="md" />
<Spinner fullScreen /> {/* Overlays entire screen */}
```

### Breadcrumb
Navigation breadcrumb component.

```tsx
import { Breadcrumb } from '@/components/ui';

<Breadcrumb 
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Members', href: '/dashboard/members' },
    { label: 'John Doe', current: true }
  ]}
/>
```

## Layout Components

### Sidebar
Navigation sidebar with role-based filtering and modern styling.

### Header
Top navigation bar with user info and logout button.

Both components have been modernized with:
- Gradient backgrounds
- Smooth transitions and hover effects
- Better visual hierarchy
- Proper color contrast

## Form Components

All existing form components have been updated:
- **TextField**: Text input with improved styling
- **SelectField**: Dropdown select with consistent design
- **DateField**: Date picker input
- **NumberField**: Number input with validation

All form inputs now feature:
- Better focus states
- Clear error indicators
- Consistent padding and spacing
- Improved accessibility

## Design Tokens

CSS variables for consistent theming:

```css
/* Colors */
--primary: #2563eb
--secondary: #0891b2
--accent: #f59e0b
--success: #10b981
--warning: #f59e0b
--error: #ef4444
--info: #3b82f6

/* Background variants */
--background: #ffffff
--background-secondary: #f8fafc
--background-tertiary: #f1f5f9

/* Text colors */
--foreground: #0f172a
--foreground-secondary: #475569
--foreground-tertiary: #64748b

/* Borders */
--border: #e2e8f0

/* Spacing */
--radius: 0.5rem
--radius-lg: 0.75rem
--radius-xl: 1rem
```

## Folder Structure

```
components/
├── ui/                    # Design system components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Alert.tsx
│   ├── Table.tsx
│   ├── Modal.tsx
│   ├── Breadcrumb.tsx
│   ├── Spinner.tsx
│   └── index.ts          # Centralized exports
├── layout/               # Page layout components
│   ├── Header.tsx
│   └── Sidebar.tsx
├── forms/                # Form field components
│   ├── TextField.tsx
│   ├── SelectField.tsx
│   ├── DateField.tsx
│   └── NumberField.tsx
├── common/               # Common utility components
│   ├── ErrorAlert.tsx
│   ├── Pagination.tsx
│   ├── LoadingSpinner.tsx
│   └── ...
└── auth/                 # Authentication components
    └── ...

features/                 # Feature modules (unchanged)
app/                      # Pages and routing
├── globals.css          # Design tokens and global styles
└── layout.tsx
```

## Best Practices

1. **Always use design tokens**: Don't use hardcoded colors; use CSS variables or tailwind classes based on tokens
2. **Combine components**: Build complex UIs by composing simple, reusable components
3. **Maintain consistency**: Use the same spacing, colors, and sizing across pages
4. **Responsive design**: All components are mobile-first and responsive
5. **Accessibility**: All components follow WCAG guidelines with proper ARIA labels
6. **Error handling**: Always show clear error messages using Alert or form field errors
7. **Loading states**: Use Spinner for async operations

## Customization

To customize colors, edit `app/globals.css`:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... etc */
}
```

All components will automatically use the new colors.

## API Integration

All existing API connections are preserved. The redesign is purely visual and doesn't affect:
- Redux store and slices
- API endpoints and hooks
- Authentication flow
- Data fetching logic
- Business logic

Simply import and use the new components with your existing data.

## Examples

### Dashboard Page
See `/app/dashboard/page.tsx` for a modern dashboard example using Card and Button components.

### Members List
See `/app/dashboard/members/page.tsx` for a complete example using Table, Badge, Button, and Input components.

## Support

For questions about the design system, refer to the component files in `/components/ui/` - each has detailed TypeScript interfaces and JSDoc comments.
