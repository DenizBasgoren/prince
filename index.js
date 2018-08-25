
let bah = document.getElementsByClassName('wrapper')[0].children[0]
let eyes = document.getElementsByClassName('svg-eyes')[0]


let bar = document.getElementsByClassName('progress-bar')[0]
bar.style.display = 'none'
let c = bar.getContext('2d')
let w = bar.width = Math.floor(window.innerWidth*0.8)
let h = bar.height = Math.floor(w / 50)
let progress = 0
let installed = false
let progressInterval = null


bah.onclick = function (e) {
    this.style.width = "90px"
    this.style.marginBottom = "10px"
    setTimeout(function () {
        bah.style.width = "100px"
        bah.style.marginBottom = ""
    }, 200)
}

setInterval(function () {
    eyes.style.display = 'none'
    setTimeout(function () {
        eyes.style.display = ''
    }, 200)
}, 20000)

window.addEventListener('beforeinstallprompt', (e) => {
    e.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        progressBarStart()
      } else {
        window.location = window.location
      }
    });
});

window.addEventListener('appinstalled', (evt) => {
    installed = true
  });

function progressBarStart () {

    bar.style.display = ''
    bar.style.border = '1px solid #000000'

    progressInterval = setInterval( function() {
        c.fillStyle = '#ffffff'
        c.fillRect(0,0,w,h)
        c.fillStyle = '#00aa00'
        c.fillRect(0,0, Math.floor(progress*w*0.01) ,h)

        if (!installed) {
            if (progress < 80) progress += 0.5
        }
        else if (progress > 100) {
            clearInterval(progressInterval)
        }
        else {
            progress += 3
        }

    },33)
}

if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/prince/service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  

