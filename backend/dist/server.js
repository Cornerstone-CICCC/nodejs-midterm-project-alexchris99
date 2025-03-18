"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Server
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes")); // user router
const pages_routes_1 = __importDefault(require("./routes/pages.routes"));
pages_routes_1.default; //pages routes
//  permision to acces the vars
dotenv_1.default.config();
// create a instance of ther server
const app = (0, express_1.default)();
// cookie keys
const cookie_S = process.env.COOKIE_S;
const cookie_En = process.env.COOKIE_EN;
//if the cookies aare not present we crash the server
if (!cookie_S || !cookie_En) {
    throw new Error("Keys missing");
}
// Middleware
//cors-conection to astro
app.use((0, cors_1.default)({
    origin: "http://localhost:4321", // astro port
    credentials: true
}));
//cokies
app.use((0, cookie_session_1.default)({
    name: "session",
    maxAge: 7 * 24 * 60 * 60 * 1000, // one week of duration
    keys: [
        cookie_S,
        cookie_En
    ]
}));
// allow post request between front and backend
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/", pages_routes_1.default); // pages routes
app.use("/", user_routes_1.default); // user routes
//fallback
app.use((req, res) => {
    res.status(404).send(false);
});
// start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
