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

function mapRequestHistoryDocument(
  id: string,
  data: RequestHistoryDocument,
): RequestAnalytics {
  return {
    id,
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
    responseSize: typeof data.responseSize === 'number' ? data.responseSize : 0,
    errorDetails:
      typeof data.errorDetails === 'string' ? data.errorDetails : undefined,
    timestamp: typeof data.timestamp === 'number' ? data.timestamp : 0,
  };
}

function getUserRequestHistoryCollection(userId: string) {
  return getAdminDb()
    .collection('users')
    .doc(userId)
    .collection('requestHistory');
}

export async function saveRequestHistory(
  userId: string,
  analytics: SaveRequestHistoryInput,
) {
  const historyRef = getUserRequestHistoryCollection(userId);

  const documentReference = await historyRef.add({
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

  return documentReference.id;
}

export async function getRequestHistory(
  userId: string,
): Promise<RequestAnalytics[]> {
  const snapshot = await getUserRequestHistoryCollection(userId)
    .orderBy('timestamp', 'desc')
    .limit(50)
    .get();

  return snapshot.docs.map((documentSnapshot) =>
    mapRequestHistoryDocument(
      documentSnapshot.id,
      documentSnapshot.data() as RequestHistoryDocument,
    ),
  );
}

export async function getRequestHistoryItem(
  userId: string,
  requestId: string,
): Promise<RequestAnalytics | null> {
  const documentSnapshot = await getUserRequestHistoryCollection(userId)
    .doc(requestId)
    .get();

  if (!documentSnapshot.exists) {
    return null;
  }

  return mapRequestHistoryDocument(
    documentSnapshot.id,
    documentSnapshot.data() as RequestHistoryDocument,
  );
}
