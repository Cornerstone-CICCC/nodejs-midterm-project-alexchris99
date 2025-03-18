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
Object.defineProperty(exports, "__esModule", { value: true });
class productCart {
    constructor() {
        // inmemory db cart
        this.userCart = [];
    }
    // add a new product
    addNewProductToCart(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            // destructure the information
            const { id, title, price, description, category, imageUrl } = newProduct;
            // check for the params
            if (!id || !title || !price || !description || !category || !imageUrl) {
                return false;
            }
            // check in the cart to see if we have the item
            const itemFound = this.userCart.findIndex(product => product.id === id);
            // if product in the cart
            if (itemFound !== -1) {
                // uppdate the quantity of products in the cart
                let quantity = this.userCart[itemFound].quantity;
                if (quantity) {
                    quantity = quantity + 1;
                }
                // add the new quantity to the cart
                this.userCart[itemFound] = Object.assign(Object.assign({}, this.userCart[itemFound]), { quantity: quantity });
                return this.userCart[itemFound];
            }
            //else add the item to the cart
            const newProductToAdd = {
                id,
                title,
                price,
                description,
                category,
                imageUrl,
                quantity: 1
            };
            this.userCart.push(newProductToAdd);
            return newProductToAdd;
        });
    }
    // delete one item from the cart 
    deleteProdut(id) {
        // check if the id exist 
        if (!id) {
            return false;
        }
        // check for the producut in te cart
        const productFound = this.userCart.findIndex(product => product.id === id);
        // if product not found
        if (productFound === -1) {
            return false;
        }
        //check for the quantity of the product
        const productQuantity = this.userCart[productFound].quantity;
        // delete the cart item
        if (productQuantity === 1) {
            this.userCart = this.userCart.splice(productFound, 1);
            return true;
        }
        // create a new quantity
        let quantity = this.userCart[productFound].quantity;
        if (quantity) {
            quantity = quantity - 1;
        }
        // reduce the quantity
        this.userCart[productFound] = Object.assign(Object.assign({}, this.userCart[productFound]), { quantity: quantity });
        return true;
    }
}
exports.default = new productCart;
