import { Request, Response } from "express";
import { findUserByEmail } from "../user/user.service";
import { signJwt, verifyJwt } from "./auth.utils";
import { omit } from "lodash";
import { LoginBody } from "./auth.schema";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password } = req.body;

  //Find the user by email
  const user = await findUserByEmail(email);

  //verify user password
  if (!user || !user.comparePassword(password)) {
    return res.status(403).send("Invalid email or password");
  }

  //sign a jwt
  const payload = omit(user.toJSON(), ["password", "__v"]);
  const jwt = signJwt(payload);

  res.locals.accessToken = jwt;

  return res.status(200).send(jwt);
}
