import express from "express";
import { PostThread, getThread, getThreads } from "../controllers/thread";
import { upload } from "../utils/multer";
import { likeThread, unlikeThread } from "../controllers/likes";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/thread", authenticate,getThreads,);
router.post("/thread", upload.single("image"),authenticate,PostThread)
router.get("/thread/:id",authenticate, getThread);
router.post("/thread/:id/like",authenticate,likeThread)
router.delete("/thread/:id/like",unlikeThread)


export default router;