import express from "express"
import cartModel from "../dao/models/cart.js"

const viewCartRouter = express.Router()

viewCartRouter.get('/:cid', async(requests, response) => {
    let cid = requests.params.cid
    console.log(cid)
    let resultado = await cartModel.findOne({_id: cid}).populate('products.id')

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