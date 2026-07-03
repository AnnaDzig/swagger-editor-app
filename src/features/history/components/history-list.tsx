import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import type { RequestAnalytics } from '@/types/history';

type HistoryListProps = {
  history: RequestAnalytics[];
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

export function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h2 className="text-lg font-semibold">No requests yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven&apos;t executed any API requests yet. Go back to the editor,
          load a schema, and try an endpoint.
        </p>
        <Link
          href={ROUTES.MAIN}
          className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Go to editor
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {history.map((item) => (
        <article
          key={item.id}
          className="rounded-xl border border-border bg-background p-5 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                  {item.method}
                </span>
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">
                  {item.status}
                </span>
              </div>

              <p className="mt-3 break-all text-sm font-medium">{item.url}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(item.timestamp)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-right text-xs">
              <div>
                <p className="font-semibold">{item.duration}ms</p>
                <p className="text-muted-foreground">Duration</p>
              </div>
              <div>
                <p className="font-semibold">{formatBytes(item.requestSize)}</p>
                <p className="text-muted-foreground">Request</p>
              </div>
              <div>
                <p className="font-semibold">
                  {formatBytes(item.responseSize)}
                </p>
                <p className="text-muted-foreground">Response</p>
              </div>
            </div>
          </div>

          {item.errorDetails && (
            <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {item.errorDetails}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
