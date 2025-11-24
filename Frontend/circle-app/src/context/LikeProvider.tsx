import { useEffect, useState, useContext } from "react";
import type { LikeType } from "@/types/LikeType";
import { LikeContext } from "@/context/LikeContext";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/services/api";
import { socket } from "@/lib/socket";

type LikeMap = {
  [threadId: number]: boolean;
};

export const LikeProvider = ({ children }: { children: React.ReactNode }) => {
  const [likes, setLikes] = useState<LikeMap>({});

  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  // ✅ Load likes milik user yang login
  useEffect(() => {
    const fetchUserLikes = async () => {
      if (!user) return;

      try {
        const res = await api.get("/api/v1/like");

        const likeMap: LikeMap = {};

        res.data.likes.forEach((like: any) => {
          likeMap[like.thread_id] = true;
        });

        setLikes(likeMap);
      } catch (error) {
        console.error("Failed to load likes:", error);
      }
    };

    fetchUserLikes();
  }, [user]);

  // ✅ Socket listener (hanya update kalau user itu sendiri)
  useEffect(() => {
    const handler = (data: any) => {
      if (!data?.thread_id || !data?.user_id) return;
      if (!user) return;

      // Abaikan jika socket bukan untuk user ini
      if (data.user_id !== user.id) return;

      setLikes((prev) => ({
        ...prev,
        [data.thread_id]: true,
      }));
    };

    socket.on("new-like", handler);

    return () => {
      socket.off("new-like", handler);
    };
  }, [user]);

  // ✅ Like
  const likeThread = async (threadId: number) => {
    if (!user) return;

    try {
      await api.post(`/api/v1/like?thread_id=${threadId}`);

      setLikes((prev) => ({
        ...prev,
        [threadId]: true,
      }));
    } catch (err) {
      console.error("Failed to like thread:", err);
    }
  };

  // ✅ Unlike
  const unlikeThread = async (threadId: number) => {
    if (!user) return;

    try {
      await api.delete(`/api/v1/like?thread_id=${threadId}`);

      setLikes((prev) => ({
        ...prev,
        [threadId]: false,
      }));
    } catch (err) {
      console.error("Failed to unlike thread:", err);
    }
  };

  return (
    <LikeContext.Provider value={{ likes, likeThread, unlikeThread, setLikes }}>
      {children}
    </LikeContext.Provider>
  );
};
