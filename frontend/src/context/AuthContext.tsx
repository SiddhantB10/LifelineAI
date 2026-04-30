import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { collection, doc, getDocs, limit, query, setDoc, where } from 'firebase/firestore';
import { Role, UserProfile } from '../types';
import { api } from '../services/api';
import { db } from '../services/firebase';

interface AuthContextValue {
  user: UserProfile | null;
  role: Role | null;
  loading: boolean;
  login: (email: string, password: string, role?: Role) => Promise<void>;
  signup: (payload: { name: string; email: string; password: string; phone: string; role: Role }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const storageKey = 'lifeline-session';

function readStoredUser(): UserProfile | null {
  const raw = localStorage.getItem(storageKey);
  if (raw) {
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  }

  return null;
}

async function saveUserToFirestore(user: UserProfile): Promise<void> {
  await setDoc(doc(db, 'users', user.id), user, { merge: true });
}

async function findUserInFirestore(email: string, role: Role): Promise<UserProfile | null> {
  const userQuery = query(
    collection(db, 'users'),
    where('email', '==', email),
    where('role', '==', role),
    limit(1),
  );
  const snapshot = await getDocs(userQuery);
  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data() as UserProfile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(readStoredUser());
    setLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: user?.role ?? null,
      loading,
      login: async (email, password, role) => {
        const loginRole = role ?? 'citizen';
        let sessionUser: UserProfile | null = null;

        try {
          const response = await api.login({ email, password, role: loginRole });
          if (response.user) {
            sessionUser = response.user as UserProfile;
          } else {
            sessionUser = await findUserInFirestore(email, loginRole);
          }
        } catch {
          sessionUser = await findUserInFirestore(email, loginRole);
        }

        if (!sessionUser) {
          throw new Error('No matching account found in Firestore');
        }

        setUser(sessionUser);
        localStorage.setItem(storageKey, JSON.stringify(sessionUser));
      },
      signup: async (payload) => {
        let newUser: UserProfile;

        try {
          const response = await api.signup(payload);
          newUser = response.user as UserProfile;
        } catch {
          newUser = {
            id: crypto.randomUUID(),
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            role: payload.role,
            created_at: new Date().toISOString(),
          };
        }

        await saveUserToFirestore(newUser);

        setUser(newUser);
        localStorage.setItem(storageKey, JSON.stringify(newUser));
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(storageKey);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
