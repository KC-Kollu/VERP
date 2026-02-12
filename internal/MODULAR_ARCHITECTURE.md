# 🏗️ Modular Architecture Documentation

## Overview

The Internal Sales Dashboard uses a **component-based, modular architecture** for maximum reusability and maintainability.

---

## 📦 Component Structure

```
internal/
├── components/              # Reusable HTML components
│   ├── sidebar.html        # Navigation sidebar
│   ├── header.html         # Page header with search & user menu
│   ├── calendar-widget.html # Calendar widget
│   ├── stat-widget.html    # Statistics widget template
│   └── modals/             # Modal components
│
├── css/
│   └── internal.css        # Complete stylesheet (770 lines)
│
├── js/
│   ├── components.js       # Component system & utilities
│   └── internal.js         # Core app logic
│
└── pages/                  # Individual pages using components
    ├── dashboard.html
    ├── bookings.html
    ├── calendar.html
    ├── leads.html
    ├── customers.html
    └── reports.html
```

---

## 🔧 Core Classes & Utilities

### 1. **ComponentLoader**

Dynamically loads HTML components and handles template replacement.

```javascript
// Load single component
await ComponentLoader.load('sidebar', 'sidebarContainer', {
  userName: 'John Doe'
});

// Load multiple components
await ComponentLoader.loadMultiple([
  { name: 'sidebar', target: 'sidebarContainer' },
  { name: 'header', target: 'headerContainer' }
]);
```

**Methods:**
- `load(componentName, targetId, data)` - Load single component
- `loadMultiple(components)` - Load multiple components in parallel

---

### 2. **WidgetBuilder**

Creates and renders statistics widgets.

```javascript
// Define widgets
const widgets = [
  {
    label: 'Total Bookings',
    value: '156',
    change: '+12 this month',
    icon: 'fas fa-calendar-check',
    iconClass: 'primary',
    changeClass: 'positive'
  }
];

// Render all widgets
WidgetBuilder.renderWidgets(widgets, 'containerId');
```

**Methods:**
- `createStatWidget(config)` - Create single widget HTML
- `renderWidgets(widgets, containerId)` - Render multiple widgets

**Widget Config:**
- `label` - Widget title
- `value` - Main stat value
- `change` - Change indicator text
- `icon` - FontAwesome icon class
- `iconClass` - Color theme (primary, success, warning, danger, info)
- `changeClass` - positive/negative for arrow direction

---

### 3. **CalendarManager**

Manages calendar rendering and events.

```javascript
// Initialize calendar
calendar = new CalendarManager('containerId');

// Add events
calendar.addEvent('2026-02-15', 'Grand Ballroom - Wedding', 'confirmed');

// Render calendar
calendar.renderCalendar();

// Change month
calendar.changeMonth(1);  // Next month
calendar.changeMonth(-1); // Previous month
```

**Methods:**
- `renderCalendar()` - Render current month
- `addEvent(date, title, type)` - Add calendar event
- `hasEventOnDate(year, month, day)` - Check if date has events
- `selectDate(year, month, day)` - Handle date selection
- `changeMonth(direction)` - Navigate months

---

### 4. **TableBuilder**

Dynamic table generation with actions.

```javascript
TableBuilder.render({
  columns: [
    { label: 'ID', field: 'id' },
    { label: 'Name', field: 'name' },
    {
      label: 'Amount',
      field: 'amount',
      format: (val) => Formatters.currency(val)
    },
    {
      label: 'Status',
      field: 'status',
      format: (val) => Formatters.badge(val)
    }
  ],
  data: arrayOfObjects,
  actions: [
    {
      label: 'View',
      icon: 'fas fa-eye',
      class: 'btn-secondary',
      onClick: 'viewItem'
    }
  ]
}, 'containerId');
```

**Column Config:**
- `label` - Column header
- `field` - Data field name
- `format` - Optional formatter function

**Action Config:**
- `label` - Button tooltip
- `icon` - FontAwesome icon
- `class` - Button CSS class
- `onClick` - Function name (receives row id)

---

### 5. **ModalManager**

Create and control modals.

```javascript
// Create modal
const modalHTML = ModalManager.create({
  id: 'myModal',
  title: 'Modal Title',
  size: 'large', // small, medium, large
  body: '<p>Modal content here</p>',
  footer: '<button onclick="ModalManager.close(\'myModal\')">Close</button>'
});

$('#container').html(modalHTML);

// Open/Close
ModalManager.open('myModal');
ModalManager.close('myModal');
```

