'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { useAppStore } from '@/store/app-store';

type PrivateRouteGuardProps = {
  children: React.ReactNode;
};

export function PrivateRouteGuard({ children }: PrivateRouteGuardProps) {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const isAuthLoading = useAppStore((state) => state.isAuthLoading);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace(ROUTES.MAIN);
    }
  }, [isAuthLoading, router, user]);

  if (isAuthLoading) {
    return (
      <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-10">
        <div className="rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
          Checking authentication...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-10">
        <div className="rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
          Redirecting...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
