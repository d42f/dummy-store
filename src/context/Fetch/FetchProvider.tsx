import { type ReactNode, useState } from 'react';

import { type FetchConfig, FetchContext } from './FetchContext';

export function FetchProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FetchConfig>({ accessToken: null });

  return <FetchContext.Provider value={{ config, setConfig }}>{children}</FetchContext.Provider>;
}
