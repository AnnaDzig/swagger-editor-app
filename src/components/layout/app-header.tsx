'use client';

import {
  FileCode2,
  History,
  Home,
  LogIn,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from '@/i18n/routing';
import { useEffect, useState } from 'react';

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
import { toast } from 'sonner';
import LanguageToggle from '@/app/LanguageToggle';
import { useTranslations } from 'next-intl';

function NavigationIcon({ href }: Pick<NavigationItem, 'href'>) {
  if (href === ROUTES.MAIN) {
    return <Home className="size-4" aria-hidden="true" />;
  }

  if (href === ROUTES.HISTORY) {
    return <History className="size-4" aria-hidden="true" />;
  }

  if (href === ROUTES.SIGN_IN || href === ROUTES.SIGN_UP) {
    return <LogIn className="size-4" aria-hidden="true" />;
  }

  return null;
}

export function AppHeader() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();

  const user = useAppStore((state) => state.user);
  const isAuthLoading = useAppStore((state) => state.isAuthLoading);
  const setUser = useAppStore((state) => state.setUser);
  const format = useAppStore((state) => state.schema.format);

  const [isScrolled, setIsScrolled] = useState(false);
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

  const mobileNavigationItems: NavigationItem[] = [
    {
      label: 'Home',
      href: ROUTES.MAIN,
    },
    ...navigationItems,
  ];

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 768px)');

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    }

    desktopMediaQuery.addEventListener('change', handleDesktopChange);

    return () => {
      desktopMediaQuery.removeEventListener('change', handleDesktopChange);
    };
  }, []);

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
      toast.error('Failed to sign out.');
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b text-slate-100 backdrop-blur-md transition-all duration-300 ease-out',
        isScrolled
          ? [
              'border-app-primary/30',
              'bg-app-background/90',
              'shadow-xl shadow-black/30',
            ]
          : ['border-app-border', 'bg-app-background', 'shadow-none'],
      )}
    >
      <div
        className={cn(
          'flex min-w-0 items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6',
          isScrolled ? 'min-h-14' : 'min-h-20',
        )}
      >
        <div className="flex min-w-0 items-center gap-4 lg:gap-8">
          <Link
            href={ROUTES.MAIN}
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-2 focus-visible:ring-offset-app-background"
          >
            <span
              className={cn(
                'flex items-center justify-center rounded-xl bg-app-primary text-white shadow-lg shadow-app-primary/20 transition-all duration-300',
                isScrolled ? 'size-9' : 'size-11 sm:rounded-2xl',
              )}
            >
              <Zap
                className="size-5 fill-current sm:size-6"
                aria-hidden="true"
              />
            </span>

            <span
              className={cn(
                'hidden font-bold tracking-tight transition-all duration-300 min-[390px]:inline',
                isScrolled ? 'text-lg' : 'text-xl',
              )}
            >
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

            <span className="shrink-0 font-medium text-app-primary">
              {format}
            </span>
          </div>
        </div>

        <div className="hidden min-w-0 items-center justify-end gap-3 md:flex">
          <nav
            aria-label="Main navigation"
            className="flex min-w-0 items-center justify-end gap-2 text-sm"
          >
            <LanguageToggle />
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              console.log(item);

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

                    {t(item.label)}
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
                {isSigningOut ? t('signingOut') : t('signOut')}
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
          className={cn(
            'shrink-0 border-app-border text-slate-300 transition-all duration-300 hover:bg-app-surface-hover hover:text-slate-100 md:hidden',
            isScrolled ? 'bg-app-surface' : 'bg-app-background',
          )}
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
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {mobileNavigationItems.map((item) => {
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
                    {t(item.label)}
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
