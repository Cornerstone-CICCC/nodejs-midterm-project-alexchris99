import productCartModels from "../models/productCart.models";// cart model
import { Request, Response } from "express";
import { Product } from "../types/product";// product Type


// addproduct
const newProduct = async(req: Request<{},{}, Partial<Product>>, res: Response)=>{
    // destructure the params
    const {id, title, price, image} = req.body

    // get the user username
    if(req.session && req.session.username){
        const username = req.session.username
    

    // check for the params
    if(!id || !title || !price || !image){
        res.status(404).send(false)
        return 
    }

    // const quantity
    const quantity = 1

    // add product to the db
    const addProduct =  productCartModels.addNewProductToCart({id,title,price,image, quantity},username)

    //console.log(JSON.stringify(addProduct))
    
    //if something fails
    if(!addProduct){
        res.status(500).send(false)
        return
    }

    // in case the addition was succesfull
    res.status(201).json(addProduct)
    }
}

const deleteProduct = (req: Request<{},{},{id: number}>, res: Response)=>{
    // destructure the params
    const {id} = req.body
    if(req.session && req.session.username){
        const username = req.session.username
    

    if(!id){
        res.status(404).send(false)
        return
    }

    // delete the product
    const deleteProduct = productCartModels.reduceProduct(id, username)

    // if the delete fail
    if(!deleteProduct){
        res.status(500).send(false)
        return
    }

    // delete succesfull
    res.status(200).send(deleteProduct)
    }
}

const getCart = (req: Request , res: Response)=>{
    if(req.session && !req.session.username){
        res.status(404).send(false)
        return
    }

    if(!req.session){
        res.status(404).send(false)
        return
    }

    const username = req.session.username
    const usercart = productCartModels.getUserCart(username)

    if(!usercart){
        res.status(500).send(false)
        return 
    }

    res.status(200).json(usercart)
    return
}

const  usersCart = (req: Request, res: Response)=>{
    const db =  productCartModels.getUsersCart()
    res.status(200).json(db)
    return
}

export default{
    newProduct,
    deleteProduct,
    getCart,
    usersCart
}