import userModel from "../models/user.models";// user model 
import { Request, Response } from "express";// responces
import { User } from "../types/user.types";// user type

// get user by username
const getUsernameByUsername = (req: Request, res: Response) =>{
    // chech for the user cookie
    if(req.session && !req.session.username){
        res.status(404).send(false)
        return
    }

    // destrcuture the user
    const username = req.session?.username

    // look for the user with the model
    const user = userModel.findUserByUsername(username)

    // if there is no user
    if(!user){
        res.status(404).send(false)
        return
    }

    // send the user info
    res.status(200).json(user)
}

// add user register
const addUser = async(req: Request<{},{},Omit<User, "id">>, res: Response)=>{
    // destructure the params
    const {fname, lname, age, nationality, mail, username, password} = req.body

    if(!fname || !lname || !age || !nationality || !mail || !username || !password){
        res.status(200).send(false)
        return
    }

    // add user to the db
    const addUser = await userModel.addNewUser({fname,lname,age,nationality,mail,username,password})

    // if the username exist
    if(!addUser){
        res.status(409).send(false)
    }

    // in case the user was succesfull
    res.status(201).json(addUser)
}

// modiffy user info
const modifyUserInfo = async(req: Request<{},{},Partial<User>>, res: Response)=>{
    // destructure the info 
    const {fname, lname, age, nationality, mail, username, password} = req.body

    // pass the info to the model to modify the user info
    const newUserInfo = await userModel.modifyUser({fname, lname, age, nationality, mail, username, password})

    // if the process dint succed
    if(!newUserInfo){
        res.status(500).send(false)
    }

    res.status(200).send(newUserInfo)
} 

// login User
const logUserIn = async (req: Request, res: Response)=>{
    // destruture the request body
    const {username, password} = req.body

    // TODO check status
    if(!username || !password){
        res.status(401).send(false)
        return
    }

    // if all the params exist
    const userLogin = userModel.checkAuthUser(username,password)

    // if user send incorrect params
    if(!userLogin){
        res.status(500).send(false)
        return
    }

    // if all ok
    res.status(200).json(userLogin)
}

// delete user
const deleteUser = (req: Request<{},{},{username: string}>, res: Response)=>{

    // destructure the username
    const {username} = req.body

    // use the model
    const user = userModel.deleteUser(username)

    // if user not foud
    if(!user){
        res.status(500).send(false)
    }

    // delete the user succesfully
    res.status(200).send(user)
}

export default{
    addUser,
    modifyUserInfo,
    getUsernameByUsername,
    logUserIn,
    deleteUser,
}
