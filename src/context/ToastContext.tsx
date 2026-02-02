import { Toast } from '../components/Toast/Toast';
import { createContext, useContext, useState } from 'react';

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    console.log('SHOW TOAST', msg);
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} visible={visible} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};
