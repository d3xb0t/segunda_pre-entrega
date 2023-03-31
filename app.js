const path = './products.json'
const ProductManager = require('./productManager.js')
const productManager = new ProductManager('./products.json')

const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))


app.get('/products', async (requests, response) => {
    let respuesta = await productManager.getProducts()
    let { limit } = requests.query
    limit?response.send(respuesta.slice(0, limit)):response.send(respuesta)
})

app.get('/products/:pid', async (requests, response) => {
    let respuesta = await productManager.getProducts()
    let { pid } = requests.params
    let item = respuesta.find((producto) => producto.id == pid)
    if(item !== undefined){
        response.send(item)
    } else {
        response.send({'error': 'Not found'})
    }
})

app.listen(8080, () => console.log('Listen in port 8080'))

/*
✓Se instalarán las dependencias a partir del comando npm install
✓Se echará a andar el servidor
✓Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.
✓Se corroborará que el servidor esté corriendo en el puerto 8080.
✓Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
✓Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
✓Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
*/