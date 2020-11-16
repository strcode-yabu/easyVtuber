const cacheName = 'easyVtuber-caches';
const urlsToCache = [
  '/easyVtuber/',
  '/easyVtuber/assets/css/style.css',
  '/easyVtuber/assets/js/main.js',
  '/easyVtuber/assets/images/ecmc.svg',
  '/easyVtuber/assets/images/ecmo.svg',
  '/easyVtuber/assets/images/eomc.svg',
  '/easyVtuber/assets/images/eomo.svg'
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