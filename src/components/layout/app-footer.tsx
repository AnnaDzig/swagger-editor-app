import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function AppFooter() {
  return (
    <footer className="border border-black px-6 py-4">
      <div className="flex items-center justify-between gap-6 text-sm">
        <p>RS School Team Project</p>

        <nav>
          <Link href={ROUTES.ABOUT}>About</Link>
        </nav>
      </div>
    </footer>
  );
}
