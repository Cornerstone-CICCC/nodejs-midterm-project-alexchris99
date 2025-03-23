"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productCart_models_1 = __importDefault(require("../models/productCart.models")); // cart model
// addproduct
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure the params
    const { id, title, price, image } = req.body;
    // get the user username
    if (req.session && req.session.username) {
        const username = req.session.username;
        // check for the params
        if (!id || !title || !price || !image) {
            res.status(404).send(false);
            return;
        }
        // const quantity
        const quantity = 1;
        // add product to the db
        const addProduct = productCart_models_1.default.addNewProductToCart({ id, title, price, image, quantity }, username);
        //console.log(JSON.stringify(addProduct))
        //if something fails
        if (!addProduct) {
            res.status(500).send(false);
            return;
        }
        // in case the addition was succesfull
        res.status(201).json(addProduct);
    }
});
const deleteProduct = (req, res) => {
    // destructure the params
    const { id } = req.body;
    if (req.session && req.session.username) {
        const username = req.session.username;
        if (!id) {
            console.log(`here ${id}`);
            res.status(404).send(false);
            return;
        }
        // delete the product
        const deleteProduct = productCart_models_1.default.reduceProduct(id, username);
        // if the delete fail
        if (!deleteProduct) {
            res.status(500).send(false);
            return;
        }
        // delete succesfull
        res.status(200).send(deleteProduct);
    }
};
const getCart = (req, res) => {
    if (req.session && !req.session.username) {
        res.status(404).send(false);
        return;
    }
    if (!req.session) {
        res.status(404).send(false);
        return;
    }
    const username = req.session.username;
    const usercart = productCart_models_1.default.getUserCart(username);
    if (!usercart) {
        res.status(500).send(false);
        return;
    }
    res.status(200).json(usercart);
    return;
};
const usersCart = (req, res) => {
    const db = productCart_models_1.default.getUsersCart();
    res.status(200).json(db);
    return;
};
exports.default = {
    newProduct,
    deleteProduct,
    getCart,
    usersCart
};
