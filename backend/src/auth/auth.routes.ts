import express from "express";
import { handleUserLogin } from "./auth.controller";

const app = express;
const authRoute = app.Router();

authRoute.post("/", handleUserLogin);

export default authRoute;
