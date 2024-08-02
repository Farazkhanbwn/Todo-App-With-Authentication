import { Request, Response } from "express";
import AuthSchema from "./auth.model";
import {
  encryptTextData,
  generateErrorObjectExpressValidator,
  getJWTSignedToken,
  isEncryptedDataValid,
  JWTTokenValidation,
  sendServerResponse,
} from "../utils";

export async function signUpUser(req: Request, res: Response) {
  const { name, email, password } = req?.body;

  const user = await AuthSchema.findOne({ email });

  if (user) {
    return sendServerResponse(res, null, { message: "User Already Exist" });
  }

  const hashPassword = await encryptTextData(password);

  try {
    await AuthSchema.create({
      name,
      email,
      password: hashPassword,
    });
    return sendServerResponse(res, { message: "New User Created" }, {}, 200);
  } catch (_) {
    return sendServerResponse(res, null, { message: "External Server Error" });
  }
}

export async function handleUserLogin(req: Request, res: Response) {
  const { email, password } = req?.body;
  const { errors, hasErrors } = generateErrorObjectExpressValidator(req);

  if (hasErrors) {
    return sendServerResponse(res, null, errors);
  }

  try {
    const user = await AuthSchema.findOne({ email });
    const isPasswordValid =
      !!user && (await isEncryptedDataValid(password, user?.password));

    if (!user || !isPasswordValid) {
      return sendServerResponse(
        res,
        null,
        { message: "Invalid Credentials" },
        401
      );
    }

    const token = getJWTSignedToken({ email: user?.email ?? "" });
    return sendServerResponse(res, { token }, {}, 200);
  } catch (_) {
    return sendServerResponse(
      res,
      null,
      { message: "Internal Server Error" },
      500
    );
  }
}

export const userAuthenticationStatus = async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";
  const { isTokenValid } = JWTTokenValidation(token.slice(7));
  return sendServerResponse(res, { isValidUser: isTokenValid }, {});
};
