import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const raw = import.meta.env.VITE_FIREBASE_CONFIG || '{}';
let firebaseConfig = {};
try {
  firebaseConfig = typeof raw === 'string' ? JSON.parse(raw) : raw;
} catch (e) {
  console.warn('VITE_FIREBASE_CONFIG is not valid JSON');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
