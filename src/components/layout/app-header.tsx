import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border border-black bg-white px-6 py-4 text-black">
      <div className="flex items-center justify-between gap-6">
        <Link href={ROUTES.MAIN} className="font-bold">
          Swagger/OpenAPI UI
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href={ROUTES.ABOUT}>About</Link>
          <Link href={ROUTES.HISTORY}>History</Link>
          <Link href={ROUTES.SIGN_IN}>Sign In</Link>
          <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
