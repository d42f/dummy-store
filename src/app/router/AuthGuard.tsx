import { Outlet } from 'react-router';

import { useAuth } from '@/app/providers';

export function AuthGuard() {
  const { isPending } = useAuth();

  return isPending ? null : <Outlet />;
}
