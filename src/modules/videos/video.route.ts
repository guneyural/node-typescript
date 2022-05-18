import { Router } from "express";
import requireUser from "../../middleware/requireUser";
import {
  findVideosHandler,
  streamVideoHandler,
  updateVideoHandler,
  uploadVideoHandler,
} from "./video.controller";

const router = Router();

router.post("/", requireUser, uploadVideoHandler);
router.put("/:videoId", requireUser, updateVideoHandler);
router.get("/", findVideosHandler);
router.get("/:videoId", streamVideoHandler);

export default router;
