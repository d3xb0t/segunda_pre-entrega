let findProduct = function (id, products){
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

let callback= {
    findProduct,
    verifyUniqueness,
    verifyObjectParameters
}

export default callback
