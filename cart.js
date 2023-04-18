const md5 = require('md5')

class Cart {
    id = md5(Date.now())
    products = []

    constructor(id){
        this.id = id?id:this.id
    }
}

module.exports = Cart