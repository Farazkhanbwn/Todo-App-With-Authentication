"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const app = express_1.default;
const authRoute = app.Router();
authRoute.post("/", auth_controller_1.handleUserLogin);
exports.default = authRoute;
