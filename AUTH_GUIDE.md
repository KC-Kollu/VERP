# 🔐 Authentication Guide

Complete guide to the authentication system in Venue ERP.

## 🎯 Overview

The authentication system uses **client-side validation** and **localStorage** for session management. This is a demo implementation suitable for prototyping and development.

> **Note:** For production, replace with server-side authentication (JWT, OAuth, etc.)

## 📋 Table of Contents

1. [Authentication Flow](#authentication-flow)
2. [Modal System](#modal-system)
3. [Session Management](#session-management)
4. [Protected Routes](#protected-routes)
5. [API Reference](#api-reference)

---

## 🔄 Authentication Flow

### Registration Flow

```
┌─────────────────┐
│  Guest Website  │
│  (Any Page)     │
└────────┬────────┘
         │
         │ Click "Sign Up"
         ▼
┌─────────────────┐
│ Register Modal  │
│  Opens (Popup)  │
└────────┬────────┘
         │
         │ Fill Form:
         │ - Name
         │ - Email
         │ - Phone
         │ - Password
         │ - Confirm Password
         │ ✓ Accept Terms
         ▼
┌─────────────────┐
│   Validation    │
│  - Password     │
│    match?       │
│  - Min 8 chars? │
│  - Terms agreed?│
└────────┬────────┘
         │
         │ ✅ Valid
         ▼
┌─────────────────┐
│  Create Auth    │
│   localStorage  │
│   {             │
│     user: {...} │
│     role: 'cust'│
│   }             │
└────────┬────────┘
         │
         │ Auto-redirect
         ▼
┌─────────────────┐
│ Customer Panel  │
│   Dashboard     │
└─────────────────┘
```

### Login Flow

```
┌─────────────────┐
│  Guest Website  │
└────────┬────────┘
         │
         │ Click "Login"
         ▼
┌─────────────────┐
│   Login Modal   │
└────────┬────────┘
         │
         │ Enter:
         │ - Email
         │ - Password
         │ □ Remember me
         ▼
┌─────────────────┐
│   Validation    │
│  (Client-side)  │
└────────┬────────┘
         │
         │ ✅ Valid
         ▼
┌─────────────────┐
│  Store Session  │
│   localStorage  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Customer Panel  │
└─────────────────┘
```

### Logout Flow

```
┌─────────────────┐
│ Customer Panel  │
└────────┬────────┘
         │
         │ Click "Logout"
         ▼
┌─────────────────┐
│  Confirmation   │
│  "Are you sure?"│
└────────┬────────┘
         │
         │ Yes
         ▼
┌─────────────────┐
│ Clear Session   │
│ localStorage    │
│ .removeItem()   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Guest Website  │
│   (Home Page)   │
└─────────────────┘
```

---

## 🎨 Modal System

### Available Modals

| Modal ID | Purpose | Triggered By |
|----------|---------|--------------|
| `loginModal` | User login | "Login" button |
| `registerModal` | New user registration | "Sign Up" button |
| `forgotModal` | Password reset | "Forgot password?" link |

### Modal Functions

```javascript
// Open a modal
openModal('loginModal');

// Close a modal
closeModal('loginModal');

// Switch between modals
switchModal('loginModal', 'registerModal');
```

### Modal Features

- **Backdrop Click**: Click outside to close
- **Escape Key**: Press ESC to close
- **Animations**: Fade in/slide up effects
- **Social Login**: Google & Facebook buttons (UI only)
- **Form Dividers**: "or continue with email"
- **Cross-links**: Switch between login/register

### Modal Structure

```html
<div id="loginModal" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2>Welcome Back</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <!-- Form content -->
    </div>
    <div class="modal-footer">
      <!-- Links to other modals -->
    </div>
  </div>
</div>
```

---

## 💾 Session Management

### Auth Data Structure

```javascript
{
  "isAuthenticated": true,
  "user": {
    "id": 1707567890123,        // Timestamp-based ID
    "name": "John Doe",          // From registration
    "email": "john@example.com", // Login identifier
    "phone": "+1234567890",      // Optional
    "role": "customer",          // Always 'customer'
    "loginTime": "2026-02-10T12:34:56.789Z",  // ISO timestamp
    "registeredAt": "2026-02-10T12:34:56.789Z" // For new users
  }
}
```

### Storage Operations

**Save Session:**
```javascript
const authData = {
  isAuthenticated: true,
  user: {
    id: Date.now(),
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    loginTime: new Date().toISOString()
  }
};

localStorage.setItem('authData', JSON.stringify(authData));
```

**Read Session:**
```javascript
const authData = localStorage.getItem('authData');
if (authData) {
  const { user } = JSON.parse(authData);
  console.log(user.name, user.email);
}
```

**Clear Session:**
```javascript
localStorage.removeItem('authData');
```

---

## 🔒 Protected Routes

### Auth Check (customer.js)

Every customer panel page runs this on load:

```javascript
function checkAuth() {
  const authData = localStorage.getItem('authData');

  if (!authData) {
    // Not authenticated
    alert('Please login to access the customer panel.');
    window.location.href = '../index.html';
    return null;
  }

  try {
    return JSON.parse(authData);
  } catch (e) {
    // Invalid data
    localStorage.removeItem('authData');
    window.location.href = '../index.html';
    return null;
  }
}
```

### Protected Pages

All pages in `customer/` directory are protected:
- ✅ `dashboard.html`
- ✅ `bookings.html`
- ✅ `profile.html`
- ✅ `settings.html`

### Redirect Behavior

| Condition | Action |
|-----------|--------|
| No auth data | Redirect to `../index.html` with alert |
| Invalid auth data | Clear storage, redirect to home |
| Valid auth data | Load page, display user info |

---

## 📚 API Reference

### Global Functions

#### `openModal(modalId)`
Opens an authentication modal.

**Parameters:**
- `modalId` (string): ID of modal to open

**Example:**
```javascript
openModal('loginModal');
```

---

#### `closeModal(modalId)`
Closes an authentication modal.

**Parameters:**
- `modalId` (string): ID of modal to close

**Example:**
```javascript
closeModal('registerModal');
```

---

#### `switchModal(currentId, targetId)`
Closes current modal and opens another.

**Parameters:**
- `currentId` (string): ID of modal to close
- `targetId` (string): ID of modal to open

**Example:**
```javascript
switchModal('loginModal', 'forgotModal');
```

---

### Form Handlers

#### Login Form (`#loginForm`)

**Submit Handler:**
```javascript
$('#loginForm').on('submit', function(e) {
  e.preventDefault();

  const email = $('#loginEmail').val();
  const password = $('#loginPassword').val();
  const remember = $(this).find('input[name="remember"]').is(':checked');

  // Create auth data
  const authData = { ... };

  // Store in localStorage
  localStorage.setItem('authData', JSON.stringify(authData));

  // Redirect to customer panel
  window.location.href = 'customer/dashboard.html';
});
```

---

#### Register Form (`#registerForm`)

**Validation:**
- Password length ≥ 8 characters
- Password === Confirm Password
- Terms checkbox must be checked

**Submit Handler:**
```javascript
$('#registerForm').on('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = $('#registerName').val();
  const email = $('#registerEmail').val();
  const phone = $('#registerPhone').val();
  const password = $('#registerPassword').val();
  const confirmPassword = $('#registerConfirmPassword').val();

  // Validate passwords
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters!');
    return;
  }

  // Create user and redirect
  // ...
});
```

---

#### Forgot Password Form (`#forgotForm`)

**Submit Handler:**
```javascript
$('#forgotForm').on('submit', function(e) {
  e.preventDefault();

  const email = $('#forgotEmail').val();

  // Simulate password reset
  alert(`Password reset link sent to ${email}`);

  closeModal('forgotModal');
  $(this)[0].reset();
});
```

---

### Customer Panel Functions

#### `checkAuth()`
Verifies user authentication on customer panel pages.

**Returns:**
- Auth data object if valid
- `null` if invalid (with redirect)

**Example:**
```javascript
const auth = checkAuth();
if (!auth) return; // Will have redirected

console.log(auth.user.name);
```

---

#### Logout Handler
```javascript
$('#logoutBtn').on('click', function(e) {
  e.preventDefault();

  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('authData');
    alert('Logged out successfully');
    window.location.href = '../index.html';
  }
});
```

---

## 🎨 Customization

### Styling Modals

Modals can be customized via `css/style.css`:

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.modal {
  max-width: 450px;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header h2 {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Adding Social Login

Currently UI-only. To implement:

1. Add OAuth provider SDK
2. Handle OAuth callback
3. Exchange token for session
4. Store in localStorage

---

## 🚨 Security Considerations

### Current Limitations (Demo)

⚠️ **This is a CLIENT-SIDE DEMO authentication system**

**Limitations:**
- ❌ No password hashing
- ❌ No server validation
- ❌ No token expiry
- ❌ localStorage is not secure
- ❌ No CSRF protection
- ❌ No rate limiting
- ❌ Any credentials work

### Production Recommendations

For production deployment:

1. **Use Server-Side Auth**
   - Implement JWT tokens
   - Hash passwords (bcrypt)
   - Validate on server

2. **Use httpOnly Cookies**
   - Not accessible via JavaScript
   - Automatic CSRF protection
   - Secure transmission

3. **Add Session Expiry**
   - Short-lived tokens (15 min)
   - Refresh token rotation
   - Auto-logout on inactivity

4. **Implement Rate Limiting**
   - Prevent brute force
   - Block suspicious IPs
   - CAPTCHA after failures

5. **Use HTTPS**
   - Encrypt data in transit
   - Prevent MITM attacks
   - Required for cookies

6. **Add 2FA**
   - TOTP (Google Authenticator)
   - SMS verification
   - Email confirmation

---

## 📝 Example Usage

### Complete Login Flow

```javascript
// 1. User clicks login button
<a href="#" onclick="openModal('loginModal'); return false;">Login</a>

// 2. Modal opens
// User sees login form

// 3. User enters credentials and submits
Email: john@example.com
Password: password123
[✓] Remember me

// 4. Form validation passes
// 5. Auth data created and stored
{
  "isAuthenticated": true,
  "user": {
    "id": 1707567890123,
    "name": "john",
    "email": "john@example.com",
    "role": "customer",
    "loginTime": "2026-02-10T12:34:56.789Z"
  }
}

// 6. Redirected to customer panel
window.location.href = 'customer/dashboard.html';

// 7. Dashboard loads
// - Runs checkAuth()
// - Validates localStorage data
// - Displays user info
// - Shows dashboard content

// 8. User works in panel
// - Can navigate between pages
// - Auth persists across pages
// - User info displayed in header

// 9. User clicks logout
// - Confirmation dialog appears
// - User confirms
// - localStorage cleared
// - Redirected to guest home
```

---

## 🎓 Best Practices

### DO ✅

- Check auth on every protected page load
- Clear session on logout
- Show confirmation before logout
- Validate passwords before storing
- Display user feedback (alerts, messages)
- Handle edge cases (invalid data, missing fields)

### DON'T ❌

- Store sensitive data in localStorage (in production)
- Skip validation on client or server
- Allow weak passwords
- Auto-login without user consent
- Keep sessions forever
- Trust client-side data (in production)

---

## 📞 Support

For issues or questions:
- Check `customer/README.md` for customer panel docs
- Review `CHANGELOG.md` for recent changes
- Inspect browser console for errors
- Clear localStorage to reset auth state

---

**Last Updated:** 2026-02-10
**Version:** 2.0.0
