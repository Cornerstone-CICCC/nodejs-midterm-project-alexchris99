"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controllers_1 = __importDefault(require("../controllers/page.controllers"));
// create the router
const pagesRouter = (0, express_1.Router)();
// Routes
// get login page
pagesRouter.get("/login", page_controllers_1.default.login);
// get register
pagesRouter.get("/register", page_controllers_1.default.register);
exports.default = pagesRouter;
