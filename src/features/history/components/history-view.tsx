'use client';

import { useEffect, useState } from 'react';
import { getCurrentUserHistory } from '@/features/history/api/history-client';
import { HistoryList } from '@/features/history/components/history-list';
import type { RequestAnalytics } from '@/types/history';

export function HistoryView() {
  const [history, setHistory] = useState<RequestAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHistory() {
      try {
        const items = await getCurrentUserHistory();

        if (isMounted) {
          setHistory(items);
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Could not load request history.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Loading request history...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        role="alert"
        className="mt-8 rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center text-sm text-destructive"
      >
        {errorMessage}
      </div>
    );
  }

  return <HistoryList history={history} />;
}
