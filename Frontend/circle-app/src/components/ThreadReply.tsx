import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { api } from "../services/api";
import type { ThreadType } from "../types/ThreadType";
import { Heart, MessageCircle, ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LikeContext } from "@/context/LikeContext";
import { socket } from "../lib/socket";

export function ThreadReply() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadType | null>(null);

  const { likes, setLikes } = useContext(LikeContext)!;
  const loadingRef = useRef(false);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const res = await api.get(`/api/v1/thread/${id}`);
        setThread(res.data.thread);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchThread();
  }, [id]);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await api.get("/api/v1/like");
        const likeMap: Record<number, boolean> = {};
        res.data.likes?.forEach((like: any) => {
          likeMap[like.thread_id] = true;
        });
        setLikes(likeMap);
      } catch {
        setLikes({});
      }
    };
    getLikes();
  }, [setLikes]);

  const isLiked = (threadId: number) => likes[threadId] === true;

  const handleLikeClick = async () => {
    if (!thread) return;
    if (loadingRef.current) return;

    const threadId = thread.id;
    loadingRef.current = true;

    try {
      const alreadyLiked = likes[threadId] === true;

      setLikes((prev) => ({
        ...prev,
        [threadId]: !alreadyLiked,
      }));

      setThread((prev) =>
        prev
          ? {
              ...prev,
              number_of_likes: alreadyLiked
                ? Math.max((prev.number_of_likes ?? 0) - 1, 0)
                : (prev.number_of_likes ?? 0) + 1,
            }
          : prev
      );

      if (alreadyLiked) {
        await api.delete(`/api/v1/like?thread_id=${threadId}`);
      } else {
        await api.post(`/api/v1/like?thread_id=${threadId}`);
      }

      socket.emit("like-updated", {
        thread_id: threadId,
      });
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    const handler = (data: { thread_id: number; total: number }) => {
      setThread((prev) =>
        prev && prev.id === data.thread_id
          ? { ...prev, number_of_likes: data.total }
          : prev
      );
    };

    socket.on("like-updated", handler);
    return () => {
      socket.off("like-updated", handler);
    };
  }, []);

  if (!thread) return <p>Loading...</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Status</h1>

      <div className="border rounded-md p-4 shadow-md bg-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/thread"
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <ArrowBigLeft className="w-6 h-6" />
          </Link>

          <img
            src={
              thread.user.photo_profile
                ? `http://localhost:3000${thread.user.photo_profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt={thread.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">{thread.user.username}</p>
            <p className="text-sm text-gray-400">{thread.user.username}</p>
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
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleLikeClick}
          >
            <Heart
              className={isLiked(thread.id) ? "text-red-500" : "text-gray-400"}
            />
            <span>{thread.number_of_likes ?? 0}</span>
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle />
            <span>{thread.number_of_replies ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
