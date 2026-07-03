import { SignInForm } from '@/features/auth/components/sign-in-form';

export default function SignInPage() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-muted/20 px-4 py-10">
      <SignInForm />
    </main>
  );
}
