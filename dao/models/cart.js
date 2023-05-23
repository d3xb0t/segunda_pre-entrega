import mongoose from "mongoose"
const cartCollection = "carts"

const subSchema = new mongoose.Schema({
    id: String,
    quantity: Number,
    _id: false
})
const cartSchema = new mongoose.Schema({
    cart: [subSchema]    
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel