function show(){
    const show =  document.getElementById('show')
    const refresh = document.getElementById('refresh')
    const tableShow = show.getElementsByTagName('tbody')[0]
    const tableRefresh = refresh.getElementsByTagName('tbody')[0]
    $.get('/get_orders',
        (data) => {
            for (row of data){
                console.log(row)
                //remake on checkbox
                tableShow.innerHTML += `
                <tr>
                    <td><b>${row[1]}</b></td>
                    <td><b>${row[2]}</b></td>
                    <td><b>${row[3]}</b></td>
                </tr>
                `
            }
        }
    );
    $.get('/get_products',
        (data) => {
            let lineCount = 1
            for (row of data){
//                console.log(row)
//                console.log(tableRefresh)
                tableRefresh.innerHTML += `
                <tr id=${'remove' + lineCount}>
                    <td><input type="text" placeholder="name" value='${row[1]}'></td>
                    <td><input type="text" placeholder="cost" value='${row[2]}'></td>
                    <td><input type="text" placeholder="short description" value='${row[3]}'></td>
                    <td><textarea placeholder="long description">${row[4]}</textarea></td>
                    <td><input type="text" placeholder="img-src" value='${row[5]}'></td>
                    <td><button onclick="update(${lineCount})">update</button></td>
                    <td><button class="danger" onclick='deleteCard(${'remove' + lineCount})'>delete</button></td>
                </tr>
                `
                lineCount ++
            }
        }
    );
}

function add(){
    const add = document.getElementById('add')

//    console.log(add['children'][1]['value'])
//    console.log(add['children'][2]['value'])
//    console.log(add['children'][3]['value'])
//    console.log(add['children'][4]['value'])
//    console.log(add['children'][5]['value'])
    let key = true
    for (let i = 1; i < 5; i++){
        if (add['children'][i]['value'] == ''){
            key = false
            break
        }
    }
    if (key){
        if (add['children'][5]['value'] == ''){add['children'][5]['value'] = "../static/img/040_original 1.svg"}
        const refresh = document.getElementById('refresh')
        const tableRefresh = refresh.getElementsByTagName('tbody')[0]
        const tr = refresh.getElementsByTagName('tr')
        const index = tr.length
        tableRefresh.innerHTML += `
        <tr id=${'remove' + index}>
            <td><input type="text" placeholder="name" value='${add['children'][1]['value']}'></td>
            <td><input type="text" placeholder="cost" value='${add['children'][2]['value']}'></td>
            <td><input type="text" placeholder="short description" value='${add['children'][3]['value']}'></td>
            <td><textarea placeholder="long description">${add['children'][4]['value']}</textarea></td>
            <td><input type="text" placeholder="img-src" value='${add['children'][5]['value']}'></td>
            <td><button onclick="update(${index})">update</button></td>
            <td><button class="danger" onclick='deleteCard(${'remove' + index})'>delete</button></td>
        </tr>
        `
        add['children'][1]['value'] = ''
        add['children'][2]['value'] = ''
        add['children'][3]['value'] = ''
        add['children'][4]['value'] = ''
        add['children'][5]['value'] = ''
    }
}

function update(index){
    const refresh = document.getElementById('refresh')
    const tr = refresh.getElementsByTagName('tr')
    const td = tr[index].getElementsByTagName('td')

    console.log(td[0]['children'][0]['value'])
    console.log(td[1]['children'][0]['value'])
    console.log(td[2]['children'][0]['value'])
    console.log(td[3]['children'][0]['value'])
    console.log(td[4]['children'][0]['value'])

    
}

function deleteCard(index){
    const refresh = document.getElementById('refresh')
    const tableRefresh = refresh.getElementsByTagName('tbody')[0]
    console.log(index)// я не могу понять каким образом отправляется сразу нода
    tableRefresh.removeChild(index)
}
window.onload = () => {show()}
