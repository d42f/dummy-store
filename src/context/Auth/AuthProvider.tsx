import { useCallback, useContext, useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import { FetchContext } from '../Fetch';
import { AuthContext, type AuthUser } from './AuthContext';

const STORAGE_KEY = 'accessToken';

interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

function loadTokenFromStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { config, setConfig } = useContext(FetchContext)!;
  const [fetchInitialized, setFetchInitialized] = useState(false);

  const [accessToken, setAccessToken] = useState<string | null>(loadTokenFromStorage);
  const [user, setUser] = useState<AuthUser | null>(null);

  const { isPending: isUserPending, execute: userExecute } = useFetch<AuthUser>('https://dummyjson.com/auth/me', {
    skip: true,
  });

  const {
    isPending: isLoginPending,
    error,
    execute: loginExecute,
    clearError,
  } = useFetch<LoginResponse>('https://dummyjson.com/auth/login', { skip: true });

  async function login({ username, password }: { username: string; password: string }) {
    const { data, error } = await loginExecute({
      method: 'POST',
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    });

    if (data) {
      setConfig({ accessToken: data.accessToken });
      localStorage.setItem(STORAGE_KEY, data.accessToken);
      setAccessToken(data.accessToken);
      setUser(data);
    }

    return { data, error };
  }

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAccessToken(null);
    setConfig({ accessToken: null });
  }, [setConfig]);

  useEffect(() => {
    if (config.accessToken) {
      userExecute().then(({ data }) => {
        if (data) {
          setUser(data);
        } else {
          logout();
        }
      });
    }
  }, [config.accessToken, userExecute, logout]);

  useEffect(() => {
    if (!fetchInitialized) {
      setTimeout(() => setFetchInitialized(true), 10);
      if (accessToken) {
        setConfig({ accessToken });
      }
    }
  }, [fetchInitialized, accessToken, setConfig]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        accessToken,
        isPending: !fetchInitialized || isUserPending || isLoginPending,
        isAuthenticated: !!accessToken && !!user,
        error,
        logout,
        login,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
