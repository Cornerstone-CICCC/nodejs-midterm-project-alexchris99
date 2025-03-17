import { Router } from "express"; // Router from express
import userControler from "../controllers/user.controler"; //user controllers

// create the Router
const userRouter = Router()

// Routes

// add a new user
userRouter.post("/register",userControler.addUser)

// get the user info
userRouter.get("/auth",userControler.getUsernameByUsername)

//modify user
userRouter.post("/profile",userControler.modifyUserInfo)

//login user
userRouter.post("/login",userControler.logUserIn)

//logout
userRouter.get("/logout", userControler.logout)

export default userRouter