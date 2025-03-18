import { Request, Response } from "express";


// get register
const register = (req: Request, res:  Response)=>{
    res.status(200).send(true)
}

// get login
const login = (req: Request, res: Response)=>{
    res.status(200).send(true)
}

const profile = (req: Request, res: Response)=>{
    res.status(200).send(true)
}


export default {
    register,
    login,
    profile,
}