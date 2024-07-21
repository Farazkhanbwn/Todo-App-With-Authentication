const express = require("express");
const { handleUserSignup } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/", handleUserSignup);

module.exports = {
  authRouter,
};
