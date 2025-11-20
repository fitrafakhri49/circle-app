import { Request,Response } from "express";
import { prisma } from "../prisma/client";
export async function likeThread(req:Request,res:Response) {
    try {
        
    const userId= parseInt((req as any).user.id, 10)
    const threadId=Number(req.params.id)

    const likes = await prisma.likes.create({
        data:{
            user_id:userId,
            thread_id:threadId,
            created_by:userId,
            updated_by:userId
        }
    })
    return res.json({likes})
    } catch (error) {
        
    }
}

export async function unlikeThread(req:Request,res:Response) {
    try {
        
    const userId= parseInt((req as any).user.id, 10)
    const threadId=Number(req.params.id)

    const likes = await prisma.likes.delete({
        where:{
            thread_id_user_id: { 
                user_id: userId,
                thread_id: threadId
              }
          
        }
    })  
    return res.status(200).json({likes})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error" });
    }
}