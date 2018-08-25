
var CACHE = 'princeV1';
var precacheFiles = [
      
  'https://denizbasgoren.github.io/prince/',
  'https://denizbasgoren.github.io/prince/index.html',
  'https://denizbasgoren.github.io/prince/index.css',
  'https://denizbasgoren.github.io/prince/book.html',
  'https://denizbasgoren.github.io/prince/book.css',
  'https://denizbasgoren.github.io/prince/book.js',
  'https://denizbasgoren.github.io/prince/img/image001.jpg',
  'https://denizbasgoren.github.io/prince/img/image002.jpg',
  'https://denizbasgoren.github.io/prince/img/image003.jpg',
  'https://denizbasgoren.github.io/prince/img/image004.jpg',
  'https://denizbasgoren.github.io/prince/img/image005.jpg',
  'https://denizbasgoren.github.io/prince/img/image006.jpg',
  'https://denizbasgoren.github.io/prince/img/image007.jpg',
  'https://denizbasgoren.github.io/prince/img/image008.jpg',
  'https://denizbasgoren.github.io/prince/img/image009.jpg',
  'https://denizbasgoren.github.io/prince/img/image010.jpg',
  'https://denizbasgoren.github.io/prince/img/image011.jpg',
  'https://denizbasgoren.github.io/prince/img/image012.jpg',
  'https://denizbasgoren.github.io/prince/img/image013.jpg',
  'https://denizbasgoren.github.io/prince/img/image014.jpg',
  'https://denizbasgoren.github.io/prince/img/image015.jpg',
  'https://denizbasgoren.github.io/prince/img/image016.jpg',
  'https://denizbasgoren.github.io/prince/img/image017.jpg',
  'https://denizbasgoren.github.io/prince/img/image018.jpg',
  'https://denizbasgoren.github.io/prince/img/image019.jpg',
  'https://denizbasgoren.github.io/prince/img/image020.jpg',
  'https://denizbasgoren.github.io/prince/img/image021.jpg',
  'https://denizbasgoren.github.io/prince/img/image022.jpg',
  'https://denizbasgoren.github.io/prince/img/image023.jpg',
  'https://denizbasgoren.github.io/prince/img/image024.jpg',
  'https://denizbasgoren.github.io/prince/img/image025.jpg',
  'https://denizbasgoren.github.io/prince/img/image026.jpg',
  'https://denizbasgoren.github.io/prince/img/image027.jpg',
  'https://denizbasgoren.github.io/prince/img/image028.jpg',
  'https://denizbasgoren.github.io/prince/img/image029.jpg',
  'https://denizbasgoren.github.io/prince/img/image030.jpg',
  'https://denizbasgoren.github.io/prince/img/image031.jpg',
  'https://denizbasgoren.github.io/prince/img/image032.jpg',
  'https://denizbasgoren.github.io/prince/img/image033.jpg',
  'https://denizbasgoren.github.io/prince/img/image034.jpg',
  'https://denizbasgoren.github.io/prince/img/image035.jpg',
  'https://denizbasgoren.github.io/prince/img/image036.jpg',
  'https://denizbasgoren.github.io/prince/img/image037.jpg',
  'https://denizbasgoren.github.io/prince/img/image038.jpg',
  'https://denizbasgoren.github.io/prince/img/image039.jpg',
  'https://denizbasgoren.github.io/prince/img/image040.jpg',
  'https://denizbasgoren.github.io/prince/img/image041.jpg',
  'https://denizbasgoren.github.io/prince/img/image042.jpg',
  'https://denizbasgoren.github.io/prince/img/image043.jpg',
  'https://denizbasgoren.github.io/prince/img/image044.jpg',
  'https://denizbasgoren.github.io/prince/img/image045.jpg',
  'https://denizbasgoren.github.io/prince/img/image046.jpg',
  'https://denizbasgoren.github.io/prince/img/image047.jpg',
  'https://denizbasgoren.github.io/prince/img/image048.jpg',
  'https://denizbasgoren.github.io/prince/img/image049.jpg',
  'https://denizbasgoren.github.io/prince/img/sheep.png'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('[PWA Builder] The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[PWA Builder] Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
  console.log('[PWA Builder] Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('[PWA Builder] The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
