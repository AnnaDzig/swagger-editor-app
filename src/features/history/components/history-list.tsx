import { ArrowRight, FileCode2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import type { RequestAnalytics } from '@/types/history';

type HistoryListProps = {
  history: RequestAnalytics[];
};

type HistoryCardProps = {
  item: RequestAnalytics;
};

function formatDate(timestamp: number) {
  if (!timestamp) {
    return 'Unknown time';
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

function getStatusLabel(status: number) {
  return status === 0 ? 'Network error' : String(status);
}

function getHistoryDetailsRoute(requestId: string) {
  return `${ROUTES.HISTORY}/${encodeURIComponent(requestId)}`;
}

function EmptyHistory() {
  return (
    <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <FileCode2 className="mx-auto size-9 text-primary" aria-hidden="true" />

      <h2 className="mt-4 text-lg font-semibold">No requests yet</h2>

      <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
        You haven&apos;t executed any API requests yet. Open the Swagger
        workspace, load a schema in the Editor, and execute an endpoint in the
        Viewer.
      </p>

      <Button asChild className="mt-5">
        <Link href={ROUTES.MAIN}>Open Editor & Viewer</Link>
      </Button>
    </div>
  );
}

function HistoryCard({ item }: HistoryCardProps) {
  return (
    <article className="rounded-xl border border-border bg-background p-5 shadow-sm transition-colors hover:border-primary/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
              {item.method}
            </span>

            <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">
              {getStatusLabel(item.status)}
            </span>
          </div>

          <p className="mt-3 break-all text-sm font-medium">{item.url}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(item.timestamp)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-left text-xs sm:text-right">
          <div>
            <p className="font-semibold">{item.duration}ms</p>
            <p className="text-muted-foreground">Duration</p>
          </div>

          <div>
            <p className="font-semibold">{formatBytes(item.requestSize)}</p>
            <p className="text-muted-foreground">Request</p>
          </div>

          <div>
            <p className="font-semibold">{formatBytes(item.responseSize)}</p>
            <p className="text-muted-foreground">Response</p>
          </div>
        </div>
      </div>

      {item.errorDetails && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {item.errorDetails}
        </p>
      )}

      <div className="mt-4 flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link href={getHistoryDetailsRoute(item.id)}>
            View analytics
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function HistoryItems({ history }: HistoryListProps) {
  return (
    <div className="mt-8 space-y-4">
      {history.map((item) => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return <EmptyHistory />;
  }

  return <HistoryItems history={history} />;
}
