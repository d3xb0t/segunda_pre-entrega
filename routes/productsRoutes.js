const path = '../products.json'
const callback = require('../callbacks')
const ProductManager = require('../productManager.js')
const productManager = new ProductManager('./products.json')
const express = require('express')
const router = express.Router()

router.get('/', async (requests, response) => {
    let respuesta = await productManager.getProducts()
    let { limit } = requests.query
    limit?response.send(respuesta.slice(0, limit)):response.send(respuesta)
})

router.get('/:pid', async (requests, response) => {
    let respuesta = await productManager.getProducts()
    let { pid } = requests.params
    let item = callback.findProduct(pid, respuesta)
    if(item !== undefined){
        response.send(item)
    } else {
        response.send({'error': 'Not found'})
    }
})

router.post('/', async (requests, response) => {
    let producto = requests.body
    let respuesta = await productManager.addProduct(producto)
    response.send(respuesta)
})

module.exports = router
