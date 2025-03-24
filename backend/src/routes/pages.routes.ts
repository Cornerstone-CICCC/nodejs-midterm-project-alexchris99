import { Router } from "express";
import pageControllers from "../controllers/page.controllers";

// create the router
const pagesRouter = Router()

// Routes

// get login page
pagesRouter.get("/login", pageControllers.login)

// get register
pagesRouter.get("/register",pageControllers.register)

//get profile
pagesRouter.get("/profile",pageControllers.profile)

export default pagesRouter