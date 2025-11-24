import React, { useState, useEffect } from 'react';
import AlertContext from './context/AlertContext';
import PopupAlert from './components/PopupAlert';
import alertManager from './AlertManager';
import './styles/alert.css';

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    /**
     * Internal function to add alert to queue
     */
    const addAlert = (variant, message, isConfirm = false, onConfirm = null, onCancel = null) => {
        setAlerts(prevAlerts => [
            ...prevAlerts,
            { variant, message, isConfirm, onConfirm, onCancel }
        ]);
    };

    /**
     * Remove the first alert
     */
    const hideAlert = () => {
        setAlerts(prevAlerts => prevAlerts.slice(1));
    };

    /**
     * Register AlertManager on mount
     * This enables imperative API (alert.info(), alert.success(), etc.)
     */
    useEffect(() => {
        alertManager.setListener(addAlert);

        return () => {
            alertManager.removeListener();
        }
    }, []);

    /**
     * Hook-based API object
     * Provides methods for each alert type
     */
    const showAlert = {
        info: (message, isConfirm = false, onConfirm = null, onCancel = null) => {
            addAlert('info', message, isConfirm, onConfirm, onCancel);
        },
        success: (message, isConfirm = false, onConfirm = null, onCancel = null) => {
            addAlert('success', message, isConfirm, onConfirm, onCancel);
        },
        warning: (message, isConfirm = false, onConfirm = null, onCancel = null) => {
            addAlert('warning', message, isConfirm, onConfirm, onCancel);
        },
        error: (message, isConfirm = false, onConfirm = null, onCancel = null) => {
            addAlert('error', message, isConfirm, onConfirm, onCancel);
        },
        cancel: (message, isConfirm = false, onConfirm = null, onCancel = null) => {
            addAlert('cancel', message, isConfirm, onConfirm, onCancel);
        },
        confirm: (message, onConfirm = null, onCancel = null) => {
            addAlert('confirm', message, true, onConfirm, onCancel);
        },
        confirmPromise: (message, variant = 'confirm') => {
            return new Promise((resolve) => {
                addAlert(
                    variant,
                    message,
                    true,
                    () => resolve(true),
                    () => resolve(false))
            });
        }
    };

    return (
        <>
            <AlertContext.Provider value={{ showAlert, hideAlert }}>
                {children}
                {alerts.length > 0 && (
                    <PopupAlert {...alerts[0]} onClose={hideAlert} />
                )}
            </AlertContext.Provider>
        </>
    );
}

export default AlertProvider;