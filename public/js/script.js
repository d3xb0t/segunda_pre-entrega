const socket = io()
const display = document.querySelector('#display')
const string = "string"

socket.emit('message', string)
socket.on('log', data => {
    console.log(data)
})


const getProducts = async () => {
    fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(data => renderPage(data))
    .catch(error => console.log(error))
}


function renderPage(data){

    display.innerHTML = " "
    let miTabla = '<table> <thead class="shadow"><tr><th scope="col">ID</th><th scope="col">TITLE</th><th scope="col">STOCK</th><th scope="col">PRICE</th><th scope="col">DESCRIPTION</th><th scope="col">STATUS</th></tr></thead>'
        for(let i= 0, { length }= data; i<length; i++){
            miTabla += "<tr>"
            miTabla += '<th scope="row">'+data[i].id+'</th>'
            miTabla += "<td>"+data[i].title+"</td>"
            miTabla += "<td>"+data[i].stock+"</td>"
            miTabla += "<td>"+data[i].price+"</td>"
            miTabla += "<td>"+data[i].description+"</td>"
            miTabla += "<td>"+data[i].status+"</td>"
            miTabla += "</tr>"
        }
        miTabla += "</table>"
        const tabla = document.createElement("div")
        tabla.className = "tabla"
        tabla.innerHTML = miTabla
        display.appendChild(tabla)

        return
}

// logica de control del frontend
const boton_top = document.querySelector('#boton_top')
const boton_bottom = document.querySelector('#boton_buttom')

const top_layer = document.querySelector('#top')
const bottom_layer = document.querySelector('#buttom')
top_layer.className = "color_green"
bottom_layer.className = "color_blue"

boton_top.onclick = () => {
    bottom_layer.className = "hidden"
    top_layer.className = "color_green"
}

boton_bottom.onclick = () => {
    top_layer.className = "hidden"
    bottom_layer.className = "color_blue"
}
// fin

start()

getProducts()


