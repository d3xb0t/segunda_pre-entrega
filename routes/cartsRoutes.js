import express from "express"
import CartManager from "../dao/controllers/cartManager.js"
import cartModel from "../dao/models/cart.js"

const cartRouter = express.Router()
const cartManager = new CartManager()


cartRouter.get('/', async(requests, response) => {
    let respuesta = await cartManager.getCarts()
    response.send({status: "Success", payload: respuesta})
})



cartRouter.get('/:cid', async (requests, response) => {
    let {cid} = requests.params
    try{
        let respuesta = await cartModel.findById({_id: cid})
        response.send({status: "Success", payload: respuesta})
    } catch(error) {
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }
})


cartRouter.post('/', async(requests, response) => {
    let producto = requests.body
    let respuesta = await cartManager.addCart(producto)
    response.send({status: "Success", payload: respuesta})
})


cartRouter.post('/:cid/product/:pid', async(requests, response) => {
    let { cid , pid } = requests.params
    try{
        let carrito = await cartModel.findOne({_id: cid})
        let itemIndex = carrito.products.findIndex(p => p.id == pid)
        if(itemIndex > -1){
            let productItem = carrito.products[itemIndex]
            productItem.quantity = productItem.quantity + 1
            carrito.products[itemIndex] = productItem
            //carrito = await carrito.save()
            //response.status(201).send(carrito)
        }else{
            carrito.products.push({id: pid, quantity: 1})
            //carrito = await carrito.save()
        }
        carrito = await carrito.save()
        response.status(201).send(carrito)
    }catch(error){
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }

    /*
    let objeto = await cartModel.findOne({_id: cid})
    //console.log(objeto.cart)
    let itemIndex = objeto.cart.findIndex(p => p.id == pid)
    //console.log(itemIndex)
    if(itemIndex > -1){
        let productItem = objeto.cart[itemIndex]
        console.log(productItem)
        productItem.quantity = productItem.quantity + 1
        console.log(productItem)
        objeto.cart[itemIndex] = productItem
    }
    objeto = await objeto.save()
    response.status(201).send(objeto)
    */
})

/*

cartRouter.post('/', async(requests, response) => {
    let productos = requests.body
    let respuesta = await cartManager.addCart(productos)
    response.send(respuesta)         
})

cartRouter.post('/:cid/product/:pid', async(requests, response) => {
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

cartRouter.get('/', async(requests, response) => {
    let respuesta = await cartManager.getCarts()
    response.send(respuesta)
})

cartRouter.get('/:cid', async (requests, response) => {
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
*/
export default cartRouter