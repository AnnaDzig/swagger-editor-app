import { PrivateRouteGuard } from '@/features/auth/components/private-route-guard';

export default function HistoryPage() {
  return (
    <PrivateRouteGuard>
      <main className="px-6 py-10">
        <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              History & Analytics
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Request history
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Your executed API requests and analytics will appear here after
              you use Try It Out in the Swagger Viewer.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
            <h2 className="text-lg font-semibold">No requests yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven&apos;t executed any API requests yet. Go back to the
              editor, load a schema, and try an endpoint.
            </p>
          </div>
        </section>
      </main>
    </PrivateRouteGuard>
  );
}
