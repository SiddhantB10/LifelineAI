import {
  collection,
  query,
  where,
  onSnapshot,
  QueryConstraint,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Listen to active emergencies in real-time
 * @param {string} userId - Optional user ID to filter by owner
 * @param {(emergencies: any[]) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToEmergencies(
  callback: (emergencies: any[]) => void,
  userId?: string
): Unsubscribe {
  const constraints: QueryConstraint[] = [
    where('status', 'in', ['Reported', 'Dispatched', 'En Route', 'At Hospital']),
  ];

  if (userId) {
    constraints.push(where('user_id', '==', userId));
  }

  const q = query(collection(db, 'emergencies'), ...constraints);

  return onSnapshot(
    q,
    (snapshot) => {
      const emergencies = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(emergencies);
    },
    (error) => {
      console.error('Error listening to emergencies:', error);
      callback([]);
    }
  );
}

/**
 * Listen to available ambulances in real-time
 * @param {(ambulances: any[]) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToAmbulances(
  callback: (ambulances: any[]) => void
): Unsubscribe {
  const q = query(
    collection(db, 'ambulances'),
    where('status', 'in', ['Available', 'Busy', 'Returning'])
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const ambulances = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(ambulances);
    },
    (error) => {
      console.error('Error listening to ambulances:', error);
      callback([]);
    }
  );
}

/**
 * Listen to hospitals in real-time
 * @param {(hospitals: any[]) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToHospitals(
  callback: (hospitals: any[]) => void
): Unsubscribe {
  const q = query(collection(db, 'hospitals'));

  return onSnapshot(
    q,
    (snapshot) => {
      const hospitals = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(hospitals);
    },
    (error) => {
      console.error('Error listening to hospitals:', error);
      callback([]);
    }
  );
}

/**
 * Listen to user notifications in real-time
 * @param {string} userId - User ID to get notifications for
 * @param {(notifications: any[]) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToNotifications(
  userId: string,
  callback: (notifications: any[]) => void
): Unsubscribe {
  const q = query(
    collection(db, 'notifications'),
    where('user_id', '==', userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Sort by most recent first
      const sorted = notifications.sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
      callback(sorted);
    },
    (error) => {
      console.error('Error listening to notifications:', error);
      callback([]);
    }
  );
}

/**
 * Listen to a single emergency's updates
 * @param {string} emergencyId - Emergency ID to listen to
 * @param {(emergency: any) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToEmergency(
  emergencyId: string,
  callback: (emergency: any) => void
): Unsubscribe {
  const q = query(collection(db, 'emergencies'), where('id', '==', emergencyId));

  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        callback({
          ...doc.data(),
          id: doc.id,
        });
      }
    },
    (error) => {
      console.error('Error listening to emergency:', error);
      callback(null);
    }
  );
}

/**
 * Listen to an ambulance's location updates
 * @param {string} ambulanceId - Ambulance ID to listen to
 * @param {(ambulance: any) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToAmbulanceLocation(
  ambulanceId: string,
  callback: (ambulance: any) => void
): Unsubscribe {
  const q = query(
    collection(db, 'ambulances'),
    where('id', '==', ambulanceId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        callback({
          ...doc.data(),
          id: doc.id,
        });
      }
    },
    (error) => {
      console.error('Error listening to ambulance:', error);
      callback(null);
    }
  );
}

/**
 * Listen to analytics events in real-time
 * @param {(analytics: any[]) => void} callback - Function called when data changes
 * @returns {Unsubscribe} Function to stop listening
 */
export function listenToAnalytics(
  callback: (analytics: any[]) => void
): Unsubscribe {
  const q = query(collection(db, 'analytics'));

  return onSnapshot(
    q,
    (snapshot) => {
      const analytics = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      callback(analytics);
    },
    (error) => {
      console.error('Error listening to analytics:', error);
      callback([]);
    }
  );
}
