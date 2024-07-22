const express = require("express");
const { authRouter } = require("./routes/auth/auth.router");
const { handleUserLogin } = require("./routes/auth/auth.controller");
const { todoRoute } = require("./routes/todos/todos.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/signUp", authRouter);
app.use("/todo", todoRoute);

authRouter.post("/login", handleUserLogin);

app.get("/", (_, res) => {
  res.send("<h1>Main route accessible</h1>");
});

module.exports = app;
