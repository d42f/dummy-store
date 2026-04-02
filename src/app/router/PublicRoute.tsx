import { Navigate } from 'react-router';

import PublicLayout from '@/app/layouts/PublicLayout';
import { useAuth } from '@/app/providers';

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/products" replace /> : <PublicLayout />;
}
