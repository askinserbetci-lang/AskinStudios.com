/* MakamStage offline helper: after one visit online, the app opens with no internet (venues!).
 * Every cache name carries this app's folder (scope), e.g. makamstage-shell-v65@/kanun/, so cleanup can only
 * ever touch MakamStage's own caches in its own folder, never other apps or pages on the same website. */
const SCOPE = new URL(self.registration.scope).pathname;
const CACHE = `makamstage-shell-v65@${SCOPE}`;
/* offline copies made by "Prepare set offline" (makamstage-offline@<scope>#<build>-<time>): the app promotes
 * a new copy only when it is complete and then removes the older ones itself, so they are never deleted here */
const OFFLINE_PREFIX = `makamstage-offline@${SCOPE}#`;
const ours = (k) => k.startsWith('makamstage-') && (k.endsWith('@' + SCOPE) || k.startsWith(OFFLINE_PREFIX));
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  // remove only this app's own old helper caches (same folder); offline copies are managed by the app
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => ours(k) && k !== CACHE && !k.startsWith(OFFLINE_PREFIX)).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameApp = url.origin === location.origin && url.pathname.startsWith(new URL('./', self.registration.scope).pathname);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameApp && !fonts) return;
  // the update check must always ask the website, never the offline copy
  if (url.pathname.endsWith('/version.json') || url.pathname.endsWith('/offline-files.json')) return;
  // editor preview (dev server): source files keep the same name on every change, so never keep copies of them
  if (/\/(src|node_modules|@vite|@fs|@id|@react-refresh)(\/|$)/.test(url.pathname) || url.pathname.includes('_aistudio')) return;
  if (req.mode === 'navigate') {
    // network first for the page itself (gets updates), cache when offline
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); if (r.ok) caches.open(CACHE).then((c) => c.put('./index.html', copy)); return r; })
      .catch(() => caches.open(CACHE).then((c) => c.match('./index.html')).then((hit) => hit || caches.match('./index.html'))));
    return;
  }
  // cache first for assets (hashed file names), fill cache as they load
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; })));
});
