function Buy(){
    const h4 = document.getElementsByTagName('h4')
    let orders = '_'
    for (order of h4){
        orders += '|' + order.textContent
    }
    $.get('/add_order', {
        'order' : orders
    }, (response)=> {
    if(response){
        window.location.replace('/')
    }})
    .fail(()=>console.log(false))
}