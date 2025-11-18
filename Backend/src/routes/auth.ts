import express from "express";
import { handleRegister,handleLogin } from "../controllers/auth";

const router = express.Router();

router.post("/auth/register", handleRegister);
router.post("/auth/login", handleLogin);



export default router;