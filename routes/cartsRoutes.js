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
        }else{
            carrito.products.push({id: pid, quantity: 1})
        }
        carrito = await carrito.save()
        response.status(201).send(carrito)
    }catch(error){
        console.log("Imposible conectarse a la base de datos o id inexistente")
        response.send({status: "Impossible task", payload: error})
    }
})

/*

    Además, agregar al router de carts los siguientes endpoints:
    DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
    PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
    Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.



*/
export default cartRouter