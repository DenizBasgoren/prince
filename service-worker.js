
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
  '/',
  '/index.html',
  '/index.css',
  '/book.html',
  '/book.css',
  '/book.js',
  '/img/image001.jpg',
  '/img/image002.jpg',
  '/img/image003.jpg',
  '/img/image004.jpg',
  '/img/image005.jpg',
  '/img/image006.jpg',
  '/img/image007.jpg',
  '/img/image008.jpg',
  '/img/image009.jpg',
  '/img/image010.jpg',
  '/img/image011.jpg',
  '/img/image012.jpg',
  '/img/image013.jpg',
  '/img/image014.jpg',
  '/img/image015.jpg',
  '/img/image016.jpg',
  '/img/image017.jpg',
  '/img/image018.jpg',
  '/img/image019.jpg',
  '/img/image020.jpg',
  '/img/image021.jpg',
  '/img/image022.jpg',
  '/img/image023.jpg',
  '/img/image024.jpg',
  '/img/image025.jpg',
  '/img/image026.jpg',
  '/img/image027.jpg',
  '/img/image028.jpg',
  '/img/image029.jpg',
  '/img/image030.jpg',
  '/img/image031.jpg',
  '/img/image032.jpg',
  '/img/image033.jpg',
  '/img/image034.jpg',
  '/img/image035.jpg',
  '/img/image036.jpg',
  '/img/image037.jpg',
  '/img/image038.jpg',
  '/img/image039.jpg',
  '/img/image040.jpg',
  '/img/image041.jpg',
  '/img/image042.jpg',
  '/img/image043.jpg',
  '/img/image044.jpg',
  '/img/image045.jpg',
  '/img/image046.jpg',
  '/img/image047.jpg',
  '/img/image048.jpg',
  '/img/image049.jpg',
  '/img/sheep.png'
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