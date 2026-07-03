import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase/client';
import type { AuthFormValues } from '@/features/auth/schemas/auth-schema';

export async function signInWithEmail(values: AuthFormValues) {
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  return userCredential.user;
}

export async function signUpWithEmail(values: AuthFormValues) {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  return userCredential.user;
}

export async function signOutUser() {
  await signOut(firebaseAuth);
}
