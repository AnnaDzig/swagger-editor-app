import { AuthRouteGuard } from '@/features/auth/components/auth-route-guard';
import { SignUpForm } from '@/features/auth/components/sign-up-form';

export default function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-muted/20 px-4 py-10">
      <AuthRouteGuard>
        <SignUpForm />
      </AuthRouteGuard>
    </main>
  );
}
