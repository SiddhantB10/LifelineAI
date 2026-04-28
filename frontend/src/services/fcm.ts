import { getMessagingInstance } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';

/**
 * Request notification permission and get FCM token
 * Requires: public/firebase-messaging-sw.js service worker
 * @returns {Promise<string|null>} FCM token or null if permission denied
 */
export async function initializeFCM(): Promise<string | null> {
  try {
    // Check browser support
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Workers not supported in this browser');
      return null;
    }

    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      console.log('Notification permission denied');
      return null;
    }

    // Register service worker
    try {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    } catch (error) {
      console.warn('Service worker registration skipped (may be already registered)', error);
    }

    const messaging = await getMessagingInstance();
    if (!messaging) {
      console.warn('Firebase Messaging is not supported in this browser');
      return null;
    }

    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || undefined,
    });

    if (token) {
      console.log('FCM Token obtained:', token.substring(0, 20) + '...');
      // Save to Firestore under user profile later
      return token;
    } else {
      console.log('No FCM token retrieved; user may have denied notification permissions');
      return null;
    }
  } catch (error) {
    console.error('FCM initialization failed:', error);
    return null;
  }
}

/**
 * Setup handler for foreground messages (app in focus)
 * @param {(payload: any) => void} callback - Function to handle incoming messages
 */
export function setupForegroundMessageHandler(
  callback: (payload: any) => void
): Promise<void> {
  return getMessagingInstance().then((messaging) => {
    if (!messaging) {
      return;
    }

    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);

      // payload has: notification { title, body, icon } and data { custom fields }
      const { notification, data } = payload;

      if (notification) {
        // Show custom UI notification (e.g., toast, alert, in-app banner)
        callback({
          title: notification.title,
          body: notification.body,
          icon: notification.icon,
          data,
          timestamp: new Date().toISOString(),
        });

        // Optional: Also show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.title || 'Lifeline AI', {
            body: notification.body,
            icon: notification.icon,
          });
        }
      }
    });
  });
}

/**
 * Request notification permissions explicitly
 * @returns {Promise<boolean>} True if permission granted
 */
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Notification permission error:', error);
    return false;
  }
}

/**
 * Check if notifications are enabled
 * @returns {boolean}
 */
export function areNotificationsEnabled(): boolean {
  return 'Notification' in window && Notification.permission === 'granted';
}

/**
 * Example: Manually send a notification to current user
 * (In production, use Cloud Functions to trigger)
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Additional data
 */
export async function sendLocalNotification(
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  if (!areNotificationsEnabled()) {
    console.warn('Notifications not enabled');
    return;
  }

  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length > 0) {
      registrations[0].showNotification(title, {
        body,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'lifeline-notification',
        data,
      });
    }
  }
}
