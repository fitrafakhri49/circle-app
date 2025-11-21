import { createContext } from "react";
import type { ThreadType } from "../types/ThreadType";

export interface ThreadContextType {
  threads: ThreadType[];
  createThread: (content: string, image: string | File) => Promise<void>;
  setThreads: React.Dispatch<React.SetStateAction<ThreadType[]>>;
}
export const ThreadContext = createContext<ThreadContextType | null>(null);
