import { useEffect, useState, useContext } from "react";
import type { ThreadType } from "../types/ThreadType";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { socket } from "../lib/socket";
import type { ReplyType } from "@/types/ReplyType";
import { ReplyContext } from "./RepliesContext";

export const ReplyProvider = ({ children }: { children: React.ReactNode }) => {
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  useEffect(() => {
    socket.on("new-reply", (data: ThreadType) => {
      setReplies((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new-reply");
    };
  }, []);

  const createReplies = async (
    content: string,
    threadId: number,
    image?: string | File
  ) => {
    if (!user) return;
    if (!threadId) {
      return;
    }
    try {
      const { data } = await api.post(`/api/v1/reply?thread_id=${threadId}`, {
        content,
        image,
      });

      const newReply: ReplyType = data.reply;
      setReplies((prev) => [newReply, ...prev]);
      socket.emit("new-reply", newReply);
    } catch (err) {
      console.error("Failed to create reply:", err);
    }
  };

  return (
    <ReplyContext.Provider value={{ replies, createReplies, setReplies }}>
      {children}
    </ReplyContext.Provider>
  );
};
