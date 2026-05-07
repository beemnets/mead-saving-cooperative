# Getting Started with the New UI System

## Overview

Your frontend now has a complete, modern design system with reusable components. This guide will help you use it effectively.

## First Time Setup

No setup needed! Everything is already configured. Just:

1. Run `npm install` (if not already done)
2. Run `npm run dev`
3. Open http://localhost:3000 in your browser

The new components are immediately available to import and use.

## Using Components

### Basic Import Pattern

```tsx
// Import components from ui
import { Button, Card, CardHeader, CardBody } from '@/components/ui';

// Import form fields from forms
import { TextField, SelectField, DateField } from '@/components/forms';

// Import layout
import { Header, Sidebar } from '@/components/layout';
```

### Simple Example - Button

```tsx
<Button variant="primary" size="md">
  Click me
</Button>
```

Available variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
Available sizes: `sm`, `md`, `lg`

### Simple Example - Card

```tsx
<Card elevated hoverable>
  <CardHeader title="Welcome" description="This is a card" />
  <CardBody>
    Your content here
  </CardBody>
</Card>
```

### Simple Example - Form Field

```tsx
<TextField 
  label="Name"
  placeholder="Enter your name"
  error={errors.name}
  helperText="First and last name"
/>
```

## Common Layouts

### Page Header with Content

```tsx
<div className="space-y-8">
  <div>
    <h1 className="text-3xl font-bold">Page Title</h1>
    <p className="text-foreground-secondary">Subtitle or description</p>
  </div>
  
  {/* Your content here */}
</div>
```

### Form in a Card

```tsx
<Card elevated>
  <CardHeader title="Edit Profile" />
  <CardBody className="space-y-4">
    <TextField label="Name" value={name} onChange={setName} />
    <TextField label="Email" type="email" value={email} onChange={setEmail} />
  </CardBody>
  <CardFooter>
    <Button onClick={handleSave}>Save Changes</Button>
  </CardFooter>
</Card>
```

### Data Table

```tsx
<Card elevated>
  <CardHeader title="Users" />
  <CardBody className="p-0">
    <Table striped hoverable>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
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
<div className="space-y-4">
  <Alert variant="success" title="Success!" closable>
    Your changes have been saved
  </Alert>
  
  <Alert variant="error" title="Error" closable>
    Something went wrong
  </Alert>
</div>
```

## Colors to Use

### Text Colors
```tsx
// Main text
<p className="text-foreground">Main text</p>

// Secondary text (subheadings, metadata)
<p className="text-foreground-secondary">Secondary text</p>

// Tertiary text (muted, hints)
<p className="text-foreground-tertiary">Tertiary text</p>
```

### Background Colors
```tsx
// Main background (default)
<div className="bg-background">Main</div>

// Secondary background (cards, sections)
<div className="bg-background-secondary">Secondary</div>

// Tertiary background (subtle highlights)
<div className="bg-background-tertiary">Tertiary</div>
```

### Status Colors
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="info">Info</Badge>
```

## Spacing Guide

Use Tailwind spacing scale (4px increments):

```tsx
{/* Padding */}
<div className="p-4">Padding all sides</div>
<div className="px-6 py-4">Padding X and Y</div>

{/* Margins */}
<div className="m-4">Margin all sides</div>
<div className="mt-8">Margin top</div>

{/* Gaps (for flex/grid) */}
<div className="flex gap-4">Items with 16px gap</div>

{/* Spacing between children */}
<div className="space-y-4">
  <div>Child 1</div>
  <div>Child 2</div>
</div>
```

Common values:
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px

## Responsive Design

All components are mobile-first and responsive:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
</div>
```

Breakpoints:
- `sm` - Small (≥640px)
- `md` - Medium (≥768px)
- `lg` - Large (≥1024px)
- `xl` - Extra large (≥1280px)

## Real Examples in Your Project

Look at these files to see the new components in action:

