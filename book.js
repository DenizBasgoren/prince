
let nav = document.getElementsByTagName('nav')[0]
let main = document.getElementsByTagName('main')[0]
let bah = document.getElementsByClassName('nav-menubtn')[0].children[0]
let eyes = document.getElementsByClassName('svg-eyes')[0]

bah.onclick = function(e) {
    this.style.width = "70"
    setTimeout(function() {
        bah.style.width = "80"
        openNav()
    },200)
}

setInterval( function() {
    eyes.style.display = 'none'
    setTimeout( function() {
        eyes.style.display = ''
    },200)
},20000)

main.onclick = closeNav


function openNav() {
    nav.style.width = "250px";
}

function closeNav() {
    nav.style.width = "0";
}

function navigate(x) {
    let result = ""

    if (x===0) {
        result = `
        <p class=title>About</p>
        <img class=image src="img/image002.jpg" />
        <div class=block>
        <p class=eng> by Deniz Bashgoren, v1, 2018 </p>
        <p class=eng> MIT License </p>
        </div>`
    }
    else {

        let d = data[parseInt(x)-1]

        for (let i = 0; i< d.length; i++) {
            if (d[i].type == "title") {
                result += `<p class=title>Chapter ${x}</p>`
            }
            else if (d[i].type == "image") {
                result += `<img class=image src="${d[i].data}"/>`
            }
            else if (d[i].type=="eng") {
                result += `<div class=block>`
                result += `<p class=eng>${d[i].data}</p>`
            }
            else if (d[i].type=='ru') {
                result += `<p class=ru>${d[i].data}</p>`
                result += `</div>`
            }
        }

        result += `<p class=title><a href="#">↑</a></p>`
    }

    closeNav()
    main.innerHTML = result

}