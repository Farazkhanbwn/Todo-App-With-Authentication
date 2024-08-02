"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const auth_controller_1 = require("./auth/auth.controller");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("<h3>Hello World</h3>");
});
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Replace with Your frontend domain
    credentials: true,
}));
app.use("/login", auth_routes_1.default);
app.post("/signUp", auth_controller_1.signUpUser);
app.get("/auth", auth_controller_1.userAuthenticationStatus);
app.get("/todo", (req, res) => {
    res.send("<h2>Hello We are learning");
});
exports.default = app;
