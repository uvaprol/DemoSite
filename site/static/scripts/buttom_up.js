const btn = document.getElementById('up')
let timerId = setTimeout(()=>{btn.style.display = 'none'}, 500)

function button_up_hide(){
    btn.style.animation = 'unvisible 1.5s forwards'
    timerId = setTimeout(()=>{btn.style.display = 'none'}, 500)
}

window.onwheel = (e) =>{
    if (e.deltaY > 0 || $(window).scrollTop() <= 100){
        button_up_hide()
    }
    else if (e.deltaY < 0){
        btn.style.animation = 'visible 1.5s forwards'
        clearTimeout(timerId)
        btn.style.display = 'block'
    }
}
