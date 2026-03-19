const CACHE_NAME = 'stage-link-memo-v049';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './sw.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of APP_SHELL) {
      try {
        const request = new Request(url, { mode: url.startsWith('http') ? 'no-cors' : 'same-origin' });
        const response = await fetch(request);
        await cache.put(request, response.clone());
      } catch (e) {
        // Keep installing even if some files fail now.
      }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve()));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;

    try {
      const response = await fetch(event.request);
      try {
        if (event.request.url.startsWith(self.location.origin) || event.request.url.includes('cdnjs.cloudflare.com')) {
          cache.put(event.request, response.clone());
        }
      } catch (e) {}
      return response;
    } catch (e) {
      const fallback = await cache.match('./index.html');
      if (event.request.mode === 'navigate' && fallback) return fallback;
      throw e;
    }
  })());
});
