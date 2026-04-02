import { Navigate } from 'react-router';

import MainLayout from '@/app/layouts/MainLayout';
import { useAuth } from '@/app/providers';

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />;
}
