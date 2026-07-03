import { firebaseAuth } from '@/lib/firebase/client';
import type { ProxyRequestInput } from '@/features/api/schemas/proxy-request-schema';

export async function executeProxyRequest(input: ProxyRequestInput) {
  const idToken = await firebaseAuth.currentUser?.getIdToken();

  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(idToken ? { authorization: `Bearer ${idToken}` } : {}),
    },
    body: JSON.stringify(input),
  });

  return response.json() as Promise<unknown>;
}
