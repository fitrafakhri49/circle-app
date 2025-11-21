import { createContext } from "react";
import type { ReplyType } from "@/types/ReplyType";

export interface ReplyContextType {
  replies: ReplyType[];
  createReplies: (
    content: string,
    ThreadId: number,
    image: string | File
  ) => Promise<void>;
  setReplies: React.Dispatch<React.SetStateAction<ReplyType[]>>;
}
export const ReplyContext = createContext<ReplyContextType | null>(null);
