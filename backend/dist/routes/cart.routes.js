"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Router from express
const products_controllers_1 = __importDefault(require("../controllers/products.controllers")); // producs controlls
const products_controllers_2 = __importDefault(require("../controllers/products.controllers"));
// create the router
const cartRouter = (0, express_1.Router)();
//Routes
// add a product
cartRouter.post("/product", products_controllers_1.default.newProduct);
//get user cart
cartRouter.get("/cart", products_controllers_1.default.getCart);
//get userCarts
cartRouter.get("/carts", products_controllers_1.default.usersCart);
// delete product
cartRouter.post("/id", products_controllers_1.default.deleteProduct);
//search
cartRouter.post("/search", products_controllers_2.default.productsFound);
exports.default = cartRouter;
