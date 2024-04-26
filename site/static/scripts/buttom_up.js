const btn_up = document.getElementById('up')
let timerId = setTimeout(()=>{btn_up.style.display = 'none'}, 500)

function button_up_hide(){
    btn_up.style.animation = 'unvisible 1.5s forwards'
    timerId = setTimeout(()=>{btn_up.style.display = 'none'}, 500)
}

window.onwheel = (e) =>{
    if (e.deltaY > 0 || $(window).scrollTop() <= 100){
        button_up_hide()
    }
    else if (e.deltaY < 0){
        btn_up.style.animation = 'visible 1.5s forwards'
        clearTimeout(timerId)
        btn_up.style.display = 'block'
    }
}
