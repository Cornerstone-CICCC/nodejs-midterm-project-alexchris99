import { Router } from "express"; // Router from express
import productsControlers from "../controllers/products.controllers"; // producs controlls

// create the router
const cartRouter = Router()

//Routes

// add a product
cartRouter.post("/product", productsControlers.newProduct)

// delete product
cartRouter.post("/cart/:id", productsControlers.deleteProduct)

export default cartRouter