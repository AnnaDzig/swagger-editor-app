'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseAuth } from '@/lib/firebase/client';
import { useAppStore } from '@/store/app-store';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAppStore((state) => state.setUser);
  const setIsAuthLoading = useAppStore((state) => state.setIsAuthLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsAuthLoading(false);
        return;
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
      });

      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, [setIsAuthLoading, setUser]);

  return <>{children}</>;
}
