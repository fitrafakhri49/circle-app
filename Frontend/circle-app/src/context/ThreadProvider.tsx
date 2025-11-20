import { useEffect, useState, useContext } from "react";
import { ThreadContext } from "./ThreadContext";
import type { ThreadType } from "../types/ThreadType";
import { AuthContext } from "../context/AuthContext";

import { socket } from "../lib/socket";

export const ThreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const authContext = useContext(AuthContext);
  const user = authContext?.user; // aman, bisa null

  useEffect(() => {
    socket.on("new-thread", (data: ThreadType) => {
      setThreads((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new-thread");
    };
  });

  const createThread = (content: string, image: string | File) => {
    if (!user) return;
    const newThread: ThreadType = {
      content,
      image,
      created_by_user_thread: {
        username: user?.username,
        id: user.id,
        full_name: user.full_name,
      },
    };

    socket.emit("new-thread", newThread);

    setThreads((prev) => [newThread, ...prev]);
  };

  return (
    <ThreadContext.Provider value={{ threads, createThread }}>
      {children}
    </ThreadContext.Provider>
  );
};
