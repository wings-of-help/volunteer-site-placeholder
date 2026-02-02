import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { RegisterRequest } from '../api/types/auth';
import type { BackendErrors } from '../api/types/auth';

type SignUpContextType = {
  data: RegisterRequest;
  backendErrors: BackendErrors;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: 'distressed' | 'volunteer') => void;

  setBackendErrors: (errors: BackendErrors) => void;
  clearBackendError: (field: keyof RegisterRequest) => void;

  reset: () => void;
};

const initialData: RegisterRequest = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  role: 'distressed',
};

const SignUpContext = createContext<SignUpContextType | null>(null);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<RegisterRequest>(initialData);
  const [backendErrors, setBackendErrors] = useState<BackendErrors>({});

  const setFirstName = (value: string) => {
    setData((prev) => ({ ...prev, first_name: value }));
  };

  const setLastName = (value: string) => {
    setData((prev) => ({ ...prev, last_name: value }));
  };

  const setEmail = (value: string) => {
    setData((prev) => ({ ...prev, email: value }));
    clearBackendError('email');
  };

  const setPhone = (value: string) => {
    setData((prev) => ({ ...prev, phone_number: value }));
    clearBackendError('phone_number');
  };

  const setPassword = (value: string) => {
    setData((prev) => ({ ...prev, password: value }));
    clearBackendError('password');
  };

  const setRole = (value: 'distressed' | 'volunteer') => {
    setData((prev) => ({ ...prev, role: value }));
  };

  const clearBackendError = (field: keyof RegisterRequest) => {
    setBackendErrors((prev) => {
      if (!prev[field]) return prev;

      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const reset = () => {
    setData(initialData);
    setBackendErrors({});
  };

  return (
    <SignUpContext.Provider
      value={{
        data,
        backendErrors,
        setFirstName,
        setLastName,
        setEmail,
        setPhone,
        setPassword,
        setRole,
        setBackendErrors,
        clearBackendError,
        reset,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within SignUpProvider');
  }
  return context;
};
