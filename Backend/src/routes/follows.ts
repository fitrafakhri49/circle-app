import express from "express";
import { followUser, getFollowers, unfollowUser } from "../controllers/follows";
// import { upload } from "../utils/multer";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/follows", authenticate,getFollowers,);
router.post("/follows", authenticate,followUser,);
router.delete("/follows", authenticate,unfollowUser,);
// router.put("/user", upload.single("image"),authenticate,updateProfile,);
// router.post("/thread", upload.single("image"),authenticate,PostThread)
// router.get("/thread/:id", getThread);
// router.post("/thread/:id/like",authenticate,likeThread)
// router.delete("/thread/:id/like",unlikeThread)


export default router;