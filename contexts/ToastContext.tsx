import { Toast, ToastType } from '@/components/ui/Toast';
import React, { createContext, useContext, useState } from 'react';

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastState {
  visible: boolean;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    duration: 4000,
  });

  const showToast = (type: ToastType, title: string, message?: string, duration: number = 4000) => {
    setToast({
      visible: true,
      type,
      title,
      message,
      duration,
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const value: ToastContextType = {
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        duration={toast.duration}
        visible={toast.visible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
} 