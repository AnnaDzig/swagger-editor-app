import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase/admin';
import type { RequestAnalytics } from '@/types/history';

type SaveRequestHistoryInput = Omit<
  RequestAnalytics,
  'id' | 'url' | 'timestamp'
> & {
  endpointUrl: string;
  timestamp: number;
};

export async function saveRequestHistory(
  userId: string,
  analytics: SaveRequestHistoryInput,
) {
  const historyRef = adminDb
    .collection('users')
    .doc(userId)
    .collection('requestHistory');

  await historyRef.add({
    method: analytics.method,
    url: analytics.endpointUrl,
    endpointUrl: analytics.endpointUrl,
    status: analytics.status,
    duration: analytics.duration,
    requestSize: analytics.requestSize,
    responseSize: analytics.responseSize,
    errorDetails: analytics.errorDetails ?? null,
    timestamp: analytics.timestamp,
    createdAt: FieldValue.serverTimestamp(),
  });
}
