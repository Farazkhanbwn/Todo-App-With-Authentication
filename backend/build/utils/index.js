"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendServerResponse = exports.JWTTokenValidation = exports.generateErrorObjectExpressValidator = exports.getJWTSignedToken = exports.isEncryptedDataValid = exports.encryptTextData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET ?? "";
const encryptTextData = async (textData, saltRounds = 10) => {
    if (!textData) {
        return "";
    }
    const hash = await bcrypt_1.default.hash(textData, saltRounds);
    return hash;
};
exports.encryptTextData = encryptTextData;
const isEncryptedDataValid = async (data, encryptedData) => {
    const isDataMatched = await bcrypt_1.default.compare(data, encryptedData);
    return isDataMatched;
};
exports.isEncryptedDataValid = isEncryptedDataValid;
const getJWTSignedToken = (data, expiresIn = "2h") => {
    return jsonwebtoken_1.default.sign(data, JWT_SECRET, {
        expiresIn,
    });
};
exports.getJWTSignedToken = getJWTSignedToken;
const generateErrorObjectExpressValidator = (requestInstance) => {
    const expressValidatorErrorsArray = (0, express_validator_1.validationResult)(requestInstance);
    const hasErrors = !expressValidatorErrorsArray.isEmpty();
    console.log(expressValidatorErrorsArray.array());
    const errors = generateLoginErrorMessages(expressValidatorErrorsArray.array());
    return {
        hasErrors,
        errors,
    };
};
exports.generateErrorObjectExpressValidator = generateErrorObjectExpressValidator;
const generateLoginErrorMessages = (errors) => {
    const errorsObject = {};
    errors.forEach((error) => {
        // Remove path from below line
        if (error.path && error.msg) {
            errorsObject[error.path] = error.msg;
        }
    });
    return errorsObject;
};
const JWTTokenValidation = (token) => {
    if (!token) {
        return {
            isTokenValid: false,
            decodedData: {},
        };
    }
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const isUserIdValid = !!decodedData.email;
        const currentTime = Math.floor(Date.now() / 1000);
        const isTokenExpired = (decodedData.exp ?? 0) <= currentTime;
        if (!isUserIdValid || isTokenExpired) {
            throw new Error();
        }
        return {
            isTokenValid: true,
            decodedData,
        };
    }
    catch (_) {
        return {
            isTokenValid: false,
            decodedData: {},
        };
    }
};
exports.JWTTokenValidation = JWTTokenValidation;
const sendServerResponse = (responseInstance, data, errors, status) => {
    if (Object.values(errors).length) {
        const errorResponseData = {
            data: null,
            errors,
        };
        return responseInstance.status(status ?? 500).json(errorResponseData);
    }
    const successResponseData = {
        data,
        errors: null,
    };
    return responseInstance.status(status ?? 200).json(successResponseData);
};
exports.sendServerResponse = sendServerResponse;
