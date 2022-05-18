import { Request, Response } from "express";
import { createUser } from "./user.service";
import { RegisterUserBody } from "./user.schema";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { username, password, email } = req.body;
  try {
    const user = await createUser({ username, password, email });

    return res.status(201).send(user);
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("User already exists");
    }

    return res.status(500).send(e.message);
  }
}
