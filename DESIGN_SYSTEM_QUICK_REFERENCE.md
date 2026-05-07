# Design System - Quick Reference

## Import Components

```tsx
// UI Components
import { Button, Card, CardHeader, CardBody, CardFooter } from '@/components/ui';
import { Badge, Input, Select, Alert } from '@/components/ui';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui';
import { Modal, Breadcrumb, Spinner } from '@/components/ui';

// Form Components
import { TextField, SelectField, DateField, NumberField } from '@/components/forms';

// Layout Components
import { Header, Sidebar } from '@/components/layout';

// Common Components
import { ErrorAlert, Pagination, LoadingSpinner } from '@/components/common';
```

## Common Patterns

### Page Layout with Header and Title
```tsx
<div className="space-y-8">
  <div>
    <h1 className="text-3xl font-bold text-foreground">Page Title</h1>
    <p className="text-foreground-secondary mt-2">Description</p>
  </div>
  
  {/* Content */}
</div>
```

### Card with Data
```tsx
<Card elevated>
  <CardHeader title="Title" description="Subtitle" />
  <CardBody>Content here</CardBody>
</Card>
```

### Form with Inputs
```tsx
<Card elevated>
  <CardHeader title="Form Title" />
  <CardBody className="space-y-4">
    <Input label="Name" placeholder="Enter name" />
    <Select label="Type" options={options} />
    <DateField label="Date" />
  </CardBody>
  <CardFooter>
    <Button variant="primary">Submit</Button>
  </CardFooter>
</Card>
```

### Data Table
```tsx
<Card elevated>
  <CardHeader title="Data" description={`${items.length} items`} />
  <CardBody className="p-0">
    <Table striped>
      <TableHead>
        <TableRow>
          <TableHeader>Column 1</TableHeader>
          <TableHeader>Column 2</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.col1}</TableCell>
            <TableCell>{item.col2}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardBody>
</Card>
```

### Alert Messages
```tsx
{/* Success */}
<Alert variant="success" title="Success!" closable>Message</Alert>

{/* Error */}
<Alert variant="error" title="Error" onClose={handleClose}>Message</Alert>

{/* Warning */}
<Alert variant="warning" title="Warning">Message</Alert>

{/* Info */}
<Alert variant="info">Information message</Alert>
```

### Button Variations
```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="danger">Danger Action</Button>
<Button isLoading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Badge Status
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="info">Info</Badge>
```

### Modal Dialog
```tsx
const [open, setOpen] = useState(false);

<Modal 
  isOpen={open} 
  onClose={() => setOpen(false)}
  title="Confirm Action"
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  Are you sure you want to proceed?
</Modal>
```

## Tailwind Classes Used

### Text Colors
- `text-foreground` - Main text
- `text-foreground-secondary` - Secondary text
- `text-foreground-tertiary` - Tertiary/muted text

### Background Colors
- `bg-background` - Main background
- `bg-background-secondary` - Secondary background
- `bg-background-tertiary` - Tertiary background

### Border Colors
- `border-border` - Default border
- `border-primary` - Highlight border
- `border-error` - Error border

### Spacing
- Use standard Tailwind: `p-4`, `m-6`, `gap-4`, etc.
- Use `space-y-*` for vertical spacing between children
- Use `gap-*` for flex/grid spacing

### Rounded Corners
- `rounded-lg` - Standard radius
- `rounded-xl` - Large radius

### Shadows
- `shadow-xs` - Subtle shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow

## CSS Variables

Access design tokens directly:
```css
color: var(--primary);
background-color: var(--background-secondary);
border-color: var(--border);
```

## Responsive Classes

All components are mobile-first:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

## Focus and Hover States

Built into all interactive components - no need to add manually:
- Buttons have hover states
- Inputs have focus rings
- Cards have hover shadows (when `hoverable`)
- Links have smooth transitions

## Dark Mode

Currently light mode only. Dark mode can be added by updating CSS variables in media queries:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    /* ... etc */
  }
}
```

## Tips

1. Use `space-y-*` for consistent vertical spacing in containers
2. Use `Card` for all major sections
3. Use `Badge` for status indicators instead of custom spans
4. Use `Alert` for messages instead of custom divs
5. Always provide helpful error messages with form fields
6. Use `Button` variants for different action types
7. Keep inputs grouped with `space-y-4` or similar
8. Use `CardHeader` for section titles in cards
9. Use `hoverable` prop on cards that are interactive
10. Always test responsive layout on mobile

## Common Issues

**Issue**: Form inputs look too light
**Solution**: Make sure parent container has `bg-background`

**Issue**: Text is hard to read
**Solution**: Use `text-foreground` for main text, `text-foreground-secondary` for secondary

**Issue**: Components don't match colors
**Solution**: Use CSS variables defined in globals.css, not hardcoded colors

**Issue**: Spacing feels off
**Solution**: Use Tailwind spacing scale (4px increments) consistently
