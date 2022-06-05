const CACHE_NAME = "version-2";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

self.addEventListener("install", async (event) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
});

self.addEventListener("fetch", (event) => {
  event.respondWith(async () => {
    try {
      const request = await fetch(event.request);
      return request;
    } catch {
      return caches.match("offline.html");
    }
  });
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
