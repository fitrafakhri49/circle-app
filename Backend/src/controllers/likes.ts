import { Request,Response } from "express";
import { prisma } from "../prisma/client";
import { io } from "../app";

export async function getLikes(req:Request,res:Response) {
    try {
     const likes=await prisma.likes.findMany({
            include:{
                user:{
                    select:{
                        id:true,
                        username:true,
                    }
                },
                thread:{
                    select:{
                        id:true,
                        content:true,
                        number_of_replies:true
                    }
                }
            }
        })

       
    io.emit("new-like", likes);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Get Replies Data Successfull",
            likes
          });
  

    }catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : error
        });
    }
}

export async function likeThread(req:Request,res:Response) {
    try {
        
        const threadId=Number(req.query.thread_id)
        if(!threadId){
            return
        }
        const user= (req as any).user
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const threadExist = await prisma.threads.findUnique({
            where: { id: threadId },
          });
      
          if (!threadExist) {
            return res.status(404).json({ message: "Thread not found" });
          }

          const alreadyLiked = await prisma.likes.findUnique({
            where: {
              thread_id_user_id: {
                thread_id: threadId,
                user_id: user.id,
              },
            },
          });
      
          if (alreadyLiked) {
            return res
              .status(400)
              .json({ error: "Thread not found or user already liked this thread" });
          }
      

    const likes = await prisma.likes.create({
        data:{
            user_id:user.id,
            thread_id:threadId,
            created_by:user.id,
            updated_by:user.id
        }
    })

    await prisma.threads.update({
        where: { id: threadId },
        data: {
          number_of_likes: {
            increment: 1
          }
        }
      });

    io.emit("new-like", likes);
    return res.status(200).json({
        message: "Thread liked successfully",
        thread_id: threadId,
        user_id: user.id,likes
      });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : error
        });
    }
}

export async function unlikeThread(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userId = user.id;
  
      if (!userId) {
        return res.status(401).json({ message: "User not found" });
      }
  
      const threadId = Number(req.query.thread_id);
      if (!threadId) {
        return res.status(400).json({ message: "Invalid thread id" });
      }
  
      const likeExist = await prisma.likes.findUnique({
        where: {
          thread_id_user_id: {
            user_id: userId,
            thread_id: threadId,
          },
        },
      });
  
      if (!likeExist) {
        return res.status(400).json({ message: "Like not found" });
      }
  
      const likes = await prisma.likes.delete({
        where: {
          thread_id_user_id: {
            user_id: userId,
            thread_id: threadId,
          },
        },
      });
  
      const thread = await prisma.threads.findUnique({
        where: { id: threadId },
        select: { number_of_likes: true },
      });
      
      if (thread && thread.number_of_likes > 0) {
        await prisma.threads.update({
          where: { id: threadId },
          data: {
            number_of_likes: {
              decrement: 1,
            },
          },
        });
      }
      
      io.emit("new-like", likes);
      return res.status(200).json({
        message: "Thread unliked successfully",
        thread_id: threadId,
        user_id: userId,
        likes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
  


