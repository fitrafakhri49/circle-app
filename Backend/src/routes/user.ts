import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/user";
import { upload } from "../utils/multer";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/user", authenticate,getCurrentUser,);
router.put("/user", upload.single("image"),authenticate,updateProfile,);


export default router;