import { Outlet } from 'react-router';

import { useAuth } from '@/context/useAuth';

export function AuthGuard() {
  const { isPending } = useAuth();

  return isPending ? null : <Outlet />;
}
