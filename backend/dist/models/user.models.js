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
const uuid_1 = require("uuid"); // unique id
const bcrypt_1 = __importDefault(require("bcrypt")); // hash password
// user class
class userModel {
    constructor() {
        // in memory db with type users
        this.users = [];
    }
    // create a new user
    addNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fname, lname, age, nationality, mail, username, password } = newUser; // defragment  the new user info 
            if (!fname || !lname || !age || !nationality || !mail || !username || !password) {
                return false;
            }
            const hashPaswword = yield bcrypt_1.default.hash(password, 12); // hash the user password
            const createNewUser = {
                id: (0, uuid_1.v4)(),
                fname,
                lname,
                age,
                nationality,
                mail,
                username,
                password: hashPaswword
            };
            // add the user to the in memory db
            this.users.push(createNewUser);
            return createNewUser;
        });
    }
    //modify user info
    modifyUser(newUserInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, fname, lname, age, nationality, mail, username, password } = newUserInfo; // defragment  the new user info 
            // check im the db for the user using the id
            const userFound = this.users.findIndex(u => u.id === id);
            // if the user id doens exist
            if (userFound === -1) {
                return false;
            }
            // if we have a new password
            let newPassword = "";
            if (password) {
                newPassword = yield bcrypt_1.default.hash(password, 12);
            }
            // modify the user info
            const userModified = Object.assign(Object.assign({}, this.users[userFound]), { fname: fname !== null && fname !== void 0 ? fname : this.users[userFound].fname, lname: lname !== null && lname !== void 0 ? lname : this.users[userFound].lname, age: age !== null && age !== void 0 ? age : this.users[userFound].age, nationality: nationality !== null && nationality !== void 0 ? nationality : this.users[userFound].nationality, mail: mail !== null && mail !== void 0 ? mail : this.users[userFound].mail, username: username !== null && username !== void 0 ? username : this.users[userFound].username, password: newPassword !== null && newPassword !== void 0 ? newPassword : this.users[userFound].password });
            this.users[userFound] = userModified;
            return true;
        });
    }
    //find user by username
    findUserByUsername(username) {
        // check iw we have the username in the db
        const userFound = this.users.findIndex(user => user.username === username);
        // if there is not user found
        if (userFound === -1) {
            return false;
        }
        return this.users[userFound];
    }
    // login user
    checkAuthUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if the username exist
            const userFound = this.users.findIndex(user => user.username === username);
            // if username dont exist
            if (userFound === -1) {
                return false;
            }
            // check if password is a match
            const passwordIsMatch = yield bcrypt_1.default.compare(password, this.users[userFound].password);
            if (!passwordIsMatch) {
                return false;
            }
            // if username and password are correct we return the user
            return this.users[userFound];
        });
    }
}
exports.default = new userModel;