**Methods:**
- `create(config)` - Generate modal HTML
- `open(modalId)` - Show modal
- `close(modalId)` - Hide modal

---

### 6. **PageManager**

Manage page state and UI.

```javascript
// Set page title
PageManager.setTitle('Dashboard');

// Set active nav item
PageManager.setActiveNav('dashboard');

// Set quick action buttons
PageManager.setQuickActions([
  {
    label: 'New Booking',
    icon: 'fas fa-plus',
    class: 'btn-primary',
    onClick: "openModal('newBookingModal')"
  }
]);
```

**Methods:**
- `setTitle(title)` - Update page title
- `setActiveNav(page)` - Highlight active nav item
- `setQuickActions(actions)` - Add header action buttons

---

### 7. **Formatters**

Utility functions for data formatting.

```javascript
Formatters.currency(5000);        // "$5,000.00"
Formatters.date('2026-02-25');    // "Feb 25, 2026"
Formatters.badge('confirmed');    // <span class="badge badge-success">Confirmed</span>
Formatters.phone('5551234567');   // "(555) 123-4567"
```

**Methods:**
- `currency(value)` - Format as USD currency
- `date(dateString)` - Format date (Month Day, Year)
- `badge(status)` - Generate status badge HTML
- `phone(number)` - Format phone number

---

## 📄 Component Files

### sidebar.html

Navigation sidebar with sections.

**Features:**
- Logo header with gradient background
- Nav sections (Main, Sales, Management)
- Active link highlighting via `data-page` attribute
- Logout button in footer

**Usage:**
```javascript
await ComponentLoader.load('sidebar', 'sidebarContainer');
PageManager.setActiveNav('dashboard'); // Highlight active page
```

---

### header.html

Page header with search and user menu.

**Features:**
- Dynamic page title
- Quick action buttons container
- Global search input
- Notification & message icons with badges
- User avatar and info dropdown

**Usage:**
```javascript
await ComponentLoader.load('header', 'headerContainer');
PageManager.setTitle('Dashboard');
PageManager.setQuickActions([...]);
```

---

### calendar-widget.html

Mini calendar with event indicators.

**Features:**
- Month navigation (prev/next)
- Weekday headers
- Current day highlighting
- Event day markers (dots)
- Click handling for date selection

**Usage:**
```javascript
await ComponentLoader.load('calendar-widget', 'calendarContainer');
calendar = new CalendarManager('calendarContainer');
calendar.addEvent('2026-02-15', 'Event Title', 'type');
calendar.renderCalendar();
```

---

### stat-widget.html

Template for statistics widgets.

**Template Variables:**
- `{{label}}` - Widget label
- `{{value}}` - Main value
- `{{change}}` - Change indicator
- `{{icon}}` - Icon class
- `{{iconClass}}` - Color class
- `{{changeClass}}` - positive/negative
- `{{changeIcon}}` - up/down

**Usage:**
```javascript
WidgetBuilder.renderWidgets(widgetsArray, 'containerId');
```

---

## 🎯 Creating New Pages

### Step 1: Create HTML File

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Venue ERP Internal</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/internal.css">
</head>
<body>

  <div class="panel-layout">
    <!-- Sidebar Component -->
    <div id="sidebarContainer"></div>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header Component -->
      <div id="headerContainer"></div>

      <!-- Page Content -->
      <div class="page-content">
        <div class="container-fluid">
          <!-- Your content here -->
        </div>
      </div>

    </main>
  </div>

  <!-- Scripts -->
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="js/components.js"></script>
  <script src="js/internal.js"></script>
  <script>
    $(document).ready(async function() {
      // Load components
      await ComponentLoader.loadMultiple([
        { name: 'sidebar', target: 'sidebarContainer' },
        { name: 'header', target: 'headerContainer' }
      ]);

      // Configure page
      PageManager.setTitle('Your Page Title');
      PageManager.setActiveNav('page-slug');

      // Your page logic here
    });
  </script>

</body>
</html>
```

### Step 2: Add to Sidebar

Edit `components/sidebar.html`:

```html
<li class="nav-item">
  <a href="yourpage.html" class="nav-link" data-page="page-slug">
    <i class="fas fa-icon"></i>
    <span>Your Page</span>
  </a>
