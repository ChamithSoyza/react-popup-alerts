/**
 * React Popup Alerts
 * A flexible and customizable alert/notification system for React applications
 * 
 * @auther Chamith Soyza
 * @license MIT
 */

// Exports the AlertProvider component
export { default as AlertProvider } from './AlertProvider';

// Export the useAlert hook for hook-based usage
export { useAlert } from './hooks/useAlerts';

// Export AlertManager for imperative usage
export { default as alert } from './AlertManager';

// Export PopupAlert component (optional, for advanced usage)
export { default as PopupAlert } from './components/PopupAlert';

// Default export
export { default } from './AlertProvider';