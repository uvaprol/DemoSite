function addProduct(name){
    alert(true)
    $.get('/addItem', {
        'product': name,
        'login': seseion_login,
        'password': seseion_login
    });
}
function renderProductsCard(){
    $.get('/get_prosucts', 
        (data) => {
            for (row of data){
                
            }
        }
    );
}
