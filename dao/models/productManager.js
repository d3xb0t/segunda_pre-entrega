import callback from "../../callbacks.js";
import productModel from './product.js'

class ProductManager {

    constructor(){

    }

    async getProducts() {
        let resultado = await productModel.find()
        return resultado
    }

    async addProduct(producto) {
        const {title, description, price, thumbnail, code, stock, category, status} = producto
        const array = ['title', 'description', 'price', 'thumbnail', 'code', 'stock', 'category', 'status']
        if(callback.verifyObjectParameters(array, producto)){
        console.log("Los parametros deben estar completos")
        }else{
            let productos = await productModel.find()
            if(!callback.verifyUniqueness(code, productos)){
                await productModel.create({
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    category,
                    status
                })
            }else{
                console.error(
                    `El producto con código ${code} ya esta en la lista`
                )
            }
        }    
    }
}

export default ProductManager