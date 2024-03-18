import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "./auth-utils";
import { UserFromPayload } from "./types";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = (await verifyJwtToken(token)) as UserFromPayload;
      req.user = decodedToken;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
