import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '@/lib/apiFetch';

import { AuthContext, type AuthUser } from './AuthContext';

const STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY as string;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

function loadToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(loadToken);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: user,
  } = useQuery({
    queryKey: ['auth/me', accessToken],
    queryFn: () => apiFetch<AuthUser>(`${API_BASE_URL}/auth/me`, accessToken!),
    enabled: !!accessToken,
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      apiFetch<LoginResponse>(`${API_BASE_URL}/auth/login`, null, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
    onSuccess: data => {
      localStorage.setItem(STORAGE_KEY, data.accessToken);
      setAccessToken(data.accessToken);
      setLoginError(null);
    },
    onError: (err: Error) => {
      setLoginError(err.message);
    },
  });

  const login = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      setLoginError(null);
      try {
        await loginMutation.mutateAsync({ username, password });
      } catch {
        // error is handled in onError
      }
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAccessToken(null);
    queryClient.removeQueries({ queryKey: ['auth/me'] });
  }, [queryClient]);

  useEffect(() => {
    if (isUserError) localStorage.removeItem(STORAGE_KEY);
  }, [isUserError]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        accessToken,
        isPending: accessToken ? isUserPending : false,
        isAuthenticated: !!accessToken && !!user && !isUserError,
        error: loginError,
        login,
        logout,
        clearError: () => setLoginError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
