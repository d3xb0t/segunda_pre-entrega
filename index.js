const ProductManager = require('./productManager.js')
const path = './products.json'



//Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager(path)
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
