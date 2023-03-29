const fs = require('fs')

class Product {
  id = null;
  title = null;
  description = null;
  price = null;
  thumbnail = null;
  code = null;
  stock = null;

  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id ? id : this.id;
    this.title = title ? title : this.title;
    this.description = description ? description : this.description;
    this.price = price ? price : this.price;
    this.thumbnail = thumbnail ? thumbnail : this.thumbnail;
    this.code = code ? code : this.code;
    this.stock = stock ? stock : this.stock;
  }

  toString() {
    return `Producto con ID:${this.id} y Código:${this.code}`;
  }
}

class ProductManager {
  id = 0;
  products = [];
  path = './products.json'
					
  constructor(path) {
    this.path = path?path:this.path
  }

  verifyUniqueness(code, products) {
    if (products.find((product) => product.code === code)) {
      return true;
    } else {
      return false;
    }
  }

  verifyObjectParameters(array, producto) {
    let flags = []
    flags = array.map((parametro) => Object.keys(producto).some(x => x == parametro))
    return flags.includes(false)
}

  async addProduct(producto) {
    const array = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
    if(this.verifyObjectParameters(array, producto)){
      console.log("Los parametros deben estar completos")
    }else{
        let resultado = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(resultado)
        if (!this.verifyUniqueness(producto.code, products)) {
          this.id++;
          const item = new Product(
            this.id,
            producto.title,
            producto.description,
            producto.price,
            producto.thumbnail,
            producto.code,
            producto.stock
          );
          products.push(item);
          await fs.promises.writeFile(this.path, JSON.stringify(products))
        } else {
          console.error(
            `El producto con código ${producto.code} ya esta en la lista`
          );
        }
    }
  }

  findProduct(id, products){
    return products.find((product) => product.id === id)
  }


  async deleteProduct(id) {
    let resultado = await fs.promises.readFile(this.path, 'utf-8')
    let products = JSON.parse(resultado)
    let item = products.find((product) => product.id === id)
    if (item) {
      products = products.filter((product) => product.id !== id)
      if(!(this.findProduct(id, products))){
        await fs.promises.writeFile(this.path, JSON.stringify(products)) 
        console.log(`the product with id ${id} has been removed`) 
      }  
    } else {
      console.log("Not Found")
    }
  }

  async updateProduct(id, modificador) {
    if (Object.keys(modificador).includes('id')){
      return console.error("It is not allowed to modify the product id")
    }
    let resultado = await fs.promises.readFile(this.path, 'utf-8')
    let products = JSON.parse(resultado)
    let item = this.findProduct(id, products)
    if (item) {
      try{
        Object.keys(modificador).map((propiedad) => item[propiedad] = modificador[propiedad])  
      } catch(err) {
        console.log(`${err} update failed`)
      }
    } else {
      console.log("Not Found")
    }
    await fs.promises.writeFile(this.path, JSON.stringify(products))  
  }

  async getProducts() {
    let resultado = await fs.promises.readFile(this.path, 'utf-8')
    console.log(JSON.parse(resultado))
  }

  async getProductByid(id) {
    let resultado = await fs.promises.readFile(this.path, 'utf-8')
    let products = JSON.parse(resultado)
    let item = this.findProduct(id, products)
    if (item) {
      console.log(item);
    } else {
      console.log("Not Found");
    }
  }
}

//Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager('./products.json')
//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

async function driver() {
  await productManager.getProducts()
  
/*
Se llamará al método “addProduct” con los campos:
-title: “producto prueba”
-description:”Este es un producto prueba”
-price:200,
-thumbnail:”Sin imagen”
-code:”abc123”,
-stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
*/

  let producto = {
    title: 'producto prueba2',
    description: 'Este es un producto prueba2',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 10
  }

  await productManager.addProduct(producto)
  
  //Se agrega segundo objeto para verificar comportamiento en el incremento del campo 'id'
  producto = {
    title: 'producto prueba2',
    description: 'Este es un producto prueba2',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc1234',
    stock: 10
  }

  await productManager.addProduct(producto)

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
  await productManager.getProducts()


//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
  await productManager.getProductByid(3)


//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
  producto = {
    price: 1000000,
    stock: 1000000,
  }

  await productManager.updateProduct(2, producto)

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
  await productManager.deleteProduct(1)

}

driver()
