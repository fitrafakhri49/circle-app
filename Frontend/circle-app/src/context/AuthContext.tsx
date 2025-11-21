import { createContext } from "react";
import type { UserType } from "../types/UserType";
export type AuthContexttype = {
  user: UserType | null;
  token: string | null;
  login: (token: string, userData: UserType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContexttype | null>(null);
