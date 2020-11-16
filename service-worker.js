const cacheName = 'easyVtuber-caches';
const urlsToCache = [
  '/',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/images/ecmc.svg',
  '/assets/images/ecmo.svg',
  '/assets/images/eomc.svg',
  '/assets/images/eomo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then( cache => {
      return cache.addAll(urlsToCache);
    })
  );
});
  
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
    .match(event.request)
    .then( response => {
      return response ? response : fetch(event.request);
    })
  );
});