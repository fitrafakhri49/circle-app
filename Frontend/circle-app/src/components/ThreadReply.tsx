import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ThreadType } from "../types/ThreadType";
import { Heart, MessageCircle, ArrowBigLeft } from "lucide-react";

import { Link } from "react-router-dom";
import type { ReplyType } from "@/types/ReplyType";

export function ThreadReply() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadType | null>(null);

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
            src={thread.user.photo_profile ?? "https://i.pravatar.cc/150?img=3"}
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
          <div className="flex items-center gap-1">
            <Heart className="text-gray-400" />
            <span>{thread.likes ?? 0}</span>
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
