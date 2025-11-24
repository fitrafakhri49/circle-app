import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/user";
import { upload } from "../utils/multer";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/user", authenticate,getCurrentUser,);
router.put("/user", upload.single("image"),authenticate,updateProfile,);
// router.post("/thread", upload.single("image"),authenticate,PostThread)
// router.get("/thread/:id", getThread);
// router.post("/thread/:id/like",authenticate,likeThread)
// router.delete("/thread/:id/like",unlikeThread)


export default router;