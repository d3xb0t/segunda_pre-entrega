const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const CartManager = require('../dao/fileSystem/cartManager')

const cartManager = new CartManager('./carritos.json')

router.post('/', async(requests, response) => {
    let productos = requests.body
    let respuesta = await cartManager.addCart(productos)
    response.send(respuesta)         
})

router.post('/:cid/product/:pid', async(requests, response) => {
    let { cid , pid } = requests.params
    let carritos = await cartManager.getCarts()
    let carrito = carritos.find(carrito => carrito.id == cid)
    if(carrito){
        let producto = (carrito.products).find(producto => producto.id == pid)
        if(producto){
            producto.quantity ++

        }else{
            carrito.products.push({"id": pid, "quantity": 1})
        }
    }else{
        response.send("Not Found")
    }
    await cartManager.writeCarts(carritos)
    response.send("Done")
})

router.get('/', async(requests, response) => {
    let respuesta = await cartManager.getCarts()
    response.send(respuesta)
})

router.get('/:cid', async (requests, response) => {
    let carritos = await cartManager.getCarts()
    let { cid } = requests.params
    console.log(cid)
    let respuesta = carritos.find((carrito) => carrito.id == cid)
    if(respuesta){
        response.send(respuesta)
    }else{
        console.log("Not Found");
        response.send("Not Found")
    }

})

module.exports = router