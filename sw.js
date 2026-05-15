const CACHE_NAME = 'nn-shop-v1';
const assets = [
  '/',
  '/index.html',
  // ใส่ชื่อไฟล์ css/js หรือรูปภาพที่ต้องการให้โหลดเร็วขึ้นได้ที่นี่
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
