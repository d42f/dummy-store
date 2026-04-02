import { createContext } from 'react';

import type { User } from '@/entities/user';

export type { User };

export interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isPending: boolean;
  error: string | null;
  login: (arg: Pick<User, 'username'> & { password: string; rememberMe: boolean }) => Promise<void>;
  register: (arg: Pick<User, 'firstName' | 'lastName' | 'username' | 'email'> & { password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
