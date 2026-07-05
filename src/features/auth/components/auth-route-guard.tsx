'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { useAppStore } from '@/store/app-store';

type AuthRouteGuardProps = {
  children: React.ReactNode;
};

export function AuthRouteGuard({ children }: AuthRouteGuardProps) {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const isAuthLoading = useAppStore((state) => state.isAuthLoading);

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace(ROUTES.MAIN);
    }
  }, [isAuthLoading, router, user]);

  if (isAuthLoading) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
        Checking authentication...
      </div>
    );
  }

  if (user) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}
