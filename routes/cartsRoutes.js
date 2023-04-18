const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')

class Cart {
    id = md5(Date.now())
    products = []

    constructor(id){
        this.id = id?id:this.id
    }
}

class CartManager {
    #path = './carritos.json'

    constructor(path) {
        this.path = path?path:this.path
    }

    async addCart(productos) {
        console.log(productos)
        const cart = new Cart()
        
        let resultado = await fs.promises.readFile(this.#path, 'utf-8')
        let carritos = JSON.parse(resultado)
        for( let i= 0, { length }= productos; i < length; i++){
            cart.products.push(productos[i])
        }
        carritos.push(cart)
        await fs.promises.writeFile(this.#path, JSON.stringify(carritos))
    }

    async getCarts() {
        let resultado = await fs.promises.readFile(this.#path, 'utf-8')
        return JSON.parse(resultado)
      }

    async writeCarts(objeto) {
        await fs.promises.writeFile(this.#path, JSON.stringify(objeto))
    } 
}

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