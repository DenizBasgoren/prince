
let bah = document.getElementsByClassName('wrapper')[0].children[0]
let eyes = document.getElementsByClassName('svg-eyes')[0]

bah.onclick = function (e) {
    this.style.width = "90"
    setTimeout(function () {
        bah.style.width = "100"
    }, 200)
}

setInterval(function () {
    eyes.style.display = 'none'
    setTimeout(function () {
        eyes.style.display = ''
    }, 200)
}, 20000)


if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/prince/service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  