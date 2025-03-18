"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// get register
const register = (req, res) => {
    res.status(200).send(true);
};
// get login
const login = (req, res) => {
    res.status(200).send(true);
};
exports.default = {
    register,
    login,
};
