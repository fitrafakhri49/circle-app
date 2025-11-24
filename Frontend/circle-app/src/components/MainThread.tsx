import { Heart } from "lucide-react";
import { useEffect, useContext, useState, useRef } from "react";
import { api } from "@/services/api";
import { socket } from "../lib/socket";
import type { ThreadType } from "../types/ThreadType";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LikeContext } from "@/context/LikeContext";

export function MainThread() {
  const navigate = useNavigate();
  const { likes, setLikes } = useContext(LikeContext)!;
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const loadingIds = useRef<Set<number>>(new Set());

  const handleClickThread = (id: number) => {
    navigate(`/thread/${id}`);
  };

  const isLiked = (threadId: number) => {
    return likes[threadId] === true;
  };

  const handleLikeClick = async (threadId: number) => {
    // ✅ Cegah spam click
    if (loadingIds.current.has(threadId)) return;

    loadingIds.current.add(threadId);

    try {
      const alreadyLiked = likes[threadId] === true;

      // ===== OPTIMISTIC UI =====
      setLikes((prev) => ({
        ...prev,
        [threadId]: !alreadyLiked,
      }));

      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                number_of_likes: alreadyLiked
                  ? Math.max((thread.number_of_likes ?? 0) - 1, 0)
                  : (thread.number_of_likes ?? 0) + 1,
              }
            : thread
        )
      );

      // ===== API CALL =====
      if (alreadyLiked) {
        await api.delete(`/api/v1/like?thread_id=${threadId}`);
      } else {
        await api.post(`/api/v1/like?thread_id=${threadId}`);
      }
    } catch (err) {
      console.error("Like toggle error:", err);

      // ===== ROLLBACK IF ERROR =====
      const wasLiked = likes[threadId] === true;

      setLikes((prev) => ({
        ...prev,
        [threadId]: wasLiked,
      }));

      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                number_of_likes: wasLiked
                  ? (thread.number_of_likes ?? 0) + 1
                  : Math.max((thread.number_of_likes ?? 0) - 1, 0),
              }
            : thread
        )
      );
    } finally {
      loadingIds.current.delete(threadId);
    }
  };

  // ✅ Fetch Threads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("api/v1/thread");
        setThreads(res.data.result);
      } catch (error) {
        console.error("Gagal Fetch Data Thread");
      }
    };
    fetchData();
  }, []);

  // ✅ Fetch Likes milik user
  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await api.get("api/v1/like");
        const likeMap: Record<number, boolean> = {};

        res.data.likes.forEach((like: any) => {
          likeMap[like.thread_id] = true;
        });

        setLikes(likeMap);
      } catch (err) {
        console.error("Gagal fetch likes:", err);
      }
    };
    getLikes();
  }, [setLikes]);

  // ✅ Realtime thread update
  useEffect(() => {
    const handler = (data: ThreadType) => {
      setThreads((prev) => {
        const exists = prev.some((t) => t.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
    };

    socket.on("new-thread", handler);
    return () => {
      socket.off("new-thread", handler);
    };
  }, []);

  if (!threads) return null;

  return (
    <div>
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="mb-4 border rounded-md p-4 mt-5 shadow-md bg-gray-800 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={
                thread.user.photo_profile ?? "https://i.pravatar.cc/150?img=3"
              }
              alt={thread.user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">
                {thread.user.username ?? "Unknown"}
              </p>
              <p className="text-sm text-gray-400">
                {thread.user.username ?? ""}
              </p>
            </div>
          </div>

          {thread.image && (
            <img
              src={`http://localhost:3000${thread.image}`}
              alt="thread"
              className="w-full rounded-md mb-2 object-cover"
            />
          )}

          <p className="mb-2">{thread.content}</p>

          <div className="flex items-center gap-4 mt-2">
            <div
              onClick={() => handleLikeClick(thread.id)}
              className="cursor-pointer flex items-center gap-1"
            >
              <Heart
                className={
                  isLiked(thread.id) ? "text-red-500" : "text-gray-400"
                }
              />
              <span>{thread.number_of_likes ?? 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle
                className="cursor-pointer"
                onClick={() => handleClickThread(thread.id)}
              />
              <span>{thread.number_of_replies}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
