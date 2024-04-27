const section = document.getElementsByTagName('section')[0]
function renderShoperCards(products){
    $.get('/get_shoper', (data) => {
        for (row of data){
        console.log(products)
        console.log(data)
            section.innerHTML += `
            <div id="${products[row][0]}">
                <h4>${products[row][1]}</h4>
                <h5>${products[row][2]}</h5>
                <h6>${products[row][4]}</h6>
                <button onclick="deleteCard(${products[row][0]})">delete</button>
            </div>`
        }
    })
}

function getProducts(){
    $.get('/get_products', (data) => {
        let products = data
        renderShoperCards(products)
    })
}

function deleteCard(index){
    let div = document.getElementById(index)
    section.removeChild(div)
}

window.onload = () => {getProducts()}
