"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticationStatus = void 0;
exports.signUpUser = signUpUser;
exports.handleUserLogin = handleUserLogin;
const auth_model_1 = __importDefault(require("./auth.model"));
const utils_1 = require("../utils");
async function signUpUser(req, res) {
    const { name, email, password } = req?.body;
    const user = await auth_model_1.default.findOne({ email });
    if (user) {
        return (0, utils_1.sendServerResponse)(res, null, { message: "User Already Exist" });
    }
    const hashPassword = await (0, utils_1.encryptTextData)(password);
    try {
        await auth_model_1.default.create({
            name,
            email,
            password: hashPassword,
        });
        return (0, utils_1.sendServerResponse)(res, { message: "New User Created" }, {}, 200);
    }
    catch (_) {
        return (0, utils_1.sendServerResponse)(res, null, { message: "External Server Error" });
    }
}
async function handleUserLogin(req, res) {
    const { email, password } = req?.body;
    const { errors, hasErrors } = (0, utils_1.generateErrorObjectExpressValidator)(req);
    if (hasErrors) {
        return (0, utils_1.sendServerResponse)(res, null, errors);
    }
    try {
        const user = await auth_model_1.default.findOne({ email });
        const isPasswordValid = !!user && (await (0, utils_1.isEncryptedDataValid)(password, user?.password));
        if (!user || !isPasswordValid) {
            return (0, utils_1.sendServerResponse)(res, null, { message: "Invalid Credentials" }, 401);
        }
        const token = (0, utils_1.getJWTSignedToken)({ email: user?.email ?? "" });
        return (0, utils_1.sendServerResponse)(res, { token }, {}, 200);
    }
    catch (_) {
        return (0, utils_1.sendServerResponse)(res, null, { message: "Internal Server Error" }, 500);
    }
}
const userAuthenticationStatus = async (req, res) => {
    const token = req.headers.authorization || "";
    const { isTokenValid } = (0, utils_1.JWTTokenValidation)(token.slice(7));
    return (0, utils_1.sendServerResponse)(res, { isValidUser: isTokenValid }, {});
};
exports.userAuthenticationStatus = userAuthenticationStatus;
