const login_screen = document.getElementById('login-screen')
const user = document.getElementById('user')
function login_in(){
    login_screen.style.animation = 'visible 1.5s forwards'
    login_screen.style.display = 'flex'
    login_screen.style.zIndex = 1
}
function login_out(login){
    user.innerText = login
    user.setAttribute('onclick','LogOut()')
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
                login_out(login)
            }
        }
        );
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
                login_out(login)
            }
        }
        );
    }
}
function LogOut(){
    user.innerText = 'Войти'
    user.setAttribute('onclick','login_in()')
}