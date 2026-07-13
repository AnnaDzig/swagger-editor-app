export default function HistoryLoading() {
  return (
    <main className="px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-9 w-72 rounded bg-muted" />
          <div className="h-4 max-w-xl rounded bg-muted" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-36 rounded-xl border border-border bg-muted/30"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
