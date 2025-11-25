# React Popup Alerts

[![npm version](https://badge.fury.io/js/react-popup-alerts.svg)](https://www.npmjs.com/package/react-popup-alerts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and customizable popup alert system for React applications built with Context API and custom hooks.

[View Demo](#) | [Report Bug](https://github.com/ChamithSoyza/react-popup-alerts/issues) | [Request Feature](https://github.com/ChamithSoyza/react-popup-alerts/issues)


## Features

- ✨ Multiple alert variants (info, success, warning, error, cancel, confirm)
- 🎣 Two usage patterns: Hook-based and Imperative
- 🔄 Alert queuing system
- 💬 Confirmation dialogs with callbacks
- 🎨 Customizable styling
- 📱 Responsive design
- ⚡ Lightweight and performant
- 🎯 TypeScript support (coming soon)

## Installation
```bash
npm install react-popup-alerts react-bootstrap bootstrap react-icons
```

or
```bash
yarn add react-popup-alerts react-bootstrap bootstrap react-icons
```

## Setup

Wrap your application with the `AlertProvider`:
```jsx
import React from 'react';
import { AlertProvider } from 'react-popup-alerts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AlertProvider>
      {/* Your app components */}
    </AlertProvider>
  );
}

export default App;
```

## Usage

### Method 1: Imperative API (Recommended)

Use the `alert` object to trigger alerts from anywhere in your app:
```jsx
import { alert } from 'react-popup-alerts';

function MyComponent() {
  const handleClick = () => {
    // Simple alerts
    alert.info('This is an info message');
    alert.success('Operation completed successfully!');
    alert.warning('Please be careful!');
    alert.error('Something went wrong!');
    
    // Confirmation dialog
    alert.confirm(
      'Are you sure you want to delete this item?',
      () => {
        // User clicked Yes
        console.log('Confirmed!');
      },
      () => {
        // User clicked Cancel
        console.log('Cancelled!');
      }
    );
  };

  return <button onClick={handleClick}>Show Alert</button>;
}
```

### Method 2: Promise-based Confirmation

Use async/await with confirmation dialogs:
```jsx
import { alert } from 'react-popup-alerts';

async function deleteUser() {
  const confirmed = await alert.confirmPromise('Delete this user?');
  
  if (confirmed) {
    // User clicked Yes
    await performDelete();
    alert.success('User deleted successfully!');
  } else {
    // User clicked Cancel
    alert.info('Deletion cancelled');
  }
}
```

### Method 3: Hook-based API

Use the `useAlert` hook inside React components:
```jsx
import { useAlert } from 'react-popup-alerts';

function MyComponent() {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert.info('This is an info message');
    showAlert.success('Success message');
    
    // With confirmation
    showAlert.confirm(
      'Are you sure?',
      () => console.log('Confirmed'),
      () => console.log('Cancelled')
    );
    
    // Promise-based
    const result = await showAlert.confirmPromise('Proceed with this action?');
  };

  return <button onClick={handleClick}>Show Alert</button>;
}
```

## API Reference

### Alert Variants

- `alert.info(message, isConfirm?, onConfirm?, onCancel?)`
- `alert.success(message, isConfirm?, onConfirm?, onCancel?)`
- `alert.warning(message, isConfirm?, onConfirm?, onCancel?)`
- `alert.error(message, isConfirm?, onConfirm?, onCancel?)`
- `alert.cancel(message, isConfirm?, onConfirm?, onCancel?)`
- `alert.confirm(message, onConfirm?, onCancel?)`
- `alert.confirmPromise(message, variant?)` - Returns a Promise<boolean>

### Parameters

- `message` (string): The message to display
- `isConfirm` (boolean): Whether to show confirmation buttons (Yes/Cancel)
- `onConfirm` (function): Callback when user clicks Yes
- `onCancel` (function): Callback when user clicks Cancel
- `variant` (string): Alert type for confirm method

## Customization

You can customize the styling by overriding the CSS classes:
```css
/* Override default styles */
.rpa-alert-modal .modal-content {
  border-radius: 10px !important;
}

.rpa-text-info {
  color: #your-color !important;
}
```

## Use Cases

### 1. API Error Handling
```jsx
import { alert } from 'react-popup-alerts';

async function fetchData() {
  try {
    const response = await api.getData();
    alert.success('Data loaded successfully!');
  } catch (error) {
    alert.error(error.message || 'Failed to load data');
  }
}
```

### 2. Form Validation
```jsx
function handleSubmit(e) {
  e.preventDefault();
  
  if (!formData.email) {
    alert.warning('Please enter your email address');
    return;
  }
  
  // Submit form
}
```

### 3. Delete Confirmation
```jsx
async function handleDelete(id) {
  const confirmed = await alert.confirmPromise(
    'Are you sure you want to delete this item? This action cannot be undone.',
    'warning'
  );
  
  if (confirmed) {
    await deleteItem(id);
    alert.success('Item deleted successfully!');
  }
}
```

### 4. Outside React Components
```jsx
// In a utility file
import { alert } from 'react-popup-alerts';

export function apiErrorHandler(error) {
  if (error.status === 401) {
    alert.error('Session expired. Please login again.');
  } else if (error.status === 403) {
    alert.warning('You do not have permission to perform this action.');
  } else {
    alert.error('An unexpected error occurred.');
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © ChamithSoyza

## Support

If you encounter any issues or have questions, please file an issue on [GitHub](https://github.com/ChamithSoyza/react-popup-alerts/issues).