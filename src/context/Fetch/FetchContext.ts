import { createContext } from 'react';

export interface FetchConfig {
  accessToken: string | null;
}

export interface FetchContextValue {
  config: FetchConfig;
  setConfig: (arg: FetchConfig) => void;
}

export const FetchContext = createContext<FetchContextValue | null>(null);
