'use client';

import { FileCode2, History, LogIn, LogOut, Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  authenticatedNavigationItems,
  guestNavigationItems,
  publicNavigationItems,
  type NavigationItem,
} from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { signOutUser } from '@/features/auth/api/auth-client';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';

function NavigationIcon({ href }: Pick<NavigationItem, 'href'>) {
  if (href === ROUTES.HISTORY) {
    return <History className="size-4" aria-hidden="true" />;
  }

  if (href === ROUTES.SIGN_IN || href === ROUTES.SIGN_UP) {
    return <LogIn className="size-4" aria-hidden="true" />;
  }

  return null;
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAppStore((state) => state.user);
  const isAuthLoading = useAppStore((state) => state.isAuthLoading);
  const setUser = useAppStore((state) => state.setUser);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const isAuthenticated = Boolean(user);

  const authNavigationItems = isAuthenticated
    ? authenticatedNavigationItems
    : guestNavigationItems;

  const navigationItems = [
    ...publicNavigationItems,
    ...(isAuthLoading ? [] : authNavigationItems),
  ];

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  }

  async function handleSignOut() {
    setSignOutError(null);
    setIsSigningOut(true);

    try {
      await signOutUser();
      setUser(null);
      closeMobileMenu();
      router.push(ROUTES.MAIN);
    } catch {
      setSignOutError('Could not sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-app-border bg-app-background text-slate-100">
      <div className="flex min-h-16 min-w-0 items-center justify-between gap-3 px-4 sm:min-h-20 sm:px-6">
        <div className="flex min-w-0 items-center gap-4 lg:gap-8">
          <Link
            href={ROUTES.MAIN}
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-2 focus-visible:ring-offset-app-background"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-app-primary text-white shadow-lg shadow-app-primary/20 sm:size-11 sm:rounded-2xl">
              <Zap
                className="size-5 fill-current sm:size-6"
                aria-hidden="true"
              />
            </span>

            <span className="hidden text-xl font-bold tracking-tight min-[390px]:inline">
              ApiFlux
            </span>
          </Link>

          <div className="hidden min-w-0 items-center gap-3 rounded-xl border border-app-border bg-app-surface px-4 py-2 text-sm shadow-sm lg:flex">
            <FileCode2
              className="size-4 shrink-0 text-app-primary"
              aria-hidden="true"
            />

            <span className="truncate font-semibold text-slate-200">
              payments-api
            </span>

            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>

            <span className="shrink-0 font-medium text-app-primary">yaml</span>
          </div>
        </div>

        <div className="hidden min-w-0 items-center justify-end gap-3 md:flex">
          <div
            className="hidden shrink-0 rounded-xl border border-app-border bg-app-surface p-1 xl:flex"
            aria-label="Schema format"
          >
            <Button
              type="button"
              size="lg"
              aria-pressed="true"
              className="h-9 rounded-lg bg-app-primary px-5 font-bold text-white shadow-sm hover:bg-app-primary-hover"
            >
              YAML
            </Button>

            <Button
              type="button"
              size="lg"
              variant="ghost"
              aria-pressed="false"
              className="h-9 rounded-lg px-5 font-bold text-slate-500 hover:bg-app-surface-hover hover:text-slate-200"
            >
              JSON
            </Button>
          </div>

          <nav
            aria-label="Main navigation"
            className="flex min-w-0 items-center justify-end gap-2 text-sm"
          >
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.href}
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    'border-app-border bg-app-background px-4 text-slate-400 hover:border-app-primary/50 hover:bg-app-surface-hover hover:text-slate-100',
                    isActive &&
                      'border-app-primary/50 bg-app-surface text-slate-100',
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <NavigationIcon href={item.href} />
                    {item.label}
                  </Link>
                </Button>
              );
            })}

            {isAuthenticated && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isSigningOut}
                onClick={handleSignOut}
                className="border-app-border bg-app-background px-4 text-slate-400 hover:border-app-primary/50 hover:bg-app-surface-hover hover:text-slate-100"
              >
                <LogOut className="size-4" aria-hidden="true" />
                {isSigningOut ? 'Signing Out…' : 'Sign Out'}
              </Button>
            )}
          </nav>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label={
            isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={toggleMobileMenu}
          className="shrink-0 border-app-border bg-app-background text-slate-300 hover:bg-app-surface-hover hover:text-slate-100 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-app-border bg-app-background px-4 py-4 md:hidden"
        >
          <div className="mb-3 flex min-w-0 items-center gap-3 rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm">
            <FileCode2
              className="size-4 shrink-0 text-app-primary"
              aria-hidden="true"
            />

            <span className="min-w-0 truncate font-semibold text-slate-200">
              payments-api
            </span>

            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>

            <span className="shrink-0 font-medium text-app-primary">yaml</span>
          </div>

          <div
            className="mb-4 grid grid-cols-2 rounded-xl border border-app-border bg-app-surface p-1"
            aria-label="Schema format"
          >
            <Button
              type="button"
              size="lg"
              aria-pressed="true"
              className="h-10 rounded-lg bg-app-primary font-bold text-white shadow-sm hover:bg-app-primary-hover"
            >
              YAML
            </Button>

            <Button
              type="button"
              size="lg"
              variant="ghost"
              aria-pressed="false"
              className="h-10 rounded-lg font-bold text-slate-500 hover:bg-app-surface-hover hover:text-slate-200"
            >
              JSON
            </Button>
          </div>

          <nav aria-label="Mobile navigation" className="grid gap-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.href}
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    'h-11 w-full justify-start border-app-border bg-app-background px-4 text-slate-300 hover:border-app-primary/50 hover:bg-app-surface-hover hover:text-slate-100',
                    isActive &&
                      'border-app-primary/50 bg-app-surface text-slate-100',
                  )}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <NavigationIcon href={item.href} />
                    {item.label}
                  </Link>
                </Button>
              );
            })}

            {isAuthenticated && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isSigningOut}
                onClick={handleSignOut}
                className="h-11 w-full justify-start border-app-border bg-app-background px-4 text-slate-300 hover:border-app-primary/50 hover:bg-app-surface-hover hover:text-slate-100"
              >
                <LogOut className="size-4" aria-hidden="true" />
                {isSigningOut ? 'Signing Out…' : 'Sign Out'}
              </Button>
            )}
          </nav>

          {signOutError && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-app-error/30 bg-app-error/10 px-3 py-2 text-sm text-app-error"
            >
              {signOutError}
            </p>
          )}
        </div>
      )}

      {signOutError && !isMobileMenuOpen && (
        <p role="alert" className="sr-only">
          {signOutError}
        </p>
      )}
    </header>
  );
}
