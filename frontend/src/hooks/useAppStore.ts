import { create } from 'zustand';

// Global app state using Zustand
export const useAppStore = create((set) => ({
  // User state
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // Emergency state
  activeEmergencies: [],
  setActiveEmergencies: (emergencies) => set({ activeEmergencies: emergencies }),
  addEmergency: (emergency) =>
    set((state) => ({ activeEmergencies: [emergency, ...state.activeEmergencies] })),
  updateEmergency: (id, updates) =>
    set((state) => ({
      activeEmergencies: state.activeEmergencies.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),

  // Ambulance state
  availableAmbulances: [],
  setAvailableAmbulances: (ambulances) => set({ availableAmbulances: ambulances }),

  // Hospital state
  hospitals: [],
  setHospitals: (hospitals) => set({ hospitals }),

  // Notifications
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),

  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Error handling
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Map/location state
  userLocation: { lat: 28.6139, lng: 77.209 }, // Default Delhi
  setUserLocation: (location) => set({ userLocation: location }),

  // Real-time updates enabled
  realtimeEnabled: true,
  setRealtimeEnabled: (enabled) => set({ realtimeEnabled: enabled }),

  // Clear all state
  reset: () =>
    set({
      currentUser: null,
      activeEmergencies: [],
      availableAmbulances: [],
      hospitals: [],
      notifications: [],
      isLoading: false,
      error: null,
      realtimeEnabled: true,
    }),
}));
