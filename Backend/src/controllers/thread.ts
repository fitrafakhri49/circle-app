import { Request, Response } from "express";

import { prisma } from "../prisma/client";

import {  io} from "../app";


export async function getThreads(req: Request, res: Response) {
  try {
    const threads = await prisma.threads.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
        likes: true,
        replies: {
          select: {
            thread_id: true,
            content: true,
            image: true,
            user: {
              select: {
                id: true,
                username: true,
                full_name: true
              }
            }
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
    });

    const result = threads.map((thread) => ({
      ...thread,
      number_of_replies: thread._count.replies
    }));


    res.status(200).json({
      code: 200,
      status: "success",
      message: "Get Data Thread Successfully",
      result
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ code: 400, status: "error", message: err.message });
  }
}

export async function getThread(req: Request, res: Response) {
  try {
    const {id}=req.params
    const thread = await prisma.threads.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            full_name: true
          },
        },
        likes: true,
        replies:{
          select:{
            thread_id:true,
            content:true,
            image:true,
            user:{
              select:{
                id:true,
                username:true,
                full_name:true
              }
            }
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
    });

    if (!thread) {
      return res.status(404).json({ code: 404, status: "error", message: "Thread not found" });
    }
    res.status(201).json({code:200,status:"success", message: "Get Data Thread Successfully", thread});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function PostThread(req: Request, res: Response) {
  
  try {
    
    const user= (req as any).user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  


    const { content } = req.body;

    
    const image = req.file?`/uploads/${req.file.filename}`: null
    const thread = await prisma.threads.create({
      data: {
        content,
        image,
        user: { connect: { id: user.id } },
        updated_by_user_thread: { connect: { id: user.id } },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            full_name: true
          },
        },
        likes: true,
      },
    });
    
    io.emit("new-thread", thread);

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


