import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/apiUrl';

import { AuthContext, type User } from './AuthContext';

const STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY as string;

interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

function saveToken(token: string, persistent: boolean): void {
  if (persistent) {
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    sessionStorage.setItem(STORAGE_KEY, token);
  }
}

function loadToken(): string | null {
  return localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
}

function removeToken(): void {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
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
    queryFn: () => apiFetch<User>(apiUrl('/auth/me'), accessToken!),
    enabled: !!accessToken,
    retry: false,
    staleTime: Infinity,
  });

  const registerMutation = useMutation({
    mutationFn: (values: { firstName: string; lastName: string; username: string; email: string; password: string }) =>
      apiFetch<AuthResponse>(apiUrl('/users/add'), null, {
        method: 'POST',
        body: JSON.stringify(values),
      }),
    onSuccess: data => {
      saveToken(data.accessToken, false);
      setAccessToken(data.accessToken);
      setLoginError(null);
    },
    onError: (err: Error) => {
      setLoginError(err.message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string; rememberMe: boolean }) =>
      apiFetch<AuthResponse>(apiUrl('/auth/login'), null, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
    onSuccess: (data, { rememberMe }) => {
      saveToken(data.accessToken, rememberMe);
      setAccessToken(data.accessToken);
      setLoginError(null);
    },
    onError: (err: Error) => {
      setLoginError(err.message);
    },
  });

  const register = useCallback(
    async (values: { firstName: string; lastName: string; username: string; email: string; password: string }) => {
      setLoginError(null);
      try {
        await registerMutation.mutateAsync(values);
      } catch {
        // error is handled in onError
      }
    },
    [registerMutation],
  );

  const login = useCallback(
    async ({ username, password, rememberMe }: { username: string; password: string; rememberMe: boolean }) => {
      setLoginError(null);
      try {
        await loginMutation.mutateAsync({ username, password, rememberMe });
      } catch {
        // error is handled in onError
      }
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    removeToken();
    setAccessToken(null);
    queryClient.removeQueries({ queryKey: ['auth/me'] });
  }, [queryClient]);

  useEffect(() => {
    if (isUserError) removeToken();
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
        register,
        logout,
        clearError: () => setLoginError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
