import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { socket } from "../lib/socket";
import type { ThreadType } from "../types/ThreadType";
import type {} from "../types/UserType";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MainThread() {
  const navigate = useNavigate();
  const [like, setLike] = useState<{ [key: number]: boolean }>({});
  const [threads, setThreads] = useState<ThreadType[]>([]);

  const handleClickThread = (id: number) => {
    navigate(`/thread/${id}`);
  };

  const handleClick = (id: number) => {
    setLike((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      {(threads || []).map((thread) => (
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
              onClick={() => handleClick(thread.id)}
              className="cursor-pointer flex items-center gap-1"
            >
              <Heart
                className={like[thread.id] ? "text-red-500" : "text-gray-400"}
              />
              <span>{thread.likes ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle
                className="cursor-pointer"
                onClick={() => {
                  handleClickThread(thread.id);
                }}
              />
              <span>{thread.number_of_replies}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
