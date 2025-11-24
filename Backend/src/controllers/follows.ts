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
            following: {
              select: {
                id: true,
                username: true,
                full_name: true,
                photo_profile: true,
                following: {
                  where: { followers_id: user.id },
                },
              },
            },
          },
        });
      } else {

        follows = await prisma.follow.findMany({
          where: { following_id: user.id },
          include: {
            followers: {
              select: {
                id: true,
                username: true,
                full_name: true,
                photo_profile: true,
                following: {
                  where: { followers_id: user.id }, // cek apakah user mengikuti mereka
                },
              },
            },
          },
        });
      }
  
      const formatted = follows.map((f) => {
        if (type === "following" && "following" in f) {
  
          const u = f.following;
          return {
            id: u.id,
            username: u.username,
            name: u.full_name,
            avatar: u.photo_profile
              ? `http://localhost:3000${u.photo_profile}`
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            is_following: u.following.length > 0,
          };
        } else if (type === "follower" && "followers" in f) {
          const u = f.followers;
          return {
            id: u.id,
            username: u.username,
            name: u.full_name,
            avatar: u.photo_profile
              ? `http://localhost:3000${u.photo_profile}`
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            is_following: u.following.length > 0,
          };
        }
        return null;
      }).filter(Boolean); 
  
      return res.status(200).json({
        status: "success",
        data: {
          followers: formatted,
        },
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


export async function followUser(req: Request, res: Response) {
  try {
    const user = (req as any).user; // user login
    const { userId } = req.body;    // id user yang akan di-follow

    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (user.id === Number(userId)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    // cek apakah sudah follow
    const existingFollow = await prisma.follow.findFirst({
      where: {
        following_id: Number(userId),
        followers_id: user.id,
      },
    });

    if (existingFollow) {
      return res.status(400).json({ message: "You already follow this user" });
    }

    const newFollow = await prisma.follow.create({
      data: {
        following_id: Number(userId),
        followers_id: user.id,
      },
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
      const { userId } = req.body;    
  
      if (!user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      if (user.id === Number(userId)) {
        return res.status(400).json({ message: "Cannot unfollow yourself" });
      }

      const existingFollow = await prisma.follow.findFirst({
        where: {
          following_id: Number(userId),
          followers_id: user.id,
        },
      });
  
      if (!existingFollow) {
        return res.status(400).json({ message: "You are not following this user" });
      }
  
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
  
      return res.status(200).json({
        status: "success",
        message: "Successfully unfollowed user",
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


// export async function getFollowers(req: Request, res: Response) {
//     try {
//       const user = (req as any).user; 
  
//       if (!user?.id) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }
  
//       const type = (req.query.type as string) || "follower"; // default = follower
  
//       let follows;
  
//       if (type === "following") {
     
//         follows = await prisma.follow.findMany({
//           where: { followers_id: user.id },
//           include: {
//             following: {
//               select: {
//                 id: true,
//                 username: true,
//                 full_name: true,
//                 photo_profile: true,
//                 following: {
//                   where: { followers_id: user.id },
//                 },
//               },
//             },
//           },
//         });
//       } else {

//         follows = await prisma.follow.findMany({
//           where: { following_id: user.id },
//           include: {
//             followers: {
//               select: {
//                 id: true,
//                 username: true,
//                 full_name: true,
//                 photo_profile: true,
//                 following: {
//                   where: { followers_id: user.id }, // cek apakah user mengikuti mereka
//                 },
//               },
//             },
//           },
//         });
//       }
  
//       const formatted = follows.map((f) => {
//         if (type === "following" && "following" in f) {
  
//           const u = f.following;
//           return {
//             id: u.id,
//             username: u.username,
//             name: u.full_name,
//             avatar: u.photo_profile
//               ? `http://localhost:3000${u.photo_profile}`
//               : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//             is_following: u.following.length > 0,
//           };
//         } else if (type === "follower" && "followers" in f) {
//           const u = f.followers;
//           return {
//             id: u.id,
//             username: u.username,
//             name: u.full_name,
//             avatar: u.photo_profile
//               ? `http://localhost:3000${u.photo_profile}`
//               : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//             is_following: u.following.length > 0,
//           };
//         }
//         return null;
//       }).filter(Boolean); 
  
//       return res.status(200).json({
//         status: "success",
//         data: {
//           followers: formatted,
//         },
//       });
//     } catch (err: any) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   }
