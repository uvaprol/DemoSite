const login_screen = document.getElementById('login-screen')
function login_in(){
    login_screen.style.animation = 'visible 1.5s forwards'
    login_screen.style.display = 'flex'
    login_screen.style.zIndex = 1
}
function login_out(){
    login_screen.style.animation = 'unvisible 1.5s forwards'
    setTimeout(()=>
    {
        login_screen.style.display = 'none'
        login_screen.style.zIndex = -1
    }, 500)
}
function send_log(){
    const login = $("log").val();
    const password = $("password").val();
    if (login != '' && password != ''){
        $.get("/LogIn", {
            'login'   : login,
            'paswword': password
        })
        login_out()
    }
}
function SignIn(){
    let h1 = login_screen.getElementsByTagName('h1')
    let a = login_screen.getElementsByTagName('a')
    let button = login_screen.getElementsByTagName('button')
    h1[0].innerText = 'Регистрация'
    a[0].style.display = 'none'
    button[1].setAttribute('onclick','Regestration()')
    button[1].innerText ='Зарегистрироваться'
    }

function Regestration(){
    const login = $("log").val();
    const password = $("password").val();
    if (login != '' && password != ''){
        $.get("/SignIn", {
            'login'   : login,
            'paswword': password
        })
    }
}