import mongoose from "mongoose"
const productCollection = "productos"
const productSchema = new mongoose.Schema({
                        title: {
                            type: String,
                            required: true
                        },
                        description: {
                            type: String,
                            required: true
                        },
                        price: {
                            type: Number,
                            required: true
                        },
                        thumbnail: {
                            type: String,
                            required: true,
                            default: "No figura"
                        },
                        code: {
                            type: String,
                            required: true,
                            unique: true
                        },
                        stock: {
                            type: Number,
                            required: true
                        },
                        category: {
                            type: String,
                            required: true
                        },
                        status: {
                            type: Boolean,
                            required: true,
                            default: true
                        }
})

const productModel = mongoose.model(productCollection, productSchema)
export default productModel

