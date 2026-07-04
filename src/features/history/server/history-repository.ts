import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase/admin';
import type { RequestAnalytics } from '@/types/history';

type SaveRequestHistoryInput = Omit<
  RequestAnalytics,
  'id' | 'url' | 'timestamp'
> & {
  endpointUrl: string;
  timestamp: number;
};

type RequestHistoryDocument = {
  method?: unknown;
  url?: unknown;
  endpointUrl?: unknown;
  status?: unknown;
  duration?: unknown;
  requestSize?: unknown;
  responseSize?: unknown;
  errorDetails?: unknown;
  timestamp?: unknown;
};

export async function saveRequestHistory(
  userId: string,
  analytics: SaveRequestHistoryInput,
) {
  const historyRef = getAdminDb()
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

export async function getRequestHistory(userId: string) {
  const snapshot = await getAdminDb()
    .collection('users')
    .doc(userId)
    .collection('requestHistory')
    .orderBy('timestamp', 'desc')
    .limit(50)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as RequestHistoryDocument;

    return {
      id: doc.id,
      method: typeof data.method === 'string' ? data.method : 'UNKNOWN',
      url:
        typeof data.url === 'string'
          ? data.url
          : typeof data.endpointUrl === 'string'
            ? data.endpointUrl
            : 'Unknown URL',
      status: typeof data.status === 'number' ? data.status : 0,
      duration: typeof data.duration === 'number' ? data.duration : 0,
      requestSize: typeof data.requestSize === 'number' ? data.requestSize : 0,
      responseSize:
        typeof data.responseSize === 'number' ? data.responseSize : 0,
      errorDetails:
        typeof data.errorDetails === 'string' ? data.errorDetails : undefined,
      timestamp: typeof data.timestamp === 'number' ? data.timestamp : 0,
    } satisfies RequestAnalytics;
  });
}
