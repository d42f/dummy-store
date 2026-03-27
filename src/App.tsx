import { Navigate, Route, Routes } from 'react-router';

import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { AuthGuard } from './router/AuthGuard';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/PublicRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}
