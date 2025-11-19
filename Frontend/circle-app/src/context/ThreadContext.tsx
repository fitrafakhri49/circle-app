import { createContext } from "react";

export interface ThreadType {
  content: string;
  image: string;
  number_of_replies: number;
}
export const ThreadContext = createContext<ThreadType[] | null>(null);
