import express from "express";
import { followUser, getFollowers, getSuggestions, unfollowUser } from "../controllers/follows";
// import { upload } from "../utils/multer";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/follows", authenticate,getFollowers,);
router.get("/follows/suggestions", authenticate,getSuggestions);
router.post("/follows", authenticate,followUser,);
router.delete("/follows", authenticate,unfollowUser,);


export default router;