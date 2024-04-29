function show(){
    let show =  document.getElementById('show')
    let refresh = document.getElementById('refresh')
    let tableShow = show.getElementsByTagName('tbody')[0]
    let tableRefresh = refresh.getElementsByTagName('tbody')[0]
    let lineCount = 0
    tableShow.innerHTML += `
    <tr>
        <td><b>Status</b></td>
        <td><b>Order</b></td>
        <td><b>Date</b></td>
    </tr>
    `
    tableRefresh.innerHTML += `
    <tr>
        <td><input type="text" placeholder="name" value=''></td>
        <td><input type="text" placeholder="cost" value=''></td>
        <td><input type="text" placeholder="short description" value=''></td>
        <td><textarea placeholder="long description" value=''></textarea></td>
        <td><input type="text" placeholder="img-src" value=''></td>
        <td><button onclick="update(${lineCount})">update</button></td>
        <td><button class="danger">delete</button></td>
    </tr>
    `
    lineCount ++
}

function add(){
    let add = document.getElementById('add')
    console.log(add['children'][1]['value'])
    console.log(add['children'][2]['value'])
    console.log(add['children'][3]['value'])
    console.log(add['children'][4]['value'])
    console.log(add['children'][5]['value'])
}

function update(index){
    let refresh = document.getElementById('refresh')
    let tr = refresh.getElementsByTagName('tr')

    let td = tr[index].getElementsByTagName('td')
    console.log(td[0]['children'][0]['value'])
    console.log(td[1]['children'][0]['value'])
    console.log(td[2]['children'][0]['value'])
    console.log(td[3]['children'][0]['value'])
    console.log(td[4]['children'][0]['value'])
    
}

window.onload = () => {show()}