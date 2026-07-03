import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase/client';

type AuthCredentials = {
  email: string;
  password: string;
};

export async function signInWithEmail(values: AuthCredentials) {
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  return userCredential.user;
}

export async function signUpWithEmail(values: AuthCredentials) {
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
