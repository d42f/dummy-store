import { createContext } from 'react';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isPending: boolean;
  error: string | null;
  login: (arg: {
    username: string;
    password: string;
  }) => Promise<Partial<{ data: AuthUser | null; error: string | null }>>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
