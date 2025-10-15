# TitlePage Component Usage Guide

## Overview
The `TitlePage` component is a reusable page header component that displays:
- Page title with optional icon
- Optional subtitle/description
- Breadcrumb navigation
- Action buttons

---

## Component Location
```
src/app/components/titlepage/
├── titlepage.component.ts
├── titlepage.component.html
└── titlepage.component.css
```

---

## Basic Usage

### 1. Import the Component
```typescript
import { TitlepageComponent } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [TitlepageComponent, /* other imports */],
  // ...
})
```

### 2. Add to Your Template
```html
<app-titlepage
  [title]="'Page Title'"
  [subtitle]="'Optional description'"
  [icon]="'fas fa-icon'"
  [breadcrumbs]="breadcrumbs"
  [actions]="actions">
</app-titlepage>
```

---

## Examples

### Example 1: Simple Title Only
```typescript
// In your component.ts
export class YourComponent {
  // No additional properties needed
}
```

```html
<!-- In your component.html -->
<app-titlepage [title]="'Dashboard'"></app-titlepage>
```

---

### Example 2: Title with Icon and Subtitle
```html
<app-titlepage
  [title]="'Children Management'"
  [subtitle]="'View and manage all enrolled children'"
  [icon]="'fas fa-child'">
</app-titlepage>
```

---

### Example 3: With Breadcrumbs
```typescript
// In your component.ts
import { Breadcrumb } from '../../components/titlepage/titlepage.component';

export class ChildrenComponent {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/dashboard', icon: 'fas fa-home' },
    { label: 'Children', url: '/children' }
  ];
}
```

```html
<!-- In your component.html -->
<app-titlepage
  [title]="'Children'"
  [breadcrumbs]="breadcrumbs">
</app-titlepage>
```

---

### Example 4: With Action Buttons
```typescript
// In your component.ts
import { TitleAction } from '../../components/titlepage/titlepage.component';

export class ChildrenComponent {
  actions: TitleAction[] = [
    {
      label: 'Add Child',
      icon: 'fas fa-plus',
      class: 'btn-primary',
      action: () => this.openAddChildModal()
    },
    {
      label: 'Export',
      icon: 'fas fa-download',
      class: 'btn-outline',
      action: () => this.exportData()
    }
  ];

  openAddChildModal() {
    // Your logic here
  }

  exportData() {
    // Your logic here
  }
}
```

```html
<!-- In your component.html -->
<app-titlepage
  [title]="'Children'"
  [actions]="actions">
</app-titlepage>
```

---

### Example 5: Complete Example (All Features)
```typescript
// In your component.ts
import { Component } from '@angular/core';
import { TitlepageComponent, Breadcrumb, TitleAction } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [TitlepageComponent, /* other imports */],
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/dashboard', icon: 'fas fa-home' },
    { label: 'Management', url: '/management' },
    { label: 'Children' }
  ];

  actions: TitleAction[] = [
    {
      label: 'Add Child',
      icon: 'fas fa-plus',
      class: 'btn-primary',
      action: () => this.addChild()
    },
    {
      label: 'Import',
      icon: 'fas fa-upload',
      class: 'btn-secondary',
      action: () => this.importData()
    },
    {
      label: 'Export',
      icon: 'fas fa-download',
      class: 'btn-outline',
      action: () => this.exportData()
    }
  ];

  addChild() {
    console.log('Add child clicked');
  }

  importData() {
    console.log('Import clicked');
  }

  exportData() {
    console.log('Export clicked');
  }
}
```

```html
<!-- In your component.html -->
<app-titlepage
  [title]="'Children Management'"
  [subtitle]="'View and manage all enrolled children in the daycare'"
  [icon]="'fas fa-child'"
  [breadcrumbs]="breadcrumbs"
  [actions]="actions">
</app-titlepage>

<!-- Rest of your page content -->
<div class="page-content">
  <!-- Your content here -->
</div>
```

---

## Input Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `title` | `string` | Yes | `''` | The main page title |
| `subtitle` | `string` | No | `undefined` | Optional subtitle/description |
| `icon` | `string` | No | `undefined` | FontAwesome icon class (e.g., 'fas fa-child') |
| `breadcrumbs` | `Breadcrumb[]` | No | `[]` | Array of breadcrumb items |
| `actions` | `TitleAction[]` | No | `[]` | Array of action buttons |

---

## Interfaces

