const refresh = document.getElementById('refresh')
const tr = refresh.getElementsByTagName('tr')
const show =  document.getElementById('show')
const tableShow = show.getElementsByTagName('tbody')[0]
const tableRefresh = refresh.getElementsByTagName('tbody')[0]
const add = document.getElementById('add')

function OpenPannel(){
    const admin_password = document.getElementById('admin_password')
    const admin_login = document.getElementById('admin_login')
}

function refreshRender(row){
    tableRefresh.innerHTML += `
    <tr id=${'remove' + row[0]}>
        <td><input type="text" placeholder="name" value='${row[1]}'></td>
        <td><input type="text" placeholder="cost" value='${row[2]}'></td>
        <td><input type="text" placeholder="short description" value='${row[3]}'></td>
        <td><textarea placeholder="long description">${row[4]}</textarea></td>
        <td><input type="text" placeholder="img-src" value='${row[5]}'></td>
        <td><button onclick="update(${'remove' + row[0]})">update</button></td>
        <td><button class="danger" onclick='deleteCard(${'remove' + row[0]})'>delete</button></td>
    </tr>
    `
}

function show_panel(){
    $.get('/get_orders',
        (data) => {
            for (row of data){
                //remake on checkbox
                tableShow.innerHTML += `
                <tr>
                    <td><b>${row[1]}</b></td>
                    <td><b>${row[2]}</b></td>
                    <td><b>${row[3]}</b></td>
                </tr>`
            }
        }
    );
    $.get('/get_products',
        (data) => {
            for (row of data){
                refreshRender(row)
            }
        }
    );
}

function add_card(){
    let key = true
    for (let i = 1; i < 5; i++){
        if (add['children'][i]['value'] == ''){
            key = false
            break
        }
    }
    if (key){
        if (add['children'][5]['value'] == ''){add['children'][5]['value'] = "../static/img/040_original 1.svg"}
        let index = Number(tr[tr.length - 1]['id'][(tr[tr.length - 1]['id']).length - 1]) + 1
        if (isNaN(index)){
            index = 1
        }
        const data = [index, add['children'][1]['value'], add['children'][2]['value'], add['children'][3]['value'], add['children'][4]['value'], add['children'][5]['value']]
        $.get('/add_card', {
            'admin_password'   : admin_password.value,
            'admin_login'      : admin_login.value,
            'name'             : data[1],
            'cost'             : data[2],
            'short-description': data[3],
            'long-description' : data[4],
            'img-src'          : data[5]
        }, (response) => {
            if (response === 'true'){
                refreshRender(data)
                add['children'][1]['value'] = ''
                add['children'][2]['value'] = ''
                add['children'][3]['value'] = ''
                add['children'][4]['value'] = ''
                add['children'][5]['value'] = ''
            } else{
                alert('send Error')
            }
        }
        );
    }
}

function update(index){

//    console.log(td[0]['children'][0]['value'])
//    console.log(td[1]['children'][0]['value'])
//    console.log(td[2]['children'][0]['value'])
//    console.log(td[3]['children'][0]['value'])
//    console.log(td[4]['children'][0]['value'])

    
}

function deleteCard(index){
    console.log(index)// я не могу понять каким образом отправляется сразу нода
    tableRefresh.removeChild(index)
}
window.onload = () => {show_panel()}
