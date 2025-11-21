import React, { useState, createContext } from 'react';
import AlertContext from './context/AlertContext';
import PopupAlert from './components/PopupAlert';;
import { useAlert } from './hooks/useAlerts';
import './styles/alert.css';

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const showAlert = (
        varient,
        message,
        isConfirm = false,
        onConfirm = null,
        onCancel = null
    ) => {
        setAlerts(prevAlerts => [
            ...prevAlerts,
            { varient, message, isConfirm, onConfirm, onCancel }
        ]);
    };

    const hideAlert = () => {
        setAlerts(prevAlerts => prevAlerts.slice(1));
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alerts.length > 0 && (
                <PopupAlert {...alerts[0]} onClose={hideAlert} />
            )}
        </AlertContext.Provider>
    );
};

export { useAlert };
export default AlertProvider;
