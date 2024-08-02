"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRequestMiddleware = void 0;
const utils_1 = require("../utils");
const authenticateRequestMiddleware = (req, res, next) => {
    const token = req.headers.authorization || "";
    const { isTokenValid, decodedData } = (0, utils_1.JWTTokenValidation)(token.slice(7));
    if (!isTokenValid) {
        return (0, utils_1.sendServerResponse)(res, null, { error: "Authentication failed: Invalid token" }, 401);
    }
    //   req.userId = decodedData.userId;
    next();
};
exports.authenticateRequestMiddleware = authenticateRequestMiddleware;
