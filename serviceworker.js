const CACHE_NAME = "version-2";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

self.addEventListener("install", async (event) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(() =>
        fetch(event.request).catch(() => caches.match("offline.html"))
      )
  );
});

self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
});
