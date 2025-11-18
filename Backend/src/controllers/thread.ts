import { Request, Response } from "express";

import { prisma } from "../prisma/client";

export async function handleThread(req: Request, res: Response) {
  try {
    
    const threads = await prisma.threads.findMany()
   
    res.status(201).json({code:200,status:"success", message: "Get Data Thread Successfully", threads});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}