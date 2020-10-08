// Files to cache
var cacheName = '[mk. TV]';
var appCache = [
    'static/css/fancytv.css',
    'static/img/dummy1.webp',
    'static/img/dummy2.jpg',
    'static/img/dummy3.jpg'
];

// Installing Service Worker and add Cache
self.addEventListener('install', function (e) {
    console.log('[mk. TV] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[mk. TV] Caching all: app shell and content');
            return cache.addAll(appCache);
        })
    );
});


// Try to fetch cached content 
self.addEventListener('fetch', function (e) {
    // skip the request. if request is not made with http protocol
    // ignore chrome addon errors
    if (!(e.request.url.indexOf('http') === 0)) return;

    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[mk. TV] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[mk. TV] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
})