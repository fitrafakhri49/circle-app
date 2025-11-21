import express from "express";
import { PostReplies, getReplies } from "../controllers/replies";
import { authenticate } from "../middlewares/auth";
import { upload } from "../utils/multer";


const router = express.Router();

router.get("/replies",authenticate,getReplies)
router.post("/reply",upload.single("image"), authenticate,PostReplies)

export default router;