import { useState } from "react";
import { ThreadContext } from "./ThreadContext";
import type { ThreadType } from "../types/ThreadType";

export const ThreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [threads, setThreads] = useState<ThreadType[]>([]);

  const createThread = (content: string, image: string | File) => {
    const newThread: ThreadType = { content, image };
    setThreads((prev) => [newThread, ...prev]);
  };

  return (
    <ThreadContext.Provider value={{ threads, createThread }}>
      {children}
    </ThreadContext.Provider>
  );
};
