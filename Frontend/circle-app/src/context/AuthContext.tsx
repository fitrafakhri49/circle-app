import { createContext } from "react";

export interface UserType {
  id: number;
  username: string;
  full_name: string;
}

export type AuthContexttype = {
  user: UserType | null;
  token: string | null;
  login: (token: string, userData: UserType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContexttype | null>(null);
