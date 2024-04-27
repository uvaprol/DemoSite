const catalog = document.getById('catalog_cards')

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
                catalog.innerHTML += `
                <div class="card">
                    <img src="${row[5]}" alt="product">
                    <p>${row[1]}</p>
                    <p>Цена: ${row[2]}</p>
                    <button onclick="addProduct('${row[1]}')">добавить</button>
                </div>`
            }
        }
    );
}
