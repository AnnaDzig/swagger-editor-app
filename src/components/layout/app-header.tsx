import Link from 'next/link';
import {
  guestNavigationItems,
  publicNavigationItems,
} from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

export function AppHeader() {
  const navigationItems = [...publicNavigationItems, ...guestNavigationItems];

  return (
    <header className="sticky top-0 z-50 border border-black bg-white px-6 py-4 text-black">
      <div className="flex items-center justify-between gap-6">
        <Link href={ROUTES.MAIN} className="font-bold">
          Swagger/OpenAPI UI
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-4 text-sm"
        >
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
