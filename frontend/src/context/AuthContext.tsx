import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Role, UserProfile } from '../types';
import { demoUsers } from '../data/demo';
// Authentication will use Firebase Auth (frontend uses `services/firebase.ts`).

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

  return demoUsers[0] ?? null;
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
        // Firebase Auth integration will be used here; using demo fallback for now.
        const fallback = demoUsers.find((entry) => entry.email === email && (!role || entry.role === role));
        const sessionUser = fallback ?? {
          id: crypto.randomUUID(),
          name: email.split('@')[0],
          phone: '+91 90000 00000',
          email,
          role: role ?? 'citizen',
          created_at: new Date().toISOString(),
        };

        setUser(sessionUser);
        localStorage.setItem(storageKey, JSON.stringify(sessionUser));
        console.log('Signed in successfully');
      },
      signup: async (payload) => {
        // Firebase Auth `createUserWithEmailAndPassword` can be used here; demo fallback used now.
        const newUser: UserProfile = {
          id: crypto.randomUUID(),
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          role: payload.role,
          created_at: new Date().toISOString(),
        };

        setUser(newUser);
        localStorage.setItem(storageKey, JSON.stringify(newUser));
        console.log('Account created');
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(storageKey);
        console.log('Signed out');
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
