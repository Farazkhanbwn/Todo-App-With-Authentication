import express, { Request, Response, Express } from "express";
import cors from "cors";
import authRoute from "./auth/auth.routes";
import { signUpUser, userAuthenticationStatus } from "./auth/auth.controller";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h3>Hello World</h3>");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with Your frontend domain
    credentials: true,
  })
);

app.use("/login", authRoute);
app.post("/signUp", signUpUser);
app.get("/auth", userAuthenticationStatus);
app.get("/todo", (req: Request, res: Response) => {
  res.send("<h2>Hello We are learning")
});

export default app;
