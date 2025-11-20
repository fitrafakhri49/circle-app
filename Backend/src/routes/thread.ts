import express from "express";
import { PostThread, getThread } from "../controllers/thread";
import { upload } from "../utils/multer";
import { likeThread, unlikeThread } from "../controllers/likes";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/thread", authenticate,getThread,);
router.post("/thread", upload.single("image"),authenticate,PostThread)
router.post("/thread/:id/like",authenticate,likeThread)
router.delete("/thread/:id/like",unlikeThread)


export default router;