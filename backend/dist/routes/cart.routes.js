"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Router from express
const products_controllers_1 = __importDefault(require("../controllers/products.controllers")); // producs controlls
// create the router
const cartRouter = (0, express_1.Router)();
//Routes
// add a product
cartRouter.post("/product", products_controllers_1.default.newProduct);
// delete product
cartRouter.post("/cart/:id", products_controllers_1.default.deleteProduct);
exports.default = cartRouter;
