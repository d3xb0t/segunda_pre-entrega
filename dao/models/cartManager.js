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
        const { id, quantity } = producto
        let resultado = await cartModel.create(
            {
                cart: [id,
                quantity]
            }
        )
        return resultado
    }
    
}

export default CartManager