self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('prince-v1').then(function(cache) {
      return cache.addAll([
        '/prince',
        '/prince/',
        '/prince/index.html',
        '/prince/index.css',
        '/prince/index.js',
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
      ]);
    })
  );
 });
 
 self.addEventListener('fetch', function(e) {
   console.log(e.request.url);
   e.respondWith(
     caches.match(e.request).then(function(response) {
       return response || fetch(e.request);
     })
   );
 });
 