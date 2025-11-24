/**
 * AlertManager: Singleton Class for imperative alert API
 * Allows calling alerts from anywhere in the app without hooks
 */
class AlertManager {
    constructor() {
        this.listener = null;
    }

    /**
     * Register the alert listener (called by AlertProvider)
     */
    setListener(listener) {
        this.listener = listener;
    }

    /**
     * Remove the alert listener (cleanup)
     */
    removeListener() {
        this.listener = null;
    }

    /**
     * Internal method to trigger alerts
     */
    showAlert(variant, message, isConfirm = false, onConfirm = null, onCancel = null) {
        if (this.listener) {
            this.listener(variant, message, isConfirm, onConfirm, onCancel);
        } else {
            console.warn('AlertProvider not found. Make sure to wrap your app with <AlertProvider>');
        }
    }

    /**
     * Show 'info' alert:
     * @param {string} message - Alert message
     * @param {boolean} isConfirm - Whether to show confirmation buttons
     * @param {function} onConfirm - Callback for confirm action
     * @param {function} onCancel - Callback for cancel action
     */
    info(message, isConfirm = false, onConfirm = null, onCancel = null) {
        this.showAlert('info', message, isConfirm, onConfirm, onCancel);
    }

    /**
     * Show 'success' alert:
     * @param {string} message - Alert message
     * @param {boolean} isConfirm - Whether to show confirmation buttons
     * @param {function} onConfirm - Callback for confirm action
     * @param {function} onCancel - Callback for cancel action
     */
    success(message, isConfirm = false, onConfirm = null, onCancel = null) {
        this.showAlert('success', message, isConfirm, onConfirm, onCancel);
    }

    /**
     * Show 'warning' alert
     * @param {string} message - Alert message
     * @param {boolean} isConfirm - Whether to show confirmation buttons
     * @param {function} onConfirm - Callback for confirm action
     * @param {function} onCancel - Callback for cancel action
     */
    warning(message, isConfirm = false, onConfirm = null, onCancel = null) {
        this.showAlert('warning', message, isConfirm, onConfirm, onCancel);
    }

    /**
     * Show 'error' alert
     * @param {string} message - Alert message
     * @param {boolean} isConfirm - Whether to show confirmation buttons
     * @param {function} onConfirm - Callback for confirm action
     * @param {function} onCancel - Callback for cancel action
     */
    error(message, isConfirm = false, onConfirm = null, onCancel = null) {
        this.showAlert('error', message, isConfirm, onConfirm, onCancel);
    }

    /**
     * Show 'cancel' alert
     * @param {string} message - Alert message
     * @param {boolean} isConfirm - Whether to show confirmation buttons
     * @param {function} onConfirm - Callback for confirm action
     * @param {function} onCancel - Callback for cancel action
     */
    cancel(message, isConfirm = false, onConfirm = null, onCancel = null) {
        this.showAlert('cancel', message, isConfirm, onConfirm, onCancel);
    }

    /**
     * Show confirmation dialog (confirm variant)
     * @param {string} message - Alert message
     * @param {function} onConfirm - Callback for confirm action
     * @param {function} onCancel - Callback for cancel action
     */
    confirm(message, onConfirm = null, onCancel = null) {
        this.showAlert('confirm', message, true, onConfirm, onCancel);
    }

    /**
     * Show confirmation dialog with promise support
     * @param {string} message - Alert message
     * @param {string} variant - Alert variant (default: 'confirm')
     * @param {Promise<boolean>} - Resolves to true if confirmed, false if cancelled
     */
    confirmPromise(message, variant = 'confirm') {
        return new Promise((resolve) => {
            this.showAlert(
                variant,
                message,
                true,
                () => resolve(true),
                () => resolve(false)
            )
        });
    }
}

const alertManager = new AlertManager();

export default alertManager;