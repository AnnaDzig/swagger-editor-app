import { AuthForm } from '@/features/auth/components/auth-form';

export default function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-10">
      <AuthForm mode="sign-up" />
    </main>
  );
}
