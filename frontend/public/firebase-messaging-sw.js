// firebase-messaging-sw.js
// Service Worker for Firebase Cloud Messaging
// Place this in public/ folder
// This enables receiving notifications when app is in background

importScripts('https://www.gstatic.com/firebasejs/10.16.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.16.0/firebase-messaging.js');

// Initialize Firebase (minimal config - will use sender ID from FCM)
firebase.initializeApp({
  apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  projectId: 'lifeline-ai',
  messagingSenderId: '123456789000',
  appId: '1:123456789000:web:abcdef1234567890abcdef',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const { notification, data } = payload;

  const notificationTitle = notification?.title || 'Lifeline AI Alert';
  const notificationOptions = {
    body: notification?.body || 'New emergency update',
    icon: notification?.icon || '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: 'lifeline-notification',
    data: data || {},
    vibrate: [200, 100, 200],
    requireInteraction: true, // Keep notification until user interacts
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked');
  event.notification.close();

  // Navigate to app or specific emergency page
  const data = event.notification.data || {};
  const url = data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if app is already open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window if not already open
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Handle notification dismissal
self.addEventListener('notificationclose', (event) => {
  console.log('[firebase-messaging-sw.js] Notification closed');
});
