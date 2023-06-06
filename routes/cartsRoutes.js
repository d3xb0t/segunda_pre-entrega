import express, { request } from "express"
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
        response.send(respuesta)
        //response.send({status: "Success", payload: respuesta})
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
    let respuesta = await cartManager.addProductInCart(cid, pid)
    response.send({status: "Success", payload: respuesta})
    /*
    try{
        let carrito = await cartModel.findOne({_id: cid})
        let itemIndex = carrito.products.findIndex(p => p.id == pid)
        if(itemIndex > -1){
            let productItem = carrito.products[itemIndex]
            productItem.quantity = productItem.quantity + 1
            carrito.products[itemIndex] = productItem
        }else{
            carrito.products.push({id: pid, quantity: 1})
        }
        carrito = await carrito.save()
        response.status(201).send(carrito)
    }catch(error){
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }
    */
})

cartRouter.put('/:cid/product/:pid', async(requests, response) => {
    let { cid , pid } = requests.params
    let { quantity } = requests.body
    try {
        let carrito = await cartModel.findOne({_id: cid})
        let itemIndex = carrito.products.findIndex(p => p.id == pid)
        if(itemIndex > -1){
            let productItem = carrito.products[itemIndex]
            productItem.quantity = quantity
            carrito.products[itemIndex] = productItem
            carrito = await carrito.save()
            response.status(201).send(carrito)
        }else{
            response.send({status: "fail", payload: 'producto no existe'})
        }
    } catch (error) {
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }
})

//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
cartRouter.put('/:cid', async (requests, response) => {
    let arrayProductos = requests.body
    let { cid } = requests.params
    console.log(cid)
    for(let i= 0, { length } = arrayProductos; i < length; i++){
        let pid = arrayProductos[i]._id
        let respuesta = await cartManager.addProductInCart(cid, pid)
    }
    //let respuesta = await cartManager.addProductInCart(cid, pid)
    response.send({status: "Success"}) 
})

cartRouter.delete('/:cid/product/:pid', async(requests, response) => {
    let { cid , pid } = requests.params
    try {
        let carrito = await cartModel.findOne({_id: cid})
        let itemIndex = carrito.products.findIndex(p => p.id == pid)
        if(itemIndex > -1){
            carrito.products.splice(itemIndex, 1)
            carrito = await carrito.save()
        }
        response.status(201).send(carrito)
    } catch (error) {
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }    
})

cartRouter.delete('/:cid', async (requests, response) => {
    let { cid } = requests.params
    try {
        let carrito = await cartModel.findOne({_id: cid})
        while(carrito.products.length > 0) {
            carrito.products.pop()
            carrito = await carrito.save()
        }
        response.status(201).send(carrito)
    } catch (error) {
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error}) 
    }
    
})
/*

    Además, agregar al router de carts los siguientes endpoints:
    DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado. OK

    PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    
    
    PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body OK
    DELETE api/carts/:cid deberá eliminar todos los productos del carrito OK
    Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.



*/
export default cartRouter