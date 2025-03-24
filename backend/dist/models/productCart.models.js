"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class productCart {
    constructor() {
        // inmemory db cart
        this.usersCart = [];
    }
    getUsersCart() {
        return this.usersCart;
    }
    // get the db
    getUserCart(user) {
        // check for the index
        let index = -1;
        for (let i = 0; i < this.usersCart.length; i++) {
            if (this.usersCart[i][user]) {
                index = i;
            }
        }
        if (index === -1) {
            return false;
        }
        return this.usersCart[index][user];
    }
    // add a new product
    addNewProductToCart(newProduct, username) {
        // destructure the information
        const { id, title, price, image, quantity } = newProduct;
        const user = username;
        // check for the params
        if (!id || !title || !price || !image || !quantity) {
            return false;
        }
        // new usercart
        const newUserCart = {
            [user]: [
                {
                    id,
                    title,
                    price,
                    image,
                    quantity
                }
            ]
        };
        // newproduct
        const newItem = {
            id,
            title,
            price,
            image,
            quantity
        };
        // check if the db is empty
        if (this.usersCart.length === 0) {
            this.usersCart.push(newUserCart);
            return this.getUserCart(user);
        }
        const carts = this.usersCart.length;
        let flag = 0;
        // if the db is not empty check for the user
        this.usersCart.forEach(cart => {
            flag += 1;
            // check for the user in the cart
            if (user in cart) {
                // loop the items in the user cart
                let counter = 0;
                cart[user].forEach(item => {
                    counter += 1;
                    // if the id of the item is equal to the id we increase the quantity
                    if (item.id === id) {
                        item.quantity = item.quantity + 1;
                        counter = -1;
                        return;
                    }
                });
                if (counter === cart[user].length) {
                    // if the item doesnt exist we add the item
                    cart[user].push(newItem);
                    return;
                }
                return;
            }
            if (carts === flag) {
                this.usersCart.push(newUserCart);
            }
        });
        return this.getUserCart(user);
    }
    // delete one item from the cart 
    reduceProduct(id, username) {
        // check for the user key 
        this.usersCart.forEach(cart => {
            if (cart[username]) {
                // check fo the item and reduce the quantity 
                cart[username].forEach((item, index) => {
                    // delte the item
                    if (item.id == id && item.quantity === 1) {
                        cart[username].splice(index, 1);
                    }
                    // deducting item
                    if (item.id === id && item.quantity > 1) {
                        item.quantity -= 1;
                    }
                });
            }
            return true;
        });
        return true;
    }
}
exports.default = new productCart;
