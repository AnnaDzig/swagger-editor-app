import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';

import { firebaseAuth } from '@/lib/firebase/client';

type AuthCredentials = {
  email: string;
  password: string;
};

async function createServerSession(user: FirebaseUser) {
  const idToken = await user.getIdToken(true);

  const response = await fetch('/api/auth/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Could not create server session.');
  }
}

async function clearServerSession() {
  const response = await fetch('/api/auth/session', {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not clear server session.');
  }
}

async function completeAuthentication(user: FirebaseUser) {
  try {
    await createServerSession(user);
    return user;
  } catch (error) {
    await signOut(firebaseAuth);
    throw error;
  }
}

export async function signInWithEmail(values: AuthCredentials) {
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  return completeAuthentication(userCredential.user);
}

export async function signUpWithEmail(values: AuthCredentials) {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  return completeAuthentication(userCredential.user);
}

export async function signOutUser() {
  await clearServerSession();
  await signOut(firebaseAuth);
}
