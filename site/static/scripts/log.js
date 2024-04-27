const login_screen = document.getElementById('login-screen')
const user = document.getElementById('user')
const h1 = login_screen.getElementsByTagName('h1')
const a = login_screen.getElementsByTagName('a')
const button = login_screen.getElementsByTagName('button')
let seseion_login, seseion_password
function login_in(){
    login_screen.style.animation = 'visible 1.5s forwards'
    login_screen.style.display = 'flex'
    login_screen.style.zIndex = 1
}
function login_out(login){
    if (login != undefined){
        user.innerText = login
        user.setAttribute('onclick','LogOut()')
    }
    login_screen.style.animation = 'unvisible 1.5s forwards'
    setTimeout(()=>
    {
        login_screen.style.display = 'none'
        login_screen.style.zIndex = -1
    }, 500)
}
function send_log(){
    const login = $("#log").val();
    const password = $("#password").val();
    if (login != '' && password != ''){
        $.get("/LogIn", {
            'login'   : login,
            'password': password
        },
        (data) => {
            console.log(data)
            if (data[0]){
                seseion_login = login
                seseion_password = password
                login_out(login)
            }
        }
        );
    }
}
function ChangeLog(log){
    if (log){
        h1[0].innerText = 'Авторизация'
        a[0].innerText = 'зарегистрироваться'
        a[0].setAttribute('onclick','ChangeLog(false)')
        button[1].setAttribute('onclick','send_log()')
        button[1].innerText ='Войти'
    }
    else{
        h1[0].innerText = 'Регистрация'
        a[0].innerText = 'Войти'
        a[0].setAttribute('onclick','ChangeLog(true)')
        button[1].setAttribute('onclick','Regestration()')
        button[1].innerText ='Зарегистрироваться'
    }
    }

function Regestration(){
    let login = $("#log").val();
    let password = $("#password").val();
    if (login != undefined && password != undefined){
        $.get("/SignIn", {
        'login'   : login,
        'password': password
        },
        (data) => {
            console.log(data)
            if (data[0]){
                seseion_login = login
                seseion_password = password
                login_out(login)
            }
        }
        );
    }
}
