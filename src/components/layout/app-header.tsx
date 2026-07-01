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
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.MAIN}
          className="rounded-md text-base font-semibold tracking-tight transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Swagger/OpenAPI UI
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-2 sm:gap-4"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated && (
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
