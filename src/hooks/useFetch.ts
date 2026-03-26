import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { FetchContext } from '@/context/Fetch';

interface FetchState<T> {
  data: T | null;
  isPending: boolean;
  error: string | null;
}

interface UseFetchOptions {
  skip?: boolean;
}

interface UseFetchResult<T> extends FetchState<T> {
  execute: (
    arg?: Pick<RequestInit, 'method' | 'body' | 'headers'>,
  ) => Promise<Partial<Pick<FetchState<T>, 'data' | 'error'>>>;
  clearError: () => void;
}

async function doFetch<T>({
  url,
  accessToken,
  signal,
  headers,
  ...init
}: {
  url: string;
  accessToken: string | null | undefined;
  signal: AbortSignal;
} & Parameters<UseFetchResult<T>['execute']>[0]): Promise<T> {
  const res = await fetch(url, {
    ...init,
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function useFetch<T>(url: string, options?: UseFetchOptions): UseFetchResult<T> {
  const { config } = useContext(FetchContext)!;
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isPending: options?.skip !== true,
    error: null,
  });
  const isPendingRef = useRef(state.isPending);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (options?.skip) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState(prev => ({ ...prev, isPending: true }));
    isPendingRef.current = true;
    doFetch<T>({ url, accessToken: config.accessToken, signal: abortRef.current.signal })
      .then(data => {
        setState({ data, isPending: false, error: null });
        isPendingRef.current = false;
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setState({ data: null, isPending: false, error: err.message });
        isPendingRef.current = false;
      });

    return () => abortRef.current?.abort();
  }, [url, options?.skip, config.accessToken]);

  const execute = useCallback(
    async (arg: Parameters<UseFetchResult<T>['execute']>[0]): ReturnType<UseFetchResult<T>['execute']> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState(prev => ({ ...prev, isPending: true, error: null }));
      isPendingRef.current = true;

      try {
        const data = await doFetch<T>({
          url,
          ...arg,
          accessToken: config.accessToken,
          signal: controller.signal,
        });
        setState({ data, isPending: false, error: null });
        isPendingRef.current = false;
        return { data };
      } catch (err) {
        if ((err as Error).name === 'AbortError') return { error: 'Request aborted' };
        const error = (err as Error).message || 'Unknown error';
        setState({ data: null, isPending: false, error });
        isPendingRef.current = false;
        return { error };
      }
    },
    [url, config],
  );

  function clearError() {
    setState(prev => ({ ...prev, error: null }));
  }

  // eslint-disable-next-line react-hooks/refs
  return { ...state, isPending: state.isPending || isPendingRef.current, execute, clearError };
}
