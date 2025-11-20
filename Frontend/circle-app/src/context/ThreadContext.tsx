import { createContext } from "react";
import type { ThreadType } from "../types/ThreadType";

export interface ThreadContextType {
  threads: ThreadType[];
  createThread: (content: string, image: string) => void;
}
export const ThreadContext = createContext<ThreadContextType | null>(null);
