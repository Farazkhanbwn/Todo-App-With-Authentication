"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const PORT = process.env.PORT ?? 4000;
const MONGO_URI = process.env.MONGO_URI ?? "";
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to MONGO DB");
        server.listen(PORT, () => {
            console.log("Server is running on ", PORT);
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
startServer();
