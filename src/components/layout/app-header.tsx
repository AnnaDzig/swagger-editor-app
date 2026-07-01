import { FileCode2, History, LogIn, LogOut, Zap } from 'lucide-react';
import Link from 'next/link';
import {
  authenticatedNavigationItems,
  guestNavigationItems,
  publicNavigationItems,
} from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

export function AppHeader() {
  const isAuthenticated = false;
  const authNavigationItems = isAuthenticated
    ? authenticatedNavigationItems
    : guestNavigationItems;

  const navigationItems = [...publicNavigationItems, ...authNavigationItems];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className="flex min-h-20 items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <Link
            href={ROUTES.MAIN}
            className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <Zap className="size-6 fill-current" aria-hidden="true" />
            </span>

            <span className="text-xl font-bold tracking-tight">ApiFlux</span>
          </Link>

          <div className="hidden items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm shadow-sm md:flex">
            <FileCode2 className="size-4 text-indigo-400" aria-hidden="true" />
            <span className="font-semibold text-slate-200">payments-api</span>
            <span className="text-slate-600">·</span>
            <span className="font-medium text-indigo-400">yaml</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden rounded-xl border border-slate-800 bg-slate-900 p-1 md:flex"
            aria-label="Schema format"
          >
            <button
              type="button"
              className="rounded-lg bg-indigo-500 px-5 py-2 text-sm font-bold text-white shadow-sm"
            >
              YAML
            </button>
            <button
              type="button"
              className="rounded-lg px-5 py-2 text-sm font-bold text-slate-500"
            >
              JSON
            </button>
          </div>

          <nav
            aria-label="Main navigation"
            className="flex items-center gap-3 text-sm"
          >
            {navigationItems.map((item) => {
              const isHistoryLink = item.href === ROUTES.HISTORY;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 font-semibold text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {isHistoryLink && (
                    <History className="size-4" aria-hidden="true" />
                  )}

                  {!isHistoryLink &&
                    (item.href === ROUTES.SIGN_IN ||
                      item.href === ROUTES.SIGN_UP) && (
                      <LogIn className="size-4" aria-hidden="true" />
                    )}

                  {item.label}
                </Link>
              );
            })}

            {isAuthenticated && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 font-semibold text-slate-400 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
