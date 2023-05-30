import callback from '../callbacks.js'
import ProductManager from '../dao/controllers/productManager.js'
import express from "express"

const productRouter = express.Router()
const productManager = new ProductManager()

productRouter.get('/', async (requests, response) => {
    try{
        let respuesta = await productManager.getProducts()
        let { limit } = requests.query
        limit?response.send(respuesta.slice(0, limit)):response.send(respuesta)
    } catch(error){
            console.log("Cannot get products with mongoose")
    }
})

productRouter.get('/:pid', async (requests, response) => {
    let {pid} = requests.params
    let respuesta = await productManager.getProductByid(pid)
    response.send({status: 'Success', payload: respuesta})
})

productRouter.post('/' , async (requests, response) => {
    let producto = requests.body
    let respuesta = await productManager.addProduct(producto)
    response.send(respuesta)
})


productRouter.delete('/:pid', async (requests, response) => {
    let  { pid } = requests.params
    let respuesta = await productManager.deleteProduct(pid)
    response.send({status: 'Success', payload: respuesta})
})


productRouter.put('/:pid', async (requests, response) => {
    let { pid } = requests.params
    let modificador = requests.body
    console.log(pid, modificador)
    let respuesta = await productManager.updateProduct(pid, modificador)
    response.send({status: 'Success', payload: respuesta})
})



export default productRouter
