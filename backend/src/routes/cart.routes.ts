import { Router } from "express"; // Router from express
import productsControlers from "../controllers/products.controllers"; // producs controlls
import productsControllers from "../controllers/products.controllers";

// create the router
const cartRouter = Router()

//Routes

// add a product
cartRouter.post("/product", productsControlers.newProduct)

//get user cart
cartRouter.get("/cart", productsControlers.getCart)

//get userCarts
cartRouter.get("/carts", productsControlers.usersCart)

// delete product
cartRouter.post("/id", productsControlers.deleteProduct)

//search
cartRouter.post("/search",productsControllers.productsFound)


export default cartRouter