//Server
import express, {Request, Response} from "express"
import cookieSession from "cookie-session"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.routes" // user router
import cartRouter from "./routes/cart.routes" // cart router
import pagesRouter from "./routes/pages.routes"
pagesRouter //pages routes


//  permision to acces the vars
dotenv.config()

// create a instance of ther server
const app = express()

// cookie keys
const cookie_S = process.env.COOKIE_S
const cookie_En = process.env.COOKIE_EN

//if the cookies aare not present we crash the server
if(!cookie_S || !cookie_En){
    throw new Error("Keys missing")
}

// Middleware

//cors-conection to astro
app.use(cors({
    origin: "http://localhost:4321", // astro port
    credentials: true
}))

//cokies
app.use(cookieSession({
    name: "session",
    maxAge: 7 * 24 * 60 * 60 * 1000,  // one week of duration
    keys: [
        cookie_S,
        cookie_En
    ]
}))

// allow post request between front and backend
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/",pagesRouter)// pages routes
app.use("/",userRouter)// user routes

//fallback
app.use((req: Request, res: Response)=>{
    res.status(404).send(false)
})

// start the server
const PORT = process.env.PORT || 3500
app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)
})