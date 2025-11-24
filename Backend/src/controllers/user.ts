import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const user = (req as any).user;

    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        photo_profile: true,
        created_at: true,
        bio:true
      },
    });

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      user: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function updateProfile(req: Request, res: Response) {
    try {
      const user = (req as any).user;
  
      if (!user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const { bio } = req.body;
  
      let photoPath: string | undefined;
  
      if (req.file) {
        photoPath = `/uploads/${req.file.filename}`;
      }
  
      const updated = await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          bio: bio ?? undefined,
          photo_profile: photoPath ?? undefined,
        },
        select: {
          id: true,
          username: true,
          full_name: true,
          email: true,
          photo_profile: true,
          bio: true,
          created_at: true,
        },
      });
  
      return res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        user: updated,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  