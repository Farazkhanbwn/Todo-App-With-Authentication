import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { ValidationError, validationResult } from "express-validator";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

type ValidationErrorPath = {
  path?: string;
};

type ValidationErrorExtended = ValidationError & ValidationErrorPath;

export const encryptTextData = async (textData: string, saltRounds = 10) => {
  if (!textData) {
    return "";
  }
  const hash = await bcrypt.hash(textData, saltRounds);
  return hash;
};

export const isEncryptedDataValid = async (
  data: string,
  encryptedData: string
) => {
  const isDataMatched = await bcrypt.compare(data, encryptedData);
  return isDataMatched;
};

export const getJWTSignedToken = (
  data: Record<string, string>,
  expiresIn = "2h"
) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn,
  });
};

export const generateErrorObjectExpressValidator = (
  requestInstance: Request
) => {
  const expressValidatorErrorsArray = validationResult(requestInstance);
  const hasErrors = !expressValidatorErrorsArray.isEmpty();
  console.log(expressValidatorErrorsArray.array());
  const errors = generateLoginErrorMessages(
    expressValidatorErrorsArray.array()
  );

  return {
    hasErrors,
    errors,
  };
};

const generateLoginErrorMessages = (errors: ValidationErrorExtended[]) => {
  const errorsObject: Record<string, string> = {};
  errors.forEach((error) => {
    // Remove path from below line
    if (error.path && error.msg) {
      errorsObject[error.path] = error.msg;
    }
  });
  return errorsObject;
};

export const JWTTokenValidation = (token: string) => {
  if (!token) {
    return {
      isTokenValid: false,
      decodedData: {},
    };
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
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
  } catch (_) {
    return {
      isTokenValid: false,
      decodedData: {},
    };
  }
};

export const sendServerResponse = (
  responseInstance: Response,
  data: Record<string, string | boolean> | null,
  errors: Record<string, string> | {},
  status?: number
) => {
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
