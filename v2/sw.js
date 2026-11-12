const CACHE = "ds-v2-cache-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=2",
  "./app.js?v=2",
  "./supabase-config.js?v=2",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("ds-v2-cache-") && k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const reqUrl = new URL(e.request.url);
  // Never intercept external API calls (Supabase auth/REST) or root `/` app files outside /v2/
  if (reqUrl.origin !== self.location.origin) return;
  const scopePath = new URL("./", self.location.href).pathname;
  if (!reqUrl.pathname.startsWith(scopePath)) return;

  e.respondWith(
    fetch(e.request).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});

