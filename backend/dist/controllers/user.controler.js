"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_models_1 = __importDefault(require("../models/user.models")); // user model 
const getUsers = (req, res) => {
    const users = user_models_1.default.getUsers();
    res.status(200).json(users);
};
// get user by username
const getUsernameByUsername = (req, res) => {
    var _a;
    // chech for the user cookie
    if (req.session && !req.session.username) {
        res.status(404).send(false);
        return;
    }
    // destrcuture the user
    const username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
    // look for the user with the model
    const user = user_models_1.default.findUserByUsername(username);
    // if there is no user
    if (!user) {
        res.status(404).send(false);
        return;
    }
    // send the user info
    res.status(200).json(user);
};
// add user register
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure the params
    const { fname, lname, age, nationality, mail, username, password } = req.body;
    // chekc for the params
    if (!fname || !lname || !age || !nationality || !mail || !username || !password) {
        res.status(404).send(false);
        return;
    }
    // add user to the db
    const addUser = yield user_models_1.default.addNewUser({ fname, lname, age, nationality, mail, username, password });
    // if the username exist
    if (!addUser) {
        res.status(409).send(false);
        return;
    }
    // in case the user was succesfull
    res.status(201).json(addUser);
});
// modiffy user info
const modifyUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure the info 
    const { id, fname, lname, age, nationality, mail, username, password } = req.body;
    // pass the info to the model to modify the user info
    const newUserInfo = yield user_models_1.default.modifyUser({ id, fname, lname, age, nationality, mail, username, password });
    // if the process dint succed
    if (!newUserInfo) {
        res.status(500).send(false);
        return;
    }
    res.status(200).send(newUserInfo);
});
// login User
const logUserIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destruture the request body
    const { username, password } = req.body;
    // TODO check status
    if (!username || !password) {
        res.status(401).send(false);
        return;
    }
    // if all the params exist
    const userLogin = user_models_1.default.checkAuthUser(username, password);
    // if user send incorrect params
    if (!userLogin) {
        res.status(500).send(false);
        return;
    }
    // generate cookies
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = username;
    }
    // if all ok
    res.status(200).json(userLogin);
});
// delete user
const logout = (req, res) => {
    // reset the session values
    req.session = null;
    // logout the user succesfully
    res.status(200).send(true);
};
exports.default = {
    addUser,
    modifyUserInfo,
    getUsernameByUsername,
    logUserIn,
    logout,
    getUsers
};
