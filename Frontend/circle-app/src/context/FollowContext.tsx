import { createContext } from "react";
import type { UserType } from "../types/UserType";

export type FollowContextType = {
  users: UserType | null;
  follows: UserType[];
  suggestions: UserType[];
  followUser: (id: number) => Promise<void>;
  getSuggestions: () => Promise<void>;
  getFollows: () => Promise<void>;
};

export const FollowContext = createContext<FollowContextType>({
  users: null,
  follows: [],
  suggestions: [],
  followUser: async () => {},
  getSuggestions: async () => {},
  getFollows: async () => {},
});
