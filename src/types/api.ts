import type { RequestAnalytics } from '@/types/history';

export interface ProxyRequestBody {
  endpointUrl: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}

export interface ProxyResponse {
  data: unknown;
  status: number;
  headers: Record<string, string>;
  analytics: Omit<RequestAnalytics, 'id' | 'timestamp'>;
}
