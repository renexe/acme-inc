'use client';
import { createContext, useEffect, useRef, useState } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertContextProps {
  alertOpen: boolean;
  message: string;
  type: AlertType;
  handleAlertState: () => void;
  registerAlert: (message: string, type: AlertType) => void;
}

interface AlertContextProviderProps {
  children: React.ReactNode
}

const INITIAL_STATE: AlertContextProps = {
  alertOpen: false,
  message: '',
  type: 'success',
  handleAlertState: () => { },
  registerAlert: () => {},
}

export const AlertContext = createContext<AlertContextProps>(INITIAL_STATE);

export function AlertContextProvider({ children }: AlertContextProviderProps) {
  const [alertOpen, setAlertOpen] = useState<boolean>(INITIAL_STATE.alertOpen);
  const [type, setType] = useState<AlertType>(INITIAL_STATE.type);
  const [message, setMessage] = useState<string>(INITIAL_STATE.message);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleAlertState = () => {
    setAlertOpen(!alertOpen);
  }

  const handleRegisterAlert = (message: string, type: AlertType) => {
    setMessage(message);
    setType(type);
    setAlertOpen(true);
  }

  useEffect(() => {
    if (alertOpen) {
      timeoutRef.current = setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [alertOpen]);

  return (
    <AlertContext.Provider value={{
      alertOpen,
      message,
      type,
      handleAlertState,
      registerAlert: handleRegisterAlert,
    }}>
      {children}
    </AlertContext.Provider>
  );
}