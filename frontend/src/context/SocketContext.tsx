import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
// Real-time features are handled via Firestore listeners and FCM; this context is a compatibility shim.

interface SocketContextValue {
  // Compatibility shape — not a real socket when using Firestore listeners.
  socket: null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ socket: null, connected: false });

export function SocketProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ socket: null, connected: false }), []);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
