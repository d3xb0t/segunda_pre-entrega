const ProductManager = require('../productManager')
const productManager = new ProductManager()
const products = require('../products.json')

const express = require('express')
const router = express.Router()


router.get('/', (requests, response) => {
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
    
})

router.post('/', async(requests, response) => {
    let producto = requests.body
    let respuesta = await productManager.addProduct(producto)
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
})


module.exports = router