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

socket.on('log', data => {
    display.innerHTML+=JSON.stringify(data)
})









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





