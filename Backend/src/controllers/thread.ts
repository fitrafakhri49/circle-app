import { Request, Response } from "express";

import { prisma } from "../prisma/client";
import { verifyToken } from "../utils/jwt";



export async function getThread(req: Request, res: Response) {
  try {
    
    const threads = await prisma.threads.findMany()
   
    res.status(201).json({code:200,status:"success", message: "Get Data Thread Successfully", threads});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function PostThread(req: Request, res: Response) {
  
  try {
    
    // const user= (req as any).user
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

  const user = await prisma.users.findFirst()

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
    const { content } = req.body;
    const image = req.file?`/uploads/${req.file.filename}`: null
    const thread = await prisma.threads.create({
      data: {
        content,
        image,
        created_by: user.id,
        updated_by: user.id,
      },
    });
    
    return res.status(201).json({
      code: 200,
      status: "success",
      message: "Thread created successfully",
      thread,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}
