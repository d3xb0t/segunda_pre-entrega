import callback from "../../callbacks.js"
import cartModel from "../models/cart.js"

class CartManager {

    constructor(){

    }

    async getCarts() {
        
        let resultado = await cartModel.find().populate('products.id')
        return resultado
        
        /*
        let cart = await cartModel.find({_id: '647e0075d5b6dfc9cd311b41'}).populate('products.id')
        console.log(JSON.stringify(cart, null, '\t'))
        */
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