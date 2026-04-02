import { Navigate } from 'react-router';

import { useAuth } from '@/context/useAuth';
import PublicLayout from '@/layouts/PublicLayout';

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/products" replace /> : <PublicLayout />;
}
