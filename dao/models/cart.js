import mongoose from "mongoose"
const cartCollection = "carts"

const subSchema = new mongoose.Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos'
    },
    quantity: Number
    /*
    id: String,
    quantity: Number,
    _id: false
    */
})
const cartSchema = new mongoose.Schema({
    products: [subSchema]    
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel