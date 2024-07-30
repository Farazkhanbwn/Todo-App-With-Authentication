const express = require("express");
const { authRouter } = require("./routes/auth/auth.router");
const {
  handleUserLogin,
  isUserRegisterd,
} = require("./routes/auth/auth.controller");
const { todoRoute } = require("./routes/todos/todos.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with Your frontend domain
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/signUp", authRouter);
app.use("/todo", restrictToLoggedinUserOnly, todoRoute);

app.post("/login", handleUserLogin);
app.get("/auth", isUserRegisterd);

app.get("/", (_, res) => {
  res.send("<h1>Main Route Accessible</h1>");
});

module.exports = app;
