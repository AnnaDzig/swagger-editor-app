import { AppFooter } from '@/components/layout/app-footer';
import { AppHeader } from '@/components/layout/app-header';
import { AuthProvider } from '@/components/providers/auth-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import type { Metadata } from 'next';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: 'Swagger/OpenAPI UI',
  description: 'OpenAPI editor, viewer, and REST client',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body>
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>
              <div className="flex min-h-screen flex-col">
                <AppHeader />
                <div className="flex-1">{children}</div>
                <AppFooter />
              </div>
            </TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
