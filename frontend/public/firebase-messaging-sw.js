importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBQCgNi-C-nX0Pwk5Y5Ys1vxtauTerinqg',
  authDomain: 'lifeline-ai-67fac.firebaseapp.com',
  projectId: 'lifeline-ai-67fac',
  storageBucket: 'lifeline-ai-67fac.firebasestorage.app',
  messagingSenderId: '263937681218',
  appId: '1:263937681218:web:704c95f56c82e567d54adb',
  measurementId: 'G-5J5MN9LPET',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const { notification, data } = payload;

  const notificationTitle = notification?.title || 'Lifeline AI Alert';
  const notificationOptions = {
    body: notification?.body || 'New emergency update',
    icon: notification?.icon || '/vite.svg',
    badge: '/vite.svg',
    tag: 'lifeline-notification',
    data: data || {},
    vibrate: [200, 100, 200],
    requireInteraction: true, // Keep notification until user interacts
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

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

self.addEventListener('notificationclose', (event) => {
  console.log('[firebase-messaging-sw.js] Notification closed');
});
