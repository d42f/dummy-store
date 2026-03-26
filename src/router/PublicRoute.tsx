import { Navigate } from 'react-router';

import { useAuth } from '@/hooks/useAuth';
import PublicLayout from '@/layouts/PublicLayout';

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/products" replace /> : <PublicLayout />;
}
