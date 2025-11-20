import { useState } from "react";
import { AuthContext } from "./AuthContext";

import type { UserType } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserType | null>(null); // state user

  // login sekarang menerima token dan data user
  const login = (token: string, userData: UserType) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData); // simpan user
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null); // hapus user saat logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
