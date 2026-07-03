import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const privateKey = getRequiredEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

const adminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId: getRequiredEnv('FIREBASE_PROJECT_ID'),
        clientEmail: getRequiredEnv('FIREBASE_CLIENT_EMAIL'),
        privateKey,
      }),
    });

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
