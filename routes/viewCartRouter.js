import express from "express"
import cartModel from "../dao/models/cart.js"

const viewCartRouter = express.Router()

viewCartRouter.get('/', async(requests, response) => {
    let cid = "647f5fb63b9abef1270a2453"
    let resultado = await cartModel.findById({_id: cid}).populate('products.id')

    let array = []

    resultado.products.map(p => {
        array.push({
            title: p.id.title,
            description: p.id.description,
            price: p.id.price,
            quantity: p.quantity
        })
    })
    console.log(array)
    response.render('cart', array)
})

export default viewCartRouter