// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  console.log('⚙ Service worker: INSTALLED');
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {
      cache: 'reload'
    }));
  })());
});

self.addEventListener('activate', (event) => {
  console.log('⚙ Service worker: ACTIVATED');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // First, try to use the navigation preload response if it's supported.
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.
        console.log('Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }

  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});

////////////////////////////////////////////////






// // Cache names
// const dynamicCacheName = 'DYNAMIC_V8';
// const preCacheName = 'PRE_V8';
// // Cache assets
// const preCacheAssets = [
//   '/offline.html',
//   '/js/peer.js'
// ];


// // cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size));
//       }
//     });
//   });
// };

// // install event
// self.addEventListener('install', evt => {
//   //console.log('service worker installed');
//   self.skipWaiting();
//   evt.waitUntil(
//     caches.open(preCacheName).then((cache) => {
//       console.log('Pre-caching...');
//       cache.addAll(preCacheAssets);
//     })
//   );
// });

// // activate event
// self.addEventListener('activate', evt => {
//   //console.log('service worker activated');
//   evt.waitUntil(
//     // Delete old caches versions
//     caches.keys().then(keys => {
//       return Promise.all(keys
//         .filter(key => (key !== dynamicCacheName) && (key !== preCacheName))
//         .map(key => caches.delete(key))
//       );
//     })
//   );
//   self.clients.claim();
// });

// // fetch events
// self.addEventListener('fetch', evt => {
//   //console.log(evt)
//   if (evt.request.mode === "navigate") {
//     evt.respondWith(
//       (async () => {
//         try {
//           const networkResponse = await fetch(evt.request);
//           return networkResponse;
//         } catch (error) {
//           console.log("Fetch failed; returning offline page instead.", error);
//           const cache = await caches.open(preCacheName);
//           const cachedResponse = await cache.match('/offline.html');
//           return cachedResponse;
//         }
//       })()
//     );
//   };
//   if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
//     caches.match(evt.request).then(cacheRes => {
//       return cacheRes || fetch(evt.request).then(fetchRes => {
//         return caches.open(dynamicCacheName).then(cache => {
//           cache.put(evt.request.url, fetchRes.clone());
//           // check cached items size
//           limitCacheSize(dynamicCacheName, 20);
//           return fetchRes;
//         });
//       });
//     });
//   };
// });