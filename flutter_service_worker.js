'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"index.html": "24069c3693b89be3d843ca87dc555056",
"/": "24069c3693b89be3d843ca87dc555056",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "934b978d6530cd97c53d928adb2f0810",
"version.json": "9b818ca9511483c901bed1545384376c",
"assets/NOTICES": "ae41ea2e645699fda4e4789a0e341ea5",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/AssetManifest.bin.json": "c39adee7f6a8b82b8952bd707660bfc4",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/assets/android.png": "d9840e8dfe971155362baa1e59f3fa5f",
"assets/assets/github.png": "dc5e6a7fe0e1b2bcf55192e991bbce79",
"assets/assets/Screenshot%2520from%25202024-04-01%252016-25-37.png": "cc0e05ad7613a353eca37b9af42ffda1",
"assets/assets/python.png": "6dd7bc34be27074a7e889b7dba23247e",
"assets/assets/project/ms.png": "40f8ca59d139288d0560a7abdef473d1",
"assets/assets/project/mypro.png": "29f02829e8a16e3ffec4297e596be57d",
"assets/assets/project/music.jpeg": "6b9bc75eb538c528396dab11fd9c92ee",
"assets/assets/mt.png": "a316b9e7ab8bcf83feefe50cc5f1e273",
"assets/assets/quora.png": "c6d0a842a1de97b3e85088446b42279b",
"assets/assets/web.png": "43e36cd725708230edc3c9e23633c501",
"assets/assets/c.png": "94f4bf4bb05bc9901d014980f974818e",
"assets/assets/html-5.png": "31039a53ab57f00b4eff33fb7bcfa2e8",
"assets/assets/Screenshot%2520from%25202024-04-01%252016-24-42.png": "8e3c8ac0c21beef1e7d503f142956cab",
"assets/assets/css.png": "75dc78a9b781dc3527e24229f712ba2c",
"assets/assets/instagram.png": "b3c9ce60dd1d75ed3f597202c82c05e7",
"assets/assets/pocketnovel.png": "e0d029259e41a46a09e86bf1bf2f3b68",
"assets/assets/Telegram.png": "4ba0b763bb463c8cb333f8aefa60e972",
"assets/assets/rava.png": "a96132a52df79f0423994c2f0c116e2f",
"assets/assets/blog.png": "f363837813840130e35d5cf20fa2e6d2",
"assets/assets/sql.png": "b07d33f6e60cc50d44d2b131f3c0ae7a",
"assets/assets/dart.png": "918e7c35823c7ad268ba831c6e7eaa64",
"assets/assets/desktop.png": "6e33cecff6f49797cc4bb42d526836d7",
"assets/assets/java-logo.png": "ed373fba2dddfcb5f257c98330defe7c",
"assets/assets/ios.png": "b449a795561361c23f74909c8bd572b6",
"assets/assets/mst.png": "cc0e05ad7613a353eca37b9af42ffda1",
"assets/assets/flutter.png": "6637b6c64481c76692760d0729b9c10a",
"assets/assets/rv.png": "434cbe151a889a392b720d7a1502e68b",
"assets/assets/Linkedin.png": "6fe1d86cdf2dd8b85445db64ab46d793",
"assets/AssetManifest.json": "4ed983d6fa510c7317f3d403aa726407",
"assets/fonts/MaterialIcons-Regular.otf": "d9b3c449ccf5c0081da00cf0e8d853af",
"assets/AssetManifest.bin": "52d29bae127b294dd91432b4e102a4b7",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"manifest.json": "e2b9103aaafaf8ed9f90576c9d9a1341",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "b6ef3f3b835ba4ed98a3171ef0a5ad6a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
