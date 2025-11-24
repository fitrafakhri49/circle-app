import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function getFollowers(req: Request, res: Response) {
    try {
      const user = (req as any).user;
  
      if (!user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const type = (req.query.type as string) || "follower"; // default = follower
      let follows;
  
      if (type === "following") {
        follows = await prisma.follow.findMany({
          where: { followers_id: user.id },
          include: {
            following: true,
          },
        });
  
        // tambahkan is_following
        follows = await Promise.all(
          follows.map(async (f) => {
            const existing = await prisma.follow.findFirst({
              where: {
                followers_id: user.id,
                following_id: f.following_id,
              },
            });
            return {
              ...f,
              following: {
                ...f.following,
                is_following: !!existing,
              },
            };
          })
        );
      } else {
        follows = await prisma.follow.findMany({
          where: { following_id: user.id },
          include: {
            followers: true,
          },
        });
  
       
        follows = await Promise.all(
          follows.map(async (f) => {
            const existing = await prisma.follow.findFirst({
              where: {
                followers_id: user.id,
                following_id: f.followers_id,
              },
            });
            return {
              ...f,
              followers: {
                ...f.followers,
                is_following: !!existing,
              },
            };
          })
        );
      }
  
      return res.status(200).json({
        status: "success",
        data: follows,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

export async function followUser(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userId = Number(req.query.userId);
  
      if (!user?.id) return res.status(401).json({ message: "Unauthorized" });
      if (!userId) return res.status(400).json({ message: "User ID is required" });
      if (user.id === userId) return res.status(400).json({ message: "Cannot follow yourself" });
  
      const existingFollow = await prisma.follow.findFirst({
        where: { following_id: userId, followers_id: user.id },
      });
      if (existingFollow) return res.status(400).json({ message: "You already follow this user" });
  
      const newFollow = await prisma.follow.create({
        data: { following_id: userId, followers_id: user.id },
      });
  
      return res.status(201).json({
        status: "success",
        message: "Successfully followed user",
        data: newFollow,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  

  export async function unfollowUser(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userId = Number(req.query.userId);
  
      if (!user?.id) return res.status(401).json({ message: "Unauthorized" });
      if (!userId) return res.status(400).json({ message: "User ID is required" });
      if (user.id === userId) return res.status(400).json({ message: "Cannot unfollow yourself" });
  
      const existingFollow = await prisma.follow.findFirst({
        where: { following_id: userId, followers_id: user.id },
      });
      if (!existingFollow) return res.status(400).json({ message: "You are not following this user" });
  
      await prisma.follow.delete({ where: { id: existingFollow.id } });
  
      return res.status(200).json({
        status: "success",
        message: "Successfully unfollowed user",
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  