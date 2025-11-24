import  express  from "express";
import { getLikes, likeThread,unlikeThread } from "../controllers/likes";
import { authenticate } from "../middlewares/auth";


const router=express.Router()

router.post("/like",authenticate,likeThread)
router.get("/like",authenticate,getLikes)
router.delete("/like/",authenticate, unlikeThread);
export default router