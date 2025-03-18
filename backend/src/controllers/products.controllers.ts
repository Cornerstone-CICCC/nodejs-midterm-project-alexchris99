import productCartModels from "../models/productCart.models";// cart model
import { Request, Response } from "express";
import { Product } from "../types/product";// product Type

// addproduct
const newProduct = (req: Request<{},{}, Partial<Product>>, res: Response)=>{

    // destructure the params
    const {id, title, price, description, category, imageUrl} = req.body

    // check for the params
    if(!id || !title || !price || !description || !category || !imageUrl){
        res.status(404).send(false)
        return 
    }

    // const quantity
    const quantity = 0

    // add product to the db
    const addProduct = productCartModels.addNewProductToCart({id,title,price,description,category,imageUrl, quantity})

    //if something fails
    if(!addProduct){
        res.status(500).send(false)
        return
    }

    // in case the addition was succesfull
    res.status(201).json(addProduct)
}

const deleteProduct = (req: Request<{id: number}>, res: Response)=>{
    // destructure the params
    const {id} = req.params

    if(!id){
        res.status(404).send(false)
        return
    }

    // delete the product
    const deleteProduct = productCartModels.deleteProdut(id)

    // if the delete fail
    if(!deleteProduct){
        res.status(500).send(false)
        return
    }

    // delete succesfull
    res.status(200).send(deleteProduct)
}

export default{
    newProduct,
    deleteProduct
}