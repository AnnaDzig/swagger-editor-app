'use client';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';

import {
  clearServerSession,
  syncServerSession,
} from '@/features/auth/api/auth-client';
import { firebaseAuth } from '@/lib/firebase/client';
import { useAppStore } from '@/store/app-store';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAppStore((state) => state.setUser);
  const setIsAuthLoading = useAppStore((state) => state.setIsAuthLoading);

  useEffect(() => {
    let isActive = true;

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        try {
          if (!firebaseUser) {
            await clearServerSession();

            if (isActive) {
              setUser(null);
            }

            return;
          }

          await syncServerSession(firebaseUser);

          if (isActive) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
            });
          }
        } catch {
          await signOut(firebaseAuth);

          if (isActive) {
            setUser(null);
          }
        } finally {
          if (isActive) {
            setIsAuthLoading(false);
          }
        }
      },
    );

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [setIsAuthLoading, setUser]);

  return <>{children}</>;
}
