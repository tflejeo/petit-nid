// Service worker minimal pour Nidoux — actuellement inutilisé (les
// notifications d'ajout d'article/photo sont gérées en local, via un badge
// dans l'app, sans notification système). Conservé pour un usage futur.
// Ne fait aucune mise en cache, aucun mode hors-ligne.

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
