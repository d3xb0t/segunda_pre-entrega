import callback from "../../callbacks.js"
import cartModel from "./cart.js"

class CartManager {

    constructor(){

    }

    async getCarts() {
        let resultado = await cartModel.find()
        return resultado
      }

    async addCart(producto){
        console.log(producto)
    }
    
}

export default CartManager