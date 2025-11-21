import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { socket } from "../lib/socket";
import type { ThreadType } from "../types/ThreadType";
// import type {} from "../types/UserType";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReplyType } from "../types/ReplyType";
import { useParams } from "react-router-dom";

export function ThreadReplies() {
  const navigate = useNavigate();
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
    socket.on("new-thread", handler);
    return () => {
      socket.off("new-thread", handler);
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
                reply.user?.photo_profile ?? "https://i.pravatar.cc/150?img=3"
              }
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">
              {reply.user?.username ?? "Siapa Gatau"}
            </span>
          </div>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
}
