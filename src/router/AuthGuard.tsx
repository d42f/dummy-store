import { Outlet } from 'react-router';

import { useAuth } from '@/hooks/useAuth';

export default function AuthGuard() {
  const { isPending } = useAuth();

  return isPending ? null : <Outlet />;
}
