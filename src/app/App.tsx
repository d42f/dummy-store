import { Navigate, Route, Routes } from 'react-router';

import { LoginPage } from '@/pages/login';
import { ProductsPage } from '@/pages/products';
import { RegisterPage } from '@/pages/register';

import { AuthGuard } from './router/AuthGuard';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/PublicRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}
