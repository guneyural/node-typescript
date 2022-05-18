import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../modules/auth/auth.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = (res.locals.user || "").replace(/^Bearer\s/, "");

    if (!accessToken) return res.status(401).send("Unauthorized");

    const decoded = verifyJwt(accessToken);

    if (decoded) res.locals.user = decoded;

    return next();
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }
}

export default deserializeUser;