### Breadcrumb Interface
```typescript
export interface Breadcrumb {
  label: string;      // Display text
  url?: string;       // Optional route URL
  icon?: string;      // Optional FontAwesome icon
}
```

### TitleAction Interface
```typescript
export interface TitleAction {
  label: string;      // Button text
  icon?: string;      // Optional FontAwesome icon
  class?: string;     // Button style class
  action: () => void; // Click handler function
}
```

---

## Button Style Classes

Available button classes for `TitleAction.class`:

| Class | Color | Use Case |
|-------|-------|----------|
| `btn-primary` | Blue | Primary actions (Add, Create, Save) |
| `btn-secondary` | Gray | Secondary actions (Cancel, Close) |
| `btn-success` | Green | Success actions (Approve, Confirm) |
| `btn-danger` | Red | Destructive actions (Delete, Remove) |
| `btn-outline` | White with border | Tertiary actions (Export, Print) |

---

## Real-World Examples

### Dashboard Page
```typescript
breadcrumbs: Breadcrumb[] = [
  { label: 'Home', icon: 'fas fa-home' }
];
```

```html
<app-titlepage
  [title]="'Dashboard'"
  [subtitle]="'Welcome to Daycare Management System'"
  [icon]="'fas fa-tachometer-alt'"
  [breadcrumbs]="breadcrumbs">
</app-titlepage>
```

---

### Parents Page
```typescript
breadcrumbs: Breadcrumb[] = [
  { label: 'Home', url: '/dashboard', icon: 'fas fa-home' },
  { label: 'Parents' }
];

actions: TitleAction[] = [
  {
    label: 'Add Parent',
    icon: 'fas fa-user-plus',
    class: 'btn-primary',
    action: () => this.openAddParentModal()
  }
];
```

```html
<app-titlepage
  [title]="'Parents'"
  [subtitle]="'Manage parent accounts and information'"
  [icon]="'fas fa-users'"
  [breadcrumbs]="breadcrumbs"
  [actions]="actions">
</app-titlepage>
```

---

### Attendance Page
```typescript
breadcrumbs: Breadcrumb[] = [
  { label: 'Home', url: '/dashboard', icon: 'fas fa-home' },
  { label: 'Attendance' }
];

actions: TitleAction[] = [
  {
    label: 'Mark Attendance',
    icon: 'fas fa-check',
    class: 'btn-success',
    action: () => this.markAttendance()
  },
  {
    label: 'View Report',
    icon: 'fas fa-chart-bar',
    class: 'btn-outline',
    action: () => this.viewReport()
  }
];
```

```html
<app-titlepage
  [title]="'Attendance Tracking'"
  [subtitle]="'Track daily attendance for all children'"
  [icon]="'fas fa-calendar-check'"
  [breadcrumbs]="breadcrumbs"
  [actions]="actions">
</app-titlepage>
```

---

## Responsive Design

The component is fully responsive:
- **Desktop**: Full layout with all elements side-by-side
- **Tablet**: Flexible wrapping of action buttons
- **Mobile**: Stacked layout with full-width buttons

---

## Styling Customization

You can customize the component by overriding CSS variables in your global styles:

```css
/* In your global styles.css */
app-titlepage {
  --title-bg: #ffffff;
  --title-border: #e5e7eb;
  --title-color: #111827;
  --breadcrumb-color: #6b7280;
  --link-color: #3b82f6;
}
```

---

## Tips

1. **Keep titles concise**: Use 1-3 words for the main title
2. **Use subtitles for context**: Provide helpful descriptions
3. **Limit action buttons**: Show 2-4 primary actions max
4. **Use appropriate icons**: Choose clear, recognizable FontAwesome icons
5. **Consistent breadcrumbs**: Always start with Home
6. **Button hierarchy**: Use `btn-primary` for the main action

---

## FontAwesome Icons

Common icons for daycare pages:

| Page | Icon |
|------|------|
| Dashboard | `fas fa-tachometer-alt` |
| Children | `fas fa-child` |
| Parents | `fas fa-users` |
| Attendance | `fas fa-calendar-check` |
| Activities | `fas fa-puzzle-piece` |
| Notifications | `fas fa-bell` |
| Settings | `fas fa-cog` |
| Reports | `fas fa-chart-bar` |

---

## Need Help?

If you need to customize the component further, check:
- `titlepage.component.ts` - Component logic
- `titlepage.component.html` - Template structure
- `titlepage.component.css` - Styling

---

**Component Created Successfully!** ✅

Now you can use this component on any page to create consistent, professional page headers with breadcrumbs and action buttons.