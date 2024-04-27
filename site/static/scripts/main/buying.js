const catalog = document.getElementById('catalog_cards')

function addProduct(name){
    $.get('/addItem', {
        'product': name,
        'login': seseion_login,
        'password': seseion_login
    });
}
function renderProductsCard(){
    $.get('/get_products',
        (data) => {
            for (row of data){
                console.log(row)
                catalog.innerHTML += `
                <div class="card">
                    <img src="${row[5]}" alt="product">
                    <p>${row[1]}</p>
                    <p>Цена: ${row[2]}</p>
                    <button onclick="addProduct('${row[0]}')">добавить</button>
                </div>`
            }
        }
    );
}

window.onload = () => {renderProductsCard()}