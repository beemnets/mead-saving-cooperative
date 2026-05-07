# How to View the New Design Demo

## Quick Start

Follow these simple steps to see the new modern design system:

### Step 1: Click "View New Design Demo" Button
- On the home page of the preview, you'll see a blue button labeled **"View New Design Demo"**
- Click on this button

### Step 2: Select Your Role
You'll be taken to a role selection page where you can choose:
- **Administrator** - Full system access (see all features)
- **Manager** - Member and operation management

### Step 3: View the Dashboard
After selecting your role, you'll see the modern dashboard with:
- ✨ New color palette (Blue, Cyan, Orange, Green, Red)
- 📦 Reusable UI components (Buttons, Cards, Badges, Alerts)
- 🎨 Professional typography and spacing
- 📱 Responsive mobile-friendly layout
- ✅ Modern form fields with improved styling

## What You'll See

The demo dashboard showcases:

1. **Alert Components** - Info, Success, Warning, and Error alerts with semantic colors
2. **Card Components** - Elevated cards with headers, statistics display
3. **Button Variants** - 5 different button styles (Primary, Secondary, Outline, Ghost, Danger) in 3 sizes
4. **Badge Components** - Status badges for member states, activity status, etc.
5. **Input Fields** - Modern form inputs with icons and improved focus states
6. **Color Palette** - Complete visual reference of all design system colors

## File Locations

The demo functionality is split across three files:

```
/app/page.tsx                    - Home page with "View New Design Demo" button
/app/demo-login/page.tsx         - Role selection page
/app/dashboard/demo/page.tsx     - Demo dashboard showing all components
```

## Design System Details

All components use CSS variables defined in:
- `/app/globals.css` - Contains all color tokens and design variables

Component implementations:
- `/components/ui/` - All reusable UI components
- `/components/layout/Sidebar.tsx` - Modernized sidebar
- `/components/layout/Header.tsx` - Modernized header
- `/components/forms/` - Updated form field components

## Production Implementation

To use these components in your actual dashboard pages:

```tsx
import { Card, CardHeader, CardBody, Button, Badge, Alert } from '@/components/ui';

export default function YourPage() {
  return (
    <Card elevated hoverable>
      <CardHeader title="Your Title" description="Your description" />
      <CardBody>
        <Button variant="primary">Click me</Button>
      </CardBody>
    </Card>
  );
}
```

## Notes

- The demo uses localStorage to remember your selected role
- Click "Change Role" button to switch between Admin and Manager
- All components are interactive and fully functional
- The design system is mobile responsive

---

**Enjoy the modern design! 🎉**
