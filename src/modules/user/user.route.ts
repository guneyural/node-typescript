import { Router } from "express";
import { registerUserHandler } from "./user.controller";
import requireUser from "../../middleware/requireUser";

const router = Router();

router.get("/", requireUser, (req, res) => {
  const user = res.locals.user;

  res.send(user);
});
router.post("/", registerUserHandler);

export default router;
