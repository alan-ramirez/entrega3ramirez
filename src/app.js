//importar nuestras dependencias 
import express from "express"
import { productManager } from "./productManager.js"

//instanciar nuestras constantes
const app = express()
app.use(express.urlencoded({extended:true}))

//Respuesta 

//ruta ‘/products’, que lee el archivo de productos (products.json)
app.get('/products', (req,res)=>{
  const {limit} = req.query
  productManager.getProducts().then((products)=>{
    if(products.length===0) return res.send('No se encontraron productos')
    if(limit){
      return res.send(products.slice(0,limit))
    }
    res.send(products)
    //Error
  }).catch(err => {
    res.send(`Se ha producido el error ${err} al cargar los productos`)
  })
})

//ruta ‘/products/:pid’, la cual recibe por req.params el pid (product Id), y devuelve sólo el producto solicitado, en lugar de todos los productos
app.get('/products/:productId',(req,res)=>{
  const id = req.params.productId
  productManager.getProductById(id).then(product=>{
    res.send(product)
    //Error
  }).catch(err => {
    res.send(`Se ha producido el error ${err} al cargar los productos`)
  })
})

app.listen(1000, ()=>{console.log("Servidor ejecutándose en el puerto 1000")})