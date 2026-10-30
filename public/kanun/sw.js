/* KanunDSP offline cache: after one visit online, the app opens with no internet (venues!). */
const CACHE = 'makamstage-v30';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameApp = url.origin === location.origin && url.pathname.startsWith(new URL('./', self.registration.scope).pathname);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameApp && !fonts) return;
  if (req.mode === 'navigate') {
    // network first for the page itself (gets updates), cache when offline
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  // cache first for assets (hashed file names), fill cache as they load
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; })));
});
