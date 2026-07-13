import { redirect } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { getSessionUser } from '@/features/auth/server/get-session-user';
import { HistoryList } from '@/features/history/components/history-list';
import { getRequestHistory } from '@/features/history/server/history-repository';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect(ROUTES.MAIN);
  }

  const history = await getRequestHistory(user.uid);

  return (
    <main className="px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            History & Analytics
          </p>

          <h1 className="text-3xl font-bold tracking-tight">Request history</h1>

          <p className="max-w-2xl text-muted-foreground">
            Review your executed API requests, response status codes, timing,
            payload sizes, and errors.
          </p>
        </div>

        <HistoryList history={history} />
      </section>
    </main>
  );
}
