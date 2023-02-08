import fs from "fs"
import {v4 as uuidv4} from 'uuid'

class ProductManager {
  // constructor con variable this.path, que recibe la ruta a trabajar desde el momento de generar su instancia
  constructor(path){
    this.products = [] //Array products
    this.path = path
  }
  //Verifico que el archivo de productos exista
  checkProduct(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(fs.readFileSync(this.path))
    }
  }
  //Método addProduct, que recibe un objeto con el formato previamente especificado, le asigna una id autoincrementable (en este caso utilizando uuidv4) y lo guarda
  addProduct(title, description, price, thumbnail, code, stock) {
    this.checkProduct()

    //Verifico si el producto se encuentra en el array products
    const inProducts = this.products.some(product => product.code===code)

    //Condición para agregar un producto con todas las características necesarias
    if (inProducts === false&&title&&description&&price&&thumbnail&&stock) {
      this.products.push({
        id: uuidv4(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      })

      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "El producto fue agregado con éxito"
    //Condición en caso de repetición o falta de características
    } else {
      return "El producto está repetido o faltan características"
    }
  }

  //método getProducts, que lee el archivo de productos y devuelve todos los productos en formato de array (array products)
  getProducts() {
    return this.products
  }

  //método getProductById, que recibe un id y luego de leer el archivo busca el producto con el id especificado y lo devuelve en formato objeto
  getProductById(id){

    this.checkProduct()
    const productIsFound = this.products.find(product => product.id === id)
    if (productIsFound){
      return productIsFound
    }else{
      return "Producto no encontrado"
    }
  }

  //método updateProduct, el cual recibe el id  y el campo del producto a actualizar (puede ser el objeto completo) y actualiza el producto que tenga ese id en el archivo
  updateProduct(id, title, description, price, thumbnail, code, stock){
    this.checkProduct()
    const idFound = this.products.findIndex(product => product.id === id)
    if(idFound !== -1) {
      this.products[idFound] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "El producto fue actualizado exitosamente"
    }else{
      return "Producto no encontrado"
    }
  }

  //método deleteProduct, que recibe un id y elimina el producto que tenga ese id en el archivo
  deleteProduct(id){
    this.checkProduct()
    const indexFound = this.products.findIndex(product => product.id === id)

    if(indexFound !== -1){
      this.products.splice(indexFound, indexFound+1)
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "El producto fue eliminado exitosamente"
    }else{
      return "Producto no encontrado"
    }
  }
}
export const productManager = new ProductManager("./src/products.json")

// const productManager = new ProductManager("./products.json")
// console.log(productManager.getProducts())
// console.log(productManager.addProduct("Producto Test","Este es un primer producto de prueba", 1000, "No image","ABC123",10))
// console.log(productManager.getProducts())

// // Ingreso producto con mismo code para verificar que no se permite adicionar productos repetidos
// console.log(productManager.addProduct("Producto Test","Este es un primer producto de prueba", 1000, "No image","ABC123",10))

// //Test metodo getProductById: Encontrado
// console.log(productManager.getProductById("579bd56b-e860-48b0-8205-9135ac6e7799"))

// //Test metodo getProductById: No encontrado
// console.log(productManager.getProductById("579bd56b-e860-48b0-8205-9135ac6e7798"))

//Test de actualización de producto. Remover comentario
// console.log(productManager.updateProduct("579bd56b-e860-48b0-8205-9135ac6e7799", "El producto de prueba fue actualizado","Este es un producto de prueba actualizado", 1200, "No image","ABC123",20))

//Test de eliminación de producto. Remover comentario
// console.log(productManager.deleteProduct("579bd56b-e860-48b0-8205-9135ac6e7799"))

