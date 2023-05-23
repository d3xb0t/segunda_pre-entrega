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

    async deleteProduct(id) {
        let response = await productModel.deleteOne({_id: id})
        return response
    }

    async updateProduct(id, modificador) {
        let {price} = modificador
        console.log(id, price)
        let response = await productModel.updateOne({_id: id}, {price: price})
        return response
    }

}

export default ProductManager


/*

let products = await productModel.find()
        let item = callback.findProduct(id, products)
        if (item) {
        products = products.filter((product) => product.id !== id)
        if(!(callback.findProduct(id, products))){
            await fs.promises.writeFile(this.#path, JSON.stringify(products)) 
            console.log(`the product with id ${id} has been removed`) 
        }  
        } else {
            console.log("Not Found")
        }

*/