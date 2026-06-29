export interface RequestAnalytics {
  id: string;
  timestamp: number;
  method: string;
  url: string;
  status: number;
  duration: number;
  requestSize: number;
  responseSize: number;
  errorDetails?: string;
}
