const socket = io()
const formPostProduct = document.querySelector('#formPostProduct')
const formDeleteProduct = document.querySelector( '#formDeleteProduct')
const display = document.querySelector('#display')

formPostProduct.onsubmit = (e) => {
    e.preventDefault()

    const producto = {
        title: formPostProduct[0].value,
        description: formPostProduct[1].value,
        price: formPostProduct[2].value,
        thumbnail: formPostProduct[3].value,
        code: formPostProduct[4].value,
        stock: formPostProduct[5].value,
        category: formPostProduct[6].value,
        status: formPostProduct[7].value
    }
    console.log(producto)
    socket.emit('message1', producto)

}

formDeleteProduct.onsubmit = (e) => {
    e.preventDefault()

    const idProducto = {
        id: formDeleteProduct[0].value
    }

    console.log(idProducto)
    socket.emit('message2', idProducto)
}

const start = () => {
    const startApp = {
        date: Date.now()
    }
    socket.emit('startApp', startApp)
}

socket.on('log', data => {
    fowardData(data)
})


const fowardData = (data) => {
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



