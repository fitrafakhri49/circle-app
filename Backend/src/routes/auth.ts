import express from "express";
import { handleRegister,handleLogin } from "../controllers/auth";
// import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/auth/register", handleRegister);
router.post("/auth/login", handleLogin);

// router.get("/supplier/products", authenticate, (req, res) => {
//   res.json({ message: "Protected route" });
// });

export default router;