1. **`/app/dashboard/page.tsx`** - Dashboard with modern layout
2. **`/app/dashboard/members/page.tsx`** - Table with search, sort, and pagination

Copy patterns from these files for your new pages.

## Frequently Asked Questions

### Q: Where are the CSS files?
**A:** No CSS files needed! All styling is done with Tailwind CSS classes. Customize via `app/globals.css`.

### Q: How do I change colors?
**A:** Edit the CSS variables in `app/globals.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* etc */
}
```

### Q: Can I use my own custom components?
**A:** Yes! The UI components are just examples. Create your own if needed.

### Q: How do I add dark mode?
**A:** Add media queries to `app/globals.css`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    /* etc */
  }
}
```

### Q: Do I need to update existing pages?
**A:** No, but you should for consistency. Gradually migrate old pages to use new components.

### Q: Are the components accessible?
**A:** Yes! All components follow WCAG guidelines with proper ARIA labels and color contrast.

### Q: Can I nest components?
**A:** Yes! Most components are composable:
```tsx
<Card>
  <CardHeader title="Title" />
  <CardBody>
    <Button>Inside card</Button>
  </CardBody>
</Card>
```

## Tips & Tricks

1. **Always use semantic classes** - Use `text-error` instead of `text-red-500`
2. **Group related content** - Use `space-y-4` for consistent spacing
3. **Card for sections** - Put major sections in Card components
4. **Consistent padding** - Use `p-4`, `p-6` (not arbitrary values)
5. **Status indicators** - Use Badge for status, not custom spans
6. **Loading states** - Use Spinner while loading
7. **Error messages** - Show errors with Alert or form field errors
8. **Mobile first** - Design for mobile, enhance for desktop

## Checklists

### When Creating a New Page
- [ ] Use `space-y-8` for main container
- [ ] Add page title (h1 with 3xl font-bold)
- [ ] Wrap major sections in Card
- [ ] Use appropriate heading levels (h2, h3)
- [ ] Test on mobile (< 640px)
- [ ] Use semantic colors (primary, error, success, etc)

### When Creating a Form
- [ ] Wrap in Card elevated
- [ ] Add CardHeader with title
- [ ] Group fields with space-y-4
- [ ] Show error messages
- [ ] Add CardFooter with buttons
- [ ] Show loading state on submit

### When Creating a Table
- [ ] Wrap in Card elevated
- [ ] Add CardHeader with description
- [ ] Use Table striped hoverable
- [ ] Show status with Badge
- [ ] Add Pagination if needed
- [ ] Add search/filter at top

## Troubleshooting

**Issue**: Component looks wrong
- **Check**: Are you using the correct import path?
- **Check**: Did you pass required props?
- **Check**: Is the parent container styled correctly?

**Issue**: Text is hard to read
- **Fix**: Use `text-foreground` for main text
- **Fix**: Increase contrast with darker color

**Issue**: Spacing feels off
- **Fix**: Use consistent Tailwind spacing (4px increments)
- **Fix**: Add `space-y-*` for vertical spacing

**Issue**: Component not appearing
- **Check**: Is it inside a visible container?
- **Check**: Does it have z-index issues?
- **Check**: Check browser console for errors

## Next Steps

1. **Review the examples** in dashboard and members pages
2. **Update one more page** using the new components
3. **Customize colors** if you want different branding
4. **Add dark mode** if needed
5. **Extend components** with new variants as needed

## Learning Resources

- **`DESIGN_SYSTEM.md`** - Complete system documentation
- **`DESIGN_SYSTEM_QUICK_REFERENCE.md`** - Quick lookup guide
- **`components/ui/*.tsx`** - Component source code with JSDoc
- **Dashboard page** - Real example implementation
- **Members page** - Another real example with tables

## Getting Help

All components have:
1. **TypeScript interfaces** for type safety and autocomplete
2. **JSDoc comments** explaining usage
3. **Props documentation** in the interface
4. **Real examples** in existing pages

Just hover over components in your IDE to see help!

Happy coding! 🚀
