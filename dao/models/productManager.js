import callback from "../../callbacks.js";
import productModel from './product.js'

class ProductManager {

    constructor(){

    }

    async getProducts() {
        let resultado = await productModel.find()
        return resultado
    }

}

export default ProductManager