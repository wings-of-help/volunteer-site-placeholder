import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { loginRequest } from '../api/auth.api';
import { getMyProfileRequest } from '../api/user.api';
import type { User } from '../api/types/auth';
import { refreshTokenRequest } from '../api/auth.api';
import { logoutRequest } from '../api/auth.api';

type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getMyProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = Boolean(user);

  const getMyProfile = async () => {
    try {
      const profile = await getMyProfileRequest();
      setUser(profile);
    } catch (error: any) {
      if (error.status === 401) {
        try {
          await refreshTokenRequest();
          const profile = await getMyProfileRequest();
          setUser(profile);
        } catch {
          logout();
        }
      } else {
        logout();
      }
    }
  };

  const login = async (email: string, password: string) => {
    const tokens = await loginRequest(email, password);

    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
    setIsLoading(true);
    await getMyProfile();
    setIsLoading(false);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.warn('Logout request failed', e);
    } finally {
       setUser(null);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  };

  useEffect(() => {
    setIsLoading(true)
    const initAuth = async () => {
      try {
        const access = localStorage.getItem('access');

        if (!access) {
          return;
        }

        await getMyProfile();
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, user, isLoading, login, logout, getMyProfile }}
    >
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
