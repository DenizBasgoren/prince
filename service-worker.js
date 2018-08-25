
// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'theLittlePrince-v1';
var cacheName = 'theLittlePrince-v1';
var filesToCache = [
  '/prince/',
  '/prince/index.html',
  '/prince/index.css',
  '/prince/book.html',
  '/prince/book.css',
  '/prince/book.js',
  '/prince/img/image001.jpg',
  '/prince/img/image002.jpg',
  '/prince/img/image003.jpg',
  '/prince/img/image004.jpg',
  '/prince/img/image005.jpg',
  '/prince/img/image006.jpg',
  '/prince/img/image007.jpg',
  '/prince/img/image008.jpg',
  '/prince/img/image009.jpg',
  '/prince/img/image010.jpg',
  '/prince/img/image011.jpg',
  '/prince/img/image012.jpg',
  '/prince/img/image013.jpg',
  '/prince/img/image014.jpg',
  '/prince/img/image015.jpg',
  '/prince/img/image016.jpg',
  '/prince/img/image017.jpg',
  '/prince/img/image018.jpg',
  '/prince/img/image019.jpg',
  '/prince/img/image020.jpg',
  '/prince/img/image021.jpg',
  '/prince/img/image022.jpg',
  '/prince/img/image023.jpg',
  '/prince/img/image024.jpg',
  '/prince/img/image025.jpg',
  '/prince/img/image026.jpg',
  '/prince/img/image027.jpg',
  '/prince/img/image028.jpg',
  '/prince/img/image029.jpg',
  '/prince/img/image030.jpg',
  '/prince/img/image031.jpg',
  '/prince/img/image032.jpg',
  '/prince/img/image033.jpg',
  '/prince/img/image034.jpg',
  '/prince/img/image035.jpg',
  '/prince/img/image036.jpg',
  '/prince/img/image037.jpg',
  '/prince/img/image038.jpg',
  '/prince/img/image039.jpg',
  '/prince/img/image040.jpg',
  '/prince/img/image041.jpg',
  '/prince/img/image042.jpg',
  '/prince/img/image043.jpg',
  '/prince/img/image044.jpg',
  '/prince/img/image045.jpg',
  '/prince/img/image046.jpg',
  '/prince/img/image047.jpg',
  '/prince/img/image048.jpg',
  '/prince/img/image049.jpg',
  '/prince/img/sheep.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);

    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
);