// src/services/auth.service.ts
import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

export async function registerUser(username: string, full_name: string, email:string,password:string) {


  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: { username,full_name,email, password: hashed },
  });

  return { id: user.id,username:user.username,full_name:user.full_name ,email: user.email , };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.users.findUnique({ where: {email} });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const token = signToken({ id: user.id,email: user.email , });
  return { id: user.id, email: user.email };
}