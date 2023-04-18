const md5 = require('md5')
const fs = require('fs')
const Cart = require('./cart.js')

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

module.exports = CartManager