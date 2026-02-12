# Customer Panel

Complete customer dashboard for Venue ERP with authentication system.

## 🎯 Features

### Authentication System
- **Login Modal** - Email/password login with social options (Google, Facebook)
- **Register Modal** - Full registration form with validation
- **Forgot Password Modal** - Password reset functionality
- **Session Management** - localStorage-based authentication
- **Auto-redirect** - Protects customer panel pages from unauthorized access

### Customer Dashboard
- **Welcome Card** - Personalized greeting with quick actions
- **Statistics Cards** - Total bookings, confirmed, pending, favorites
- **Upcoming Bookings** - Table view of next events
- **Recent Enquiries** - Track enquiry status
- **Popular Venues** - Browse recommended venues

### My Bookings
- **Filter Tabs** - All, Confirmed, Pending, Cancelled
- **Bookings Table** - Complete booking details
- **Actions** - View details, cancel bookings
- **Pagination** - Navigate through booking history

### Profile Management
- **Profile Card** - Avatar, name, email display
- **Personal Information** - Full name, email, phone, DOB, address
- **Account Stats** - Member since, total bookings, total spent
- **Change Password** - Secure password update

### Settings
- **Notification Preferences** - Email, SMS, marketing, browser notifications
- **Privacy & Security** - Profile visibility, 2FA, payment methods
- **Preferences** - Language, timezone, currency, date format
- **Danger Zone** - Export data, delete account

## 📁 File Structure

```
customer/
├── css/
│   └── customer.css          # Complete panel stylesheet (800+ lines)
├── js/
│   └── customer.js           # Auth check, logout, UI interactions
├── dashboard.html            # Main dashboard with stats
├── bookings.html             # Booking management
├── profile.html              # User profile editor
├── settings.html             # Account settings
└── README.md                 # This file

includes/
└── auth-modals.html          # Login, Register, Forgot Password modals
```

## 🔐 Authentication Flow

1. **Guest visits website** → Sees Login/Sign Up buttons in navigation
2. **Clicks Login/Sign Up** → Modal popup appears
3. **Submits credentials** → Validated and stored in localStorage
4. **Redirects to customer panel** → dashboard.html loads
5. **Each page checks auth** → customer.js validates session
6. **Logout** → Clears localStorage, redirects to guest home

## 🎨 Design System

### Colors
- **Primary:** #6366f1 (Indigo)
- **Success:** #10b981 (Green)
- **Warning:** #f59e0b (Amber)
- **Danger:** #ef4444 (Red)
- **Gradient:** Linear gradient (Purple to Pink)

### Layout
- **Sidebar Width:** 260px
- **Header Height:** 70px
- **Responsive:** Mobile-friendly with collapsible sidebar

### Components
- Statistics cards with icons
- Data tables with hover effects
- Form controls with focus states
- Badges for status indicators
- Modal overlays with animations

## 🚀 Usage

### Opening Auth Modals (from Guest Pages)
```javascript
// Login
openModal('loginModal');

// Register
openModal('registerModal');

// Forgot Password
openModal('forgotModal');
```

### Accessing Auth Data (in Customer Panel)
```javascript
const authData = localStorage.getItem('authData');
const user = JSON.parse(authData).user;
console.log(user.name, user.email, user.role);
```

### Logout
```javascript
localStorage.removeItem('authData');
window.location.href = '../index.html';
```

## 📝 Auth Data Structure

```json
{
  "isAuthenticated": true,
  "user": {
    "id": 1707567890123,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "loginTime": "2026-02-10T12:34:56.789Z"
  }
}
```

## 🔄 Integration with Guest Website

All guest pages now include:
- Auth modal container
- Login/Sign Up navigation buttons
- Auto-load auth modals via jQuery
- Modal functions (openModal, closeModal, switchModal)

## 📱 Responsive Design

- **Desktop (>768px):** Full sidebar, all features visible
- **Tablet (768px):** Collapsible sidebar with toggle button
- **Mobile (<768px):** Overlay sidebar, simplified header

## ✅ Pages Status

| Page | Status | Features |
|------|--------|----------|
| dashboard.html | ✅ Complete | Stats, bookings, enquiries, venues |
| bookings.html | ✅ Complete | Filter, table, pagination |
| profile.html | ✅ Complete | Info editor, password change |
| settings.html | ✅ Complete | Notifications, privacy, preferences |
| enquiries.html | ⏳ Placeholder | To be created |
| browse-venues.html | ⏳ Placeholder | To be created |
| favorites.html | ⏳ Placeholder | To be created |

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **jQuery 3.6.4** - DOM manipulation, AJAX
- **Font Awesome 6.4** - Icons
- **localStorage** - Client-side auth storage

## 🎯 Next Steps

1. Create remaining pages (enquiries, browse-venues, favorites)
2. Implement real backend API integration
3. Add server-side authentication
4. Connect booking forms to database
5. Add payment gateway integration

---

**Built with** ❤️ **for Venue ERP Project**
