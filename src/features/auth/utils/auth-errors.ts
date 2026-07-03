import { FirebaseError } from 'firebase/app';

const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/wrong-password': 'Invalid email or password.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/weak-password': 'Please use a stronger password.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/operation-not-allowed':
    'Email/password sign-up is not enabled for this Firebase project.',
  'auth/invalid-api-key':
    'Firebase API key is invalid. Check your .env.local file.',
  'auth/app-not-authorized':
    'This app is not authorized for this Firebase project.',
  'auth/invalid-email': 'Please enter a valid email address.',
};

export function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return 'Something went wrong. Please try again.';
  }

  return (
    authErrorMessages[error.code] ?? `Authentication failed: ${error.code}`
  );
}
