// Service worker minimal pour Nidoux — permet d'afficher des notifications
// système fiables (notamment sur Chrome Android) quand l'app détecte un
// nouveau like Vinted pendant qu'un onglet du site est ouvert.
// Ne fait aucune mise en cache, aucun mode hors-ligne : juste les notifications.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
