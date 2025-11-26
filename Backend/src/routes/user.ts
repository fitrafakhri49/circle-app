import express from "express";
import {  getAllUsers, getCurrentUser, getUserExceptToken, updateProfile } from "../controllers/user";
import { upload } from "../utils/multer";
import { authenticate } from "../middlewares/auth";


const router = express.Router();

router.get("/user", authenticate,getCurrentUser,);
router.get("/user/all", authenticate,getAllUsers,);
router.get("/users", authenticate,getUserExceptToken,);
router.put("/user", upload.single("image"),authenticate,updateProfile,);


export default router;