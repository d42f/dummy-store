import { Navigate } from 'react-router';

import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />;
}
