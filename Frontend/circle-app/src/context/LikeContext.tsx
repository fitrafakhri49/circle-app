import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

type LikeMap = {
  [threadId: number]: boolean;
};

export type LikeContextType = {
  likes: LikeMap;
  likeThread: (threadId: number) => Promise<void>;
  unlikeThread: (threadId: number) => Promise<void>;
  setLikes: Dispatch<SetStateAction<LikeMap>>;
};

export const LikeContext = createContext<LikeContextType>({
  likes: {},
  likeThread: async () => {},
  unlikeThread: async () => {},
  setLikes: () => {},
});
