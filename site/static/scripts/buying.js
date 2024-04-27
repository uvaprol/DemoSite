function addProduct(name){
    alert(true)
    $.get('/addItem', {
        'product': name,
        'login': seseion_login,
        'password': seseion_login
    });
}