</li>
```

### Step 3: Implement Page Logic

Use the utilities to build your page:
- `WidgetBuilder` for stats
- `TableBuilder` for tables
- `ModalManager` for popups
- `CalendarManager` for calendars

---

## 💡 Best Practices

### ✅ DO:

1. **Always load components first**
   ```javascript
   await ComponentLoader.loadMultiple([...]);
   ```

2. **Use PageManager for consistent UI**
   ```javascript
   PageManager.setTitle('...');
   PageManager.setActiveNav('...');
   ```

3. **Use Formatters for data display**
   ```javascript
   format: (val) => Formatters.currency(val)
   ```

4. **Keep action functions global**
   ```javascript
   function viewBooking(id) {
     // Handler code
   }
   ```

5. **Use semantic component names**
   - `sidebar`, `header`, `footer`
   - `booking-form`, `customer-card`

### ❌ DON'T:

1. **Don't hardcode HTML in JavaScript**
   - Use components and builders instead

2. **Don't duplicate navigation code**
   - Use the sidebar component

3. **Don't skip component loading**
   - Pages won't work without components

4. **Don't mix inline styles**
   - Use CSS classes from `internal.css`

---

## 🔄 Reusability Benefits

### Before (Without Modules):
```
dashboard.html     → 800 lines (includes sidebar, header, etc.)
bookings.html      → 850 lines (duplicates sidebar, header, etc.)
customers.html     → 820 lines (duplicates sidebar, header, etc.)
Total: 2,470 lines with massive duplication
```

### After (With Modules):
```
dashboard.html     → 250 lines (uses components)
bookings.html      → 280 lines (uses components)
customers.html     → 260 lines (uses components)

+ components/sidebar.html   → 70 lines (used by all)
+ components/header.html    → 40 lines (used by all)
+ js/components.js          → 280 lines (used by all)

Total: 1,180 lines with ZERO duplication
Savings: 52% less code!
```

### Maintenance Benefits:

**Update Navigation:**
- Before: Edit 10 files
- After: Edit 1 file (`sidebar.html`)

**Change Header:**
- Before: Edit 10 files
- After: Edit 1 file (`header.html`)

**Add New Widget Type:**
- Before: Copy/paste to each page
- After: Update `WidgetBuilder` once

---

## 🚀 Quick Reference

### Load Components
```javascript
await ComponentLoader.loadMultiple([
  { name: 'sidebar', target: 'sidebarContainer' },
  { name: 'header', target: 'headerContainer' }
]);
```

### Create Widgets
```javascript
WidgetBuilder.renderWidgets([
  { label: 'Title', value: '123', change: '+10%', icon: 'fas fa-chart', iconClass: 'primary' }
], 'containerId');
```

### Create Table
```javascript
TableBuilder.render({
  columns: [{ label: 'Name', field: 'name' }],
  data: [...],
  actions: [{ label: 'View', icon: 'fas fa-eye', class: 'btn-primary', onClick: 'viewItem' }]
}, 'containerId');
```

### Create Modal
```javascript
const modal = ModalManager.create({
  id: 'myModal',
  title: 'Title',
  body: '<p>Content</p>'
});
$('#container').html(modal);
ModalManager.open('myModal');
```

### Initialize Calendar
```javascript
calendar = new CalendarManager('containerId');
calendar.addEvent('2026-02-15', 'Event', 'type');
calendar.renderCalendar();
```

---

## 📊 Component Dependency Graph

```
Page (dashboard.html, bookings.html, etc.)
  │
  ├─→ ComponentLoader
  │     ├─→ sidebar.html
  │     ├─→ header.html
  │     └─→ calendar-widget.html
  │
  ├─→ WidgetBuilder
  │     └─→ stat-widget.html (template)
  │
  ├─→ TableBuilder
  │     └─→ Formatters
  │
  ├─→ CalendarManager
  │     └─→ calendar-widget.html
  │
  ├─→ ModalManager
  │     └─→ modal templates
  │
  └─→ PageManager
        └─→ Updates header.html elements
```

---

## 🎓 Advanced Usage

### Custom Widget Types

Extend `WidgetBuilder`:

```javascript
WidgetBuilder.createCustomWidget = function(config) {
  return `
    <div class="custom-widget">
      <!-- Your custom HTML -->
    </div>
  `;
};
```

### Custom Table Formatters

```javascript
TableBuilder.render({
  columns: [
    {
      label: 'Complex',
      field: 'data',
      format: (val, row) => {
        // Access full row data
        return `<div>${val} - ${row.other}</div>`;
      }
    }
  ],
  data: [...]
}, 'containerId');
```

### Calendar Event Handlers

```javascript
calendar.selectDate = function(year, month, day) {
  // Custom date selection logic
  console.log('Selected:', year, month, day);
  // Open modal, load data, etc.
};
```

---

**Version:** 1.0.0
**Last Updated:** February 10, 2026
