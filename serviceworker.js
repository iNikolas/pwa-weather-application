const STATIC_CACHE_NAME = "s-version-1";
const DYNAMIC_CACHE_NAME = "d-version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

self.addEventListener("install", async (event) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(urlsToCache);
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== STATIC_CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name))
  );
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = cache.match(request);

    return cached ?? (await caches.match("offline.html"));
  }
}
