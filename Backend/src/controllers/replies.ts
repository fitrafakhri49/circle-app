import { Request, Response } from "express";

import { prisma } from "../prisma/client";

import { io } from "../app";

export async function getReplies(req:Request,res:Response) {
    try {
        const threadId=Number(req.query.thread_id)
        if(!threadId){
            return
        }

        const replies=await prisma.replies.findMany({
            where:{thread_id:threadId},
            orderBy:{created_at:"desc"},
            include:{
                user:{
                    select:{
                        id:true,
                        username:true,
                        photo_profile:true,           
                    }
                }
            }
        })

        const result = replies.map((replies) => ({
          ...replies
        }));
        
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Get Replies Data Successfull",
          result
        });

  


    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
}

export async function PostReplies(req:Request,res:Response) {
      
  try {

    const threadId=Number(req.query.thread_id)
    if(!threadId){
        return
    }
    const user= (req as any).user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { content } = req.body;
    const image = req.file?`/uploads/${req.file.filename}`: null
    const reply = await prisma.replies.create({
      data: {
        content,
        image,
        thread:{connect:{id:threadId}},
        user: { connect: { id: user.id } },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            full_name: true
          },
        },
      },
    });

    await prisma.threads.update({
        where: { id: threadId },
        data: {
          number_of_replies: {
            increment: 1
          }
        }
      });
    
    io.emit("new-reply", reply);

    return res.status(201).json({
      code: 200,
      status: "success",
      message: "Thread created successfully",
      reply,   
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}