const ProductManager = require('./productManager.js')
const path = './products.json'
const express = require('express')
const productManager = new ProductManager('./products.json')

const app = express()
app.use(express.urlencoded({extended: true}))


app.get('/products', async (requests, response) => {
    let respuesta = await productManager.getProducts()
    let { limit } = requests.query
    if(limit){
        let array = []
        for(i= 0; i < limit; i++){
            array.push(respuesta[i])
        }
        response.send(array)
    } else {
        response.send(respuesta)
    }
})

app.get('/products/:pid', async (requests, response) => {
    let respuesta = await productManager.getProducts()
    let { pid } = requests.params
    let item = respuesta.find((producto) => producto.id == pid)
    if(item !== undefined){
        response.send(item)
    } else {
        let message = {'error': 'Not found'}
        response.send(message)
    }
})

app.listen(8080, () => console.log('Listen in port 8080'))