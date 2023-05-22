//const callback = require('../callbacks')
import callback from '../callbacks.js'
import productModel from '../dao/models/product.js'
//const ProductManager = require('../dao/fileSystem/productManager.js')
//const productManager = new ProductManager('./products.json')
//const express = require('express')
import express from "express"
const productRouter = express.Router()

productRouter.get('/', async (requests, response) => {
    try{
        let respuesta = await productModel.find()
        let { limit } = requests.query
        limit?response.send(respuesta.slice(0, limit)):response.send(respuesta)
    } catch(error){
            console.log("Cannot get products with mongoose")
    }
})

productRouter.post('/' , async (requests, response) => {
    let {title, description, price, code, stock, category, status} = requests.body
    let respuesta = await productModel.create(
        {   
            title, 
            description, 
            price, 
            code, 
            stock, 
            category, 
            status
        })
    response.send({status: 'Success', payload: respuesta})
})
/*
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
*/

/*
router.delete('/:pid', async (requests, response) => {
    let  { pid } = requests.params
    let respuesta = await productManager.deleteProduct(pid)
    response.send(respuesta)
})

router.put('/:pid', async (requests, response) => {
    let { pid } = requests.params
    let modificador = requests.body
    console.log(pid, modificador)
    let respuesta = await productManager.updateProduct(pid, modificador)
    response.send(respuesta)
})
*/

export default productRouter
