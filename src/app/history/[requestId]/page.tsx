import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { getSessionUser } from '@/features/auth/server/get-session-user';
import { getRequestHistoryItem } from '@/features/history/server/history-repository';

type RequestHistoryDetailsPageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

function formatDate(timestamp: number) {
  if (!timestamp) {
    return 'Unknown time';
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(new Date(timestamp));
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

export const dynamic = 'force-dynamic';

export default async function RequestHistoryDetailsPage({
  params,
}: RequestHistoryDetailsPageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  const { requestId } = await params;
  const historyItem = await getRequestHistoryItem(user.uid, requestId);

  if (!historyItem) {
    notFound();
  }

  const analytics = [
    {
      label: 'Method',
      value: historyItem.method,
    },
    {
      label: 'Status code',
      value:
        historyItem.status === 0 ? 'Network error' : String(historyItem.status),
    },
    {
      label: 'Duration',
      value: `${historyItem.duration}ms`,
    },
    {
      label: 'Request size',
      value: formatBytes(historyItem.requestSize),
    },
    {
      label: 'Response size',
      value: formatBytes(historyItem.responseSize),
    },
    {
      label: 'Timestamp',
      value: formatDate(historyItem.timestamp),
    },
  ];

  return (
    <main className="px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <Button asChild variant="ghost" className="-ml-3">
          <Link href={ROUTES.HISTORY}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to history
          </Link>
        </Button>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Request analytics
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Request details
          </h1>

          <p className="mt-3 break-all rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm">
            {historyItem.url}
          </p>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {analytics.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-background p-4"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {item.label}
              </dt>

              <dd className="mt-2 break-words text-sm font-semibold">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {historyItem.errorDetails && (
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <h2 className="font-semibold text-destructive">Error details</h2>

            <p className="mt-2 break-words text-sm text-destructive">
              {historyItem.errorDetails}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
