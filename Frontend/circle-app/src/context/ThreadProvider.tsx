import { useEffect, useState, useContext } from "react";
import { ThreadContext } from "./ThreadContext";
import type { ThreadType } from "../types/ThreadType";
import { AuthContext } from "../context/AuthContext";
import type { UserType } from "../types/UserType";
import { api } from "../services/api";

import { socket } from "../lib/socket";

export const ThreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  useEffect(() => {
    socket.on("new-thread", (data: ThreadType) => {
      setThreads((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new-thread");
    };
  }, []);

  const createThread = async (content: string, image?: string | File) => {
    if (!user) return;

    try {
      const { data } = await api.post("/api/v1/thread", {
        content,
        image,
      });

      const newThread: ThreadType = data.thread;
      setThreads((prev) => [newThread, ...prev]);
      socket.emit("new-thread", newThread);
    } catch (err) {
      console.error("Failed to create thread:", err);
    }
  };

  return (
    <ThreadContext.Provider value={{ threads, createThread, setThreads }}>
      {children}
    </ThreadContext.Provider>
  );
};
