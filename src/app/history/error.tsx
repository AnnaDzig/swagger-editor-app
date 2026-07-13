'use client';

import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

type HistoryErrorProps = {
  reset: () => void;
};

export default function HistoryError({ reset }: HistoryErrorProps) {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-10">
      <section
        role="alert"
        className="w-full max-w-xl rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center"
      >
        <h1 className="text-xl font-bold">Could not load request history</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected server error occurred while loading your analytics.
          Please try again.
        </p>

        <Button type="button" onClick={reset} className="mt-5">
          <RotateCcw className="size-4" aria-hidden="true" />
          Try again
        </Button>
      </section>
    </main>
  );
}
