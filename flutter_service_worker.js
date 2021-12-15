'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1b7f757285dff685ceb0ad86935b7568",
"assets/assets/bali.png": "af80b610c9ebbcd4f80119f937e10cd1",
"assets/assets/bangkok.png": "589fccd378398c1dfca3be7fe2975534",
"assets/assets/beijing.png": "c767af24034228b43b3f57ddb3f8b0d2",
"assets/assets/berlin.png": "99eb2c0184d2802a591fab8e9d805969",
"assets/assets/building.png": "433aa57c28f2f41f2e50deeadc48b6a3",
"assets/assets/button_color.xml": "885e9b85ab0f3de86d363b6c14d83343",
"assets/assets/cairo.png": "6ab2e732de4d41f1676f35be1d0b6dcb",
"assets/assets/dokdo.png": "e6bd3ec677a05aeb94b13aa7e6c8e489",
"assets/assets/dubai.png": "d5aaf338752e3695186b3022aa910204",
"assets/assets/geneva.png": "0378ce95b3fd7298a4b0fde28e5d173e",
"assets/assets/hawaii.png": "8197ec6d8151e22a4d6bb1b8d63bd283",
"assets/assets/hotel.png": "e07691f5b53e12e5a607da57cfe1bbc4",
"assets/assets/ic_launcher_background.xml": "9d0dbd85e1c53dbb7ed0118e036e976f",
"assets/assets/image_border.xml": "505ad40443fd0022466c57f985a95493",
"assets/assets/image_border2.xml": "ca2583e60b71e8dfdd7d4efcb5b474e6",
"assets/assets/kakaroo.gif": "94730b2a915c2addd89a60616b50c659",
"assets/assets/landmark.png": "883dc8217c6e73848677ef5abf513e25",
"assets/assets/london.png": "d42bb4f0d05d6e724c464b91caa2e0b1",
"assets/assets/main_img.png": "280c31250b733b95046c8e51a2e06744",
"assets/assets/main_img_.png": "58007f6cb79eb13f80b3b67a643a53b2",
"assets/assets/moscow.png": "42db7966e53a98904f883e1ca4029932",
"assets/assets/newyork.png": "d5defa09f8451a631c0813125c61ad0f",
"assets/assets/paris.png": "5984597eb93f530bad6ae6e6f9068cbf",
"assets/assets/phuket.png": "e1ce249080768effde9f556cca6764bd",
"assets/assets/prague.png": "b6f8f8d970080acdb0ffb33c9d1dc366",
"assets/assets/quebec.png": "8c6547ec1998d5468b1abe52a84d9874",
"assets/assets/rome.png": "91ad889119f10f3f9f3dce3963889282",
"assets/assets/saopaulo.png": "652a64e2dfbb77ccaaaa99935b6c1f53",
"assets/assets/seoul.png": "59f99b1f838518e6c2ceb23ba6f4ca73",
"assets/assets/sydney.png": "77cfb2944b04d0a9297bde1606afbd7f",
"assets/assets/tahiti.png": "aae80db779f151237fbff61533372378",
"assets/assets/taipei.png": "2bffaeba64a711ce9357d906ebeb3d73",
"assets/assets/tokyo.png": "c3de941f8a5da1b5bd1fac124ef4fc6e",
"assets/assets/villa.png": "77cc5a4fcd3de36a427550dadccdfef9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "4ee71a7bffd56b7e7ca4af55cde893db",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "347ba8afa975f523e5bcb4943be186b4",
"/": "347ba8afa975f523e5bcb4943be186b4",
"main.dart.js": "67a73f8aa9ae24c494860cdfb0b029b0",
"manifest.json": "d632e940ca130db964e983ac02aaa097",
"version.json": "dc31e68e5deb099f66c62c2756f37471"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
