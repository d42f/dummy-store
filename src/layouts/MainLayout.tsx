import { Outlet } from 'react-router';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
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

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
