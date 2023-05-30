import ProductManager from "../dao/controllers/productManager.js"
import express from "express"

const productManager = new ProductManager()
const realTimeProductsRouter = express.Router()

realTimeProductsRouter.get('/', (requests, response) => {
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
    
})

realTimeProductsRouter.post('/', async(requests, response) => {
    let producto = requests.body
    let respuesta = await productManager.addProduct(producto)
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
})

realTimeProductsRouter.delete('/', async(requests, response) => {
    const id = requests.body.id
    const msg = await productManager.deleteProduct(id)
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
})


export default realTimeProductsRouter