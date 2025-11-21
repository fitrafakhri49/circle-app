// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { registerUser, loginUser} from "../services/auth";
import { loginSchema, registerSchema } from "../validation/auth";
import { signToken } from "../utils/jwt";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    
    const { username,full_name,email, password} = req.body;

    const user = await registerUser(username,full_name,email, password);

    const token=signToken(user)
    res.status(201).json({code:200,status:"success", message: "Registrasi berhasil. Akun berhasil dibuat.", user ,token});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const user = await loginUser(email, password);
    const token=signToken(user)
    res.json({code:200,status:"success", message: "Login berhasil.", user ,token});
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}
