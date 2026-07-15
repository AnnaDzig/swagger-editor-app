import { getTranslations } from 'next-intl/server';
import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';
import './globals.css';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound');

  return (
    <main className="relative flex min-h-[calc(100vh-10rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_55%)]"
      />

      <section className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mb-8 flex size-20 items-center justify-center rounded-3xl border border-app-primary/30 bg-app-primary/10 shadow-2xl shadow-app-primary/10">
          <FileQuestion
            className="size-10 text-app-primary"
            aria-hidden="true"
          />
        </div>

        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-app-primary">
          {t('error')}
        </p>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
          {t('title')}
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-slate-400 sm:text-lg">
          {t('description')}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-app-primary font-semibold text-white hover:bg-app-primary-hover"
          >
            <Link href={ROUTES.MAIN} prefetch={false}>
              <Home className="size-4" aria-hidden="true" />
              {t('back')}
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-app-border bg-app-surface text-slate-300 hover:bg-app-surface-hover hover:text-slate-100"
          >
            <Link href={ROUTES.ABOUT}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t('about')}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
