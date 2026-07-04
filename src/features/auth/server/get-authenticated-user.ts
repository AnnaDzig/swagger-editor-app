import { getAdminAuth } from '@/lib/firebase/admin';

export async function getAuthenticatedUserFromRequest(request: Request) {
  const authorizationHeader = request.headers.get('authorization');

  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null;
  }

  const idToken = authorizationHeader.replace('Bearer ', '').trim();

  if (!idToken) {
    return null;
  }

  try {
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);

    return {
      uid: decodedToken.uid,
      email: decodedToken.email ?? '',
    };
  } catch {
    return null;
  }
}
