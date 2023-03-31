let findProduct = function (id, products){
  console.log(id, products)
    return products.find((product) => product.id == id)
  }

let verifyUniqueness = function (code, products) {
    if (products.find((product) => product.code === code)) {
      return true;
    } else {
      return false;
    }
  }

let verifyObjectParameters = function (array, producto) {
  let flags = []
  flags = array.map((parametro) => Object.keys(producto).some(x => x == parametro))
  return flags.includes(false)
}

module.exports = {
    findProduct,
    verifyUniqueness,
    verifyObjectParameters
}
