import { firebaseAuth } from '@/lib/firebase/client';
import type { RequestAnalytics } from '@/types/history';

type HistoryResponse = {
  history: RequestAnalytics[];
};

export async function getCurrentUserHistory() {
  const idToken = await firebaseAuth.currentUser?.getIdToken();

  if (!idToken) {
    throw new Error('Unauthorized');
  }

  const response = await fetch('/api/history', {
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load history.');
  }

  const data = (await response.json()) as HistoryResponse;

  return data.history;
}
