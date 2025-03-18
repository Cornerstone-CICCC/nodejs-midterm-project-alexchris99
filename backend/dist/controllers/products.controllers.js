"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productCart_models_1 = __importDefault(require("../models/productCart.models")); // cart model
// addproduct
const newProduct = (req, res) => {
    // destructure the params
    const { id, title, price, description, category, imageUrl } = req.body;
    // check for the params
    if (!id || !title || !price || !description || !category || !imageUrl) {
        res.status(404).send(false);
        return;
    }
    // const quantity
    const quantity = 0;
    // add product to the db
    const addProduct = productCart_models_1.default.addNewProductToCart({ id, title, price, description, category, imageUrl, quantity });
    //if something fails
    if (!addProduct) {
        res.status(500).send(false);
        return;
    }
    // in case the addition was succesfull
    res.status(201).json(addProduct);
};
const deleteProduct = (req, res) => {
    // destructure the params
    const { id } = req.params;
    if (!id) {
        res.status(404).send(false);
        return;
    }
    // delete the product
    const deleteProduct = productCart_models_1.default.deleteProdut(id);
    // if the delete fail
    if (!deleteProduct) {
        res.status(500).send(false);
        return;
    }
    // delete succesfull
    res.status(200).send(deleteProduct);
};
exports.default = {
    newProduct,
    deleteProduct
};
