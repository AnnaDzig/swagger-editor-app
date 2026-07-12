import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

export function AppFooter() {
  return (
    <footer className="border-t border-slate-800 bg-app-background px-4 py-6 text-slate-500 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm sm:flex-row sm:text-left">
        <p>
          Built with <span aria-hidden="true">♥</span> by RS School students ·
          2026
        </p>

        <nav aria-label="Footer navigation">
          <Link
            href={ROUTES.ABOUT}
            className="rounded-md transition-colors hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
          >
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
