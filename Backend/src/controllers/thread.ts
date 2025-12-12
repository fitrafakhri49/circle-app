import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { io } from "../app";
import { redisClient } from "../config/redis";

// GET Threads dengan Redis
export async function getThreads(req: Request, res: Response) {
  try {
    const user = (req as any).user;

    if (!user?.id) {
      return res.status(401).json({ code: 401, status: "error", message: "Unauthorized" });
    }

    const cacheKey = `threads:feed:${user.id}`;

    // 1. Cek cache Redis
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const threads = JSON.parse(cached);
      console.log(`🔹 Data diambil dari Redis, jumlah thread: ${threads.length}`);
      return res.status(200).json({
        code: 200,
        status: "success",
        from: "redis",
        result: threads,
      });
    }

    // 2. Ambil following
    const following = await prisma.follow.findMany({
      where: { followers_id: user.id },
      select: { following_id: true },
    });
    const authorIds = [...following.map(f => f.following_id), user.id];

    if (authorIds.length === 0) {
      return res.status(200).json({ code: 200, status: "success", message: "No following threads", result: [] });
    }

    // 3. Ambil dari DB
    const threads = await prisma.threads.findMany({
      where: { created_by: { in: authorIds } },
      orderBy: { created_at: "desc" },
      include: {
        user: { select: { id: true, username: true, full_name: true, photo_profile: true } },
        likes: true,
        replies: { select: { thread_id: true, content: true, image: true, user: { select: { id: true, username: true } } } },
        _count: { select: { replies: true } },
      },
    });

    const result = threads.map(t => ({ ...t, number_of_replies: t._count.replies }));

    // 4. Simpan ke Redis (TTL 60 detik)
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
    console.log(`🔹 Data diambil dari DB dan disimpan ke Redis, jumlah thread: ${result.length}`);

    return res.status(200).json({ code: 200, status: "success", from: "db", result });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ code: 400, status: "error", message: err.message });
  }
}

// GET Thread by ID (tanpa cache, bisa ditambahkan jika perlu)
export async function getThread(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const thread = await prisma.threads.findUnique({
      where: { id: Number(id) },
      include: {
        user: { select: { id: true, username: true, full_name: true, photo_profile:true } },
        likes: true,
        replies: { select: { thread_id:true, content:true, image:true, user:{ select:{id:true, username:true} } } },
        _count: { select: { replies: true } }
      }
    });

    if (!thread) return res.status(404).json({ code: 404, status: "error", message: "Thread not found" });

    res.status(200).json({ code: 200, status: "success", thread });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}


export async function PostThread(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user) return res.status(404).json({ message: "User not found" });

    const { content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const thread = await prisma.threads.create({
      data: { content, image, user: { connect: { id: user.id } }, updated_by_user_thread: { connect: { id: user.id } } },
      include: { user: { select: { id: true, username: true, full_name: true } }, likes: true },
    });

    // Hapus cache feed user agar data baru muncul
    await redisClient.del(`threads:feed:${user.id}`);

    io.emit("new-thread", thread);

    res.status(201).json({ code: 200, status: "success", message: "Thread created successfully", thread });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
