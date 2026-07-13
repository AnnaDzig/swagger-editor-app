import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from '@/features/auth/server/session-constants';
import { getAdminAuth } from '@/lib/firebase/admin';

export type SessionUser = {
  uid: string;
  email: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedToken = await getAdminAuth().verifySessionCookie(
      sessionCookie,
      true,
    );

    return {
      uid: decodedToken.uid,
      email: decodedToken.email ?? '',
    };
  } catch {
    return null;
  }
}
