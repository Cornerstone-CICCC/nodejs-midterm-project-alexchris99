"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Router from express
const user_controler_1 = __importDefault(require("../controllers/user.controler")); //user controllers
// create the Router
const userRouter = (0, express_1.Router)();
// Routes
// add a new user
userRouter.post("/register", user_controler_1.default.addUser);
// get the user info
userRouter.get("/auth", user_controler_1.default.getUsernameByUsername);
//modify user
userRouter.post("/profile", user_controler_1.default.modifyUserInfo);
//login user
userRouter.post("/login", user_controler_1.default.logUserIn);
//logout
userRouter.get("/logout", user_controler_1.default.logout);
exports.default = userRouter;
