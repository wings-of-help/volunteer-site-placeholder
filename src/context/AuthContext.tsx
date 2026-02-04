import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginRequest } from '../api/auth.api';

type AuthContextType = {
  isAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuth');
    if (savedAuth === 'true') {
      setIsAuth(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const tokens = await loginRequest(email, password);

    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);

    setIsAuth(true);
    localStorage.setItem('isAuth', 'true');
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
