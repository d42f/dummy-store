import { apiFetch } from '@/lib/apiFetch';

import { useAuth } from './useAuth';

export function useApiClient() {
  const { accessToken } = useAuth();
  return <T>(url: string, init?: Pick<RequestInit, 'method' | 'body' | 'headers'>) =>
    apiFetch<T>(url, accessToken, init);
}
