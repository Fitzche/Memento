// Cache de l'application : Memento s'ouvre même sans réseau.
// Stratégie « réseau d'abord » : chaque ouverture en ligne récupère la dernière version publiée.
const V = 'memento-1.0.0';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'css/style.css', 'icons/icon.svg', 'js/registry.js', 'js/app.js',
  'data/philo-1.js', 'data/philo-2.js', 'data/philo-3.js', 'data/philo-4.js', 'data/maths.js', 'data/physique.js',
  'data/allemand-1.js', 'data/allemand-2.js'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const own = url.origin === location.origin;
  if (!own && url.host !== 'cdn.jsdelivr.net') return; // KaTeX (formules) vient de jsdelivr
  e.respondWith(fetch(own ? new Request(req, { cache: 'no-cache' }) : req).then((res) => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(V).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))));
});
