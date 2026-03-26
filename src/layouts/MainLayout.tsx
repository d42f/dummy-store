import { Outlet } from 'react-router';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-base font-semibold">Dummy Store</span>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-500">
                {user.firstName} {user.lastName}
              </span>
            )}
            <Button variant="secondary" size="sm" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
