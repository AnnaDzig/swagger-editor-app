import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { getTranslations } from 'next-intl/server';

export async function AppFooter() {
  const t = await getTranslations('Footer');

  return (
    <footer className="border-t border-slate-800 bg-app-background px-4 py-6 text-slate-500 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm sm:flex-row sm:text-left">
        <p>
          {t('buildStart')}
          <span aria-hidden="true">♥</span>
          {t('buildEnd')}
        </p>

        <nav aria-label="Footer navigation">
          <Link
            href={ROUTES.ABOUT}
            className="rounded-md transition-colors hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
          >
            {t('about')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
