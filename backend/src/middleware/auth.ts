import { NextFunction, Request, Response } from "express";
import { JWTTokenValidation, sendServerResponse } from "../utils";

export const authenticateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || "";
  const { isTokenValid, decodedData } = JWTTokenValidation(token.slice(7));
  if (!isTokenValid) {
    return sendServerResponse(
      res,
      null,
      { error: "Authentication failed: Invalid token" },
      401
    );
  }
  //   req.userId = decodedData.userId;
  next();
};
