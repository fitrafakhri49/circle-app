import { useEffect, useState } from "react";
import { ThreadContext } from "./ThreadContext";
import type { ThreadType } from "../types/ThreadType";

import { socket } from "../lib/socket";

export const ThreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [threads, setThreads] = useState<ThreadType[]>([]);

  useEffect(() => {
    socket.on("new-thread", (data: ThreadType) => {
      setThreads((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new-thread");
    };
  });

  const createThread = (content: string, image: string | File) => {
    const newThread: ThreadType = { content, image };

    socket.emit("new-thread", newThread);

    setThreads((prev) => [newThread, ...prev]);
  };

  return (
    <ThreadContext.Provider value={{ threads, createThread }}>
      {children}
    </ThreadContext.Provider>
  );
};
