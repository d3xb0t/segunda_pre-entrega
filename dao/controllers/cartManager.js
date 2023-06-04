import callback from "../../callbacks.js"
import cartModel from "../models/cart.js"

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
                products: [
                    {
                        id,
                        quantity
                    }
                ]
            }
        )
        return resultado
    }


    //TEST

    async addProductInCart(cid, pid){
    
        try{
            let carrito = await cartModel.findOne({_id: cid})
            let itemIndex = carrito.products.findIndex(p => p.id == pid)
            if(itemIndex > -1){
                let productItem = carrito.products[itemIndex]
                productItem.quantity = productItem.quantity + 1
                carrito.products[itemIndex] = productItem
            }else{
                carrito.products.push({id: pid, quantity: 1})
            }
            carrito = await carrito.save()
            return {}
        }catch(error){
            console.log("Imposible conectarse a la base de datos o id inexistente")
            return {status: "Impossible task", payload: error}
        }

    }



    //FIN TEST
    
}

export default CartManager