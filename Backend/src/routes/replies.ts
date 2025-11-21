import express from "express";
import { PostReplies, getReplies } from "../controllers/replies";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/replies",authenticate,getReplies)
router.post("/reply", authenticate,PostReplies)

export default router;