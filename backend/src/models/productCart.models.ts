import { Product } from "../types/product"; // product type


class productCart{
    // inmemory db cart
    private userCart: Partial <Product>[] = []

    // add a new product
    async addNewProductToCart(newProduct: Product){
        // destructure the information
        const {id, title, price, description, category, imageUrl} = newProduct

        // check for the params
        if(!id || !title || !price || !description || !category || !imageUrl){
            return false
        }

        // check in the cart to see if we have the item
        const itemFound = this.userCart.findIndex(product => product.id === id )

        // if product in the cart
        if(itemFound !== -1){
            // uppdate the quantity of products in the cart
            let quantity = this.userCart[itemFound].quantity
            if(quantity){
                quantity = quantity+1
            }
            // add the new quantity to the cart
            this.userCart[itemFound] = {
                ...this.userCart[itemFound],
                quantity: quantity
            }

            return this.userCart[itemFound]
        }

        //else add the item to the cart
        const newProductToAdd: Partial<Product> = {
            id,
            title,
            price,
            description,
            category,
            imageUrl,
            quantity: 1
        }

        this.userCart.push(newProductToAdd)

        return newProductToAdd
    }

    // delete one item from the cart 
    deleteProdut(id: number){
        // check if the id exist 
        if(!id){
            return false
        }

        // check for the producut in te cart
        const productFound = this.userCart.findIndex(product => product.id === id)

        // if product not found
        if(productFound === -1){
            return false
        }

        //check for the quantity of the product
        const productQuantity = this.userCart[productFound].quantity

        // delete the cart item
        if(productQuantity === 1){
            this.userCart = this.userCart.splice(productFound,1)
            return true
        }

        // create a new quantity
        let quantity = this.userCart[productFound].quantity
        if(quantity){
            quantity = quantity-1
        }

        // reduce the quantity
        this.userCart[productFound] = {
            ...this.userCart[productFound],
            quantity: quantity
        }
        return true
    }
}

export default new productCart