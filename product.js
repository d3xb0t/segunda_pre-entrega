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

module.exports = Product