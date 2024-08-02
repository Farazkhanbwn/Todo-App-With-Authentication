import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT ?? 4000;
const MONGO_URI = process.env.MONGO_URI ?? "";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MONGO DB");
    server.listen(PORT, () => {
      console.log("Server is running on ", PORT);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

startServer();
