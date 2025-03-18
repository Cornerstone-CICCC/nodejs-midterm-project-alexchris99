import { Request, Response } from "express";
import { Product } from "../types/product";

// get register
const register = (req: Request, res:  Response)=>{
    res.status(200).send(true)
}

// get login
const login = (req: Request, res: Response)=>{
    res.status(200).send(true)
}



export default {
    register,
    login,
}