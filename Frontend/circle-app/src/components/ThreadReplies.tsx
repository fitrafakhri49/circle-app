import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { socket } from "../lib/socket";
import type { ReplyType } from "../types/ReplyType";
import { useParams } from "react-router-dom";

export function ThreadReplies() {
  const [like, setLike] = useState<{ [key: number]: boolean }>({});
  const [replies, setReplies] = useState<ReplyType[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await api.get(`/api/v1/replies?thread_id=${id}`);
        setReplies(res.data.result);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchReplies();
  }, [id]);

  useEffect(() => {
    const handler = (data: ReplyType) => {
      setReplies((prev) => {
        const exists = prev.some((t) => t.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
    };
    socket.on("new-reply", handler);
    return () => {
      socket.off("new-reply", handler);
    };
  }, []);

  if (!replies) return null;
  return (
    <div className="mt-4 space-y-3">
      {(replies || []).map((reply) => (
        <div
          key={reply.id}
          className="border rounded-md p-3 bg-gray-700 text-white"
        >
          <div className="flex items-center gap-2 mb-1">
            <img
              src={
                reply.user.photo_profile
                  ? `http://localhost:3000${reply.user.photo_profile}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">
              {reply.user?.username ?? "Siapa Gatau"}
            </span>
          </div>
          <img src={`http://localhost:3000${reply.image}`} alt="" />
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
}
