import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging';

const raw = import.meta.env.VITE_FIREBASE_CONFIG || '{}';
let firebaseConfig = {};
try {
  firebaseConfig = typeof raw === 'string' ? JSON.parse(raw) : raw;
} catch (e) {
  console.warn('VITE_FIREBASE_CONFIG is not valid JSON');
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let messagingInstance: Messaging | null = null;

export async function getMessagingInstance(): Promise<Messaging | null> {
  if (messagingInstance) {
    return messagingInstance;
  }

  const supported = await isSupported();
  if (!supported) {
    return null;
  }

  messagingInstance = getMessaging(app);
  return messagingInstance;
}
