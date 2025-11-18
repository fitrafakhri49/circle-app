import express from "express";
import { handleThread } from "../controllers/thread";


const router = express.Router();

router.get("/thread", handleThread);

export default